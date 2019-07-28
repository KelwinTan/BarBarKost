<?php

namespace App\Http\Controllers;

use App\History;
use App\Http\Requests\KostRequest;
use App\ImageFiles;
use App\KostModel;
use App\User;
use Carbon\Carbon;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Psy\Util\Str;
use Webpatser\Uuid\Uuid;

class KostController extends Controller
{
    public function InsertKost(KostRequest $request){
//        dd($request);
        $validate = $request->validated();
//        if($validate['pictures'] != null) $pictures = $validate['pictures'];
//        else $pictures = null;
//        dd($validate);
//        dd($validate['banner_picture']);
        if($request->hasFile('banner')) {
            //Get FileName with the extension
            $fileNameWithExt = $request->file('banner')->getClientOriginalName();
            //Get just filename
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //Get Just ext
            $extension = $request->file('banner')->getClientOriginalExtension();
            //File Name to store
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            //Upload Image
            $banner = $request->file('banner')->storeAs('public/banner', $fileNameToStore);
            $bannerPath = "banner/".$fileNameToStore;
        }else{
            $bannerPath = 'No Banner';
        }

        if($request->hasFile('picture360')) {
            //Get FileName with the extension
            $fileNameWithExt = $request->file('picture360')->getClientOriginalName();
            //Get just filename
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //Get Just ext
            $extension = $request->file('picture360')->getClientOriginalExtension();
            //File Name to store
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            //Upload Image
            $picture_360 = $request->file('picture360')->storeAs('public/360', $fileNameToStore);
            $path_360 = '360/'.$fileNameToStore;
        }else{
            $path_360 = 'No picture 360';
        }

        if($request->hasFile('video')) {
            //Get FileName with the extension
            $fileNameWithExt = $request->file('video')->getClientOriginalName();
            //Get just filename
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //Get Just ext
            $extension = $request->file('video')->getClientOriginalExtension();
            //File Name to store
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            //Upload Image
            $video= $request->file('video')->storeAs('public/video', $fileNameToStore);
            $video_path = 'video/'.$fileNameToStore;
        }else{
            $video_path = 'No video';
        }


        $kost = KostModel::create([
            'id' => Uuid::generate()->string,
            'name' => $validate['name'],
            'description' => $validate['description'],
            'prices' => $validate['prices'],
            'city' => $validate['city'],
            'address' => $validate['address'],
            'total_rooms' => $validate['total_rooms'],
            'room_left' => $validate['room_left'],
            'longitude' => $validate['longitude'],
            'latitude' => $validate['latitude'],
            'kost_slug' => str_replace(' ', '-', substr(md5(microtime()),rand(0,26),5) . $validate['name']),
            'kost_gender' => $request->get('kost_gender'),
            'owner_id' => $request->get('owner_id'),
            'banner_picture' => $bannerPath,
            'picture_360' => $path_360,
            'video' => $video_path
        ]);
        \Illuminate\Support\Str::slug('kelwin dsasiudas');

        if($request->hasFile('image')) {

            $files = $request->file('image');

            foreach ($files as $currFile) {
                //Get FileName with the extension
                $fileNameWithExt = $currFile->getClientOriginalName();
                //Get just filename
                $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
                //Get Just ext
                $extension = $currFile->getClientOriginalExtension();
                //File Name to store
                $fileNameToStore = $fileName . '_' . time() . '.' . $extension;
                //Upload Image
                $path = $currFile->storeAs('public/images', $fileNameToStore);
                ImageFiles::create([
                    'id' => Uuid::generate()->string,
                    'imageable_id' => $kost->id,
                    'imageable_type' => 'App\KostModel',
                    'filename' => $fileNameToStore
                ]);
            }
        }
//        Redis Here
        $redis = Redis::connection();
        $names = explode(' ', $kost->name);
        $json = [
            'id' => $kost->id,
            'name' => $kost->name,
            'city' => $kost->city,
            'kost_slug' => $kost->kost_slug,

        ];

        $json_en = json_encode($json);

        foreach($names as $n){
            $redis->rpush($n, $json_en);
        }

//        dd($errors);
        return response()->json('Insert Kost Success!');
    }

    public function getAllKost(){
        return KostModel::paginate(10);
    }

    public function OwnerTotalKost(Request $request){
//        dd($request);
        return KostModel::where('owner_id', $request->owner_id)->count();
    }

    public function getOwnerKost(Request $request){
//        dd("Hello");
//        dd(KostModel::where('owner_email', $recquest->json()->get('owner_email'))->get());

        return KostModel::where('owner_id', $request->owner_id)->paginate(10);
    }

    public function OwnerFilterKost(Request $request){
//        if($request)
        if(is_null($request->prices)){
            $price = 0;
        }else{
            $price = $request->prices;
        }

        if(is_null($request->room_left)){
            $roomLeft = 0;
        }else{
            $roomLeft = $request->room_left;
        }

        if(is_null($request->date)){
            $date = 0;
        }else{
            $date = $request->date;
        }

        $kosts = KostModel::where('owner_id', $request->owner_id)->where('name', 'like', '%'.$request->name.'%')->where('prices', '>=', $price)->where('room_left', '>=', $roomLeft)->where('created_at', '>=', $date)->paginate(10);

        return $kosts;
    }

    public function SpecificKost(Request $request){
        $kost = KostModel::where('kost_slug', $request->json()->get('kost_slug'))->first();
//        dd($kost["id"]);
        $history = History::where('property_id', $kost["id"])->where('user_id', $request->json()->get('user_id'))->first();
        if (is_null($history)){
            $history = History::create([
                'id' => Uuid::generate()->string,
                'property_id' => $kost["id"],
                'user_id' => $request->json()->get('user_id')
            ]);
        }

        $history["created_at"] = Carbon::now();
        $history->save();
        return KostModel::with('user')->where('kost_slug', $request->json()->get('kost_slug'))->first();
    }

    public function OwnerGetSpecificKost(Request $request){
        return KostModel::where('kost_slug', $request->kost_slug)->first();
    }


    public function DeleteKost(Request $request){
        $currKost = KostModel::where('kost_slug', $request->json()->get('kost_slug'))->delete();
//        $currKost->delete();

        return response()->json('Kost Deleted (Soft)');
    }

    public function updateKost(KostRequest $request){
//        dd($request);
        $updateKost = KostModel::where('id', $request->id)->first();
//        dd($updateKost[0]['picture_360']);
//        dd($updateKost["banner_picture"]);
        if($request->hasFile('banner')) {
            //Get FileName with the extension
            $fileNameWithExt = $request->file('banner')->getClientOriginalName();
            //Get just filename
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //Get Just ext
            $extension = $request->file('banner')->getClientOriginalExtension();
            //File Name to store
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            //Upload Image
            $banner = $request->file('banner')->storeAs('public/banner', $fileNameToStore);
            $bannerPath = "banner/".$fileNameToStore;
//            dd($bannerPath);
        }else{
            $bannerPath = $updateKost['banner_picture'];
        }

        if($request->hasFile('picture360')) {
            //Get FileName with the extension
            $fileNameWithExt = $request->file('picture360')->getClientOriginalName();
            //Get just filename
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //Get Just ext
            $extension = $request->file('picture360')->getClientOriginalExtension();
            //File Name to store
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            //Upload Image
            $picture_360 = $request->file('picture360')->storeAs('public/360', $fileNameToStore);
            $path_360 = '360/'.$fileNameToStore;
        }else{
            $path_360 = $updateKost['picture_360'];
        }

        if($request->hasFile('video')) {
            //Get FileName with the extension
            $fileNameWithExt = $request->file('video')->getClientOriginalName();
            //Get just filename
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //Get Just ext
            $extension = $request->file('video')->getClientOriginalExtension();
            //File Name to store
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            //Upload Image
            $video= $request->file('video')->storeAs('public/video', $fileNameToStore);
            $video_path = 'video/'.$fileNameToStore;
        }else{
            $video_path = $updateKost['video'];
        }


        $updateKost = KostModel::where('id', $request->id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'prices' => $request->prices,
            'city' => $request->city,
            'address' => $request->address,
            'total_rooms' => $request->total_rooms,
            'room_left' => $request->room_left,
            'longitude' => $request->longitude,
            'latitude' => $request->latitude,
            'kost_slug' => str_replace(' ', '-', substr(md5(microtime()),rand(0,26),5) . $request->name),
            'kost_gender' => $request->kost_gender,
            'banner_picture' => $bannerPath,
            'picture_360' => $path_360,
            'video' => $video_path
        ]);
//        $updateKost->name = $request->update_kost_name;
//        $updateKost->save();

        if($request->hasFile('image')) {
            if(ImageFiles::where('imageable_id', $request->id)->get() != null){
                $kostImages = ImageFiles::where('imageable_id', $request->id)->delete();
            }
            $files = $request->file('image');

            foreach ($files as $currFile) {
                //Get FileName with the extension
                $fileNameWithExt = $currFile->getClientOriginalName();
                //Get just filename
                $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
                //Get Just ext
                $extension = $currFile->getClientOriginalExtension();
                //File Name to store
                $fileNameToStore = $fileName . '_' . time() . '.' . $extension;
                //Upload Image
                $path = $currFile->storeAs('public/images', $fileNameToStore);
                ImageFiles::create([
                    'id' => Uuid::generate()->string,
                    'imageable_id' => $request->id,
                    'imageable_type' => 'App\KostModel',
                    'filename' => $fileNameToStore
                ]);
            }
        }

//        echo "Update Success";
        return $updateKost;
    }

    public function DeleteSpecificImage(Request $request){
        $kostImages = ImageFiles::where('imageable_id', $request->kost_id)->delete();
//        for($i=0; $i<count($kostImages); $i++){
////            $productImage = str_replace('/storage', '', $kostImages[$i]['filename']);
////            Storage::delete('/public'.$productImage);
////            echo $kostImages[$i]['filename'];
//            ImageFiles::
//        }


//        return count($kostImages);
    }

    public function SuggestKost(Request $request){
        $properties = KostModel::with('transaction')->whereHas('transaction')->where('owner_id', $request->owner_id)->limit(4)->get();
        if (count($properties)!=4){
            return History::select('property_id')->groupBy('property_id')->orderByRaw('COUNT(*) DESC')->limit(4)->with('properties')->whereHas('properties')->get();
        }
        return $properties;
    }



}
