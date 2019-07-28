<?php

namespace App\Http\Controllers;

use App\ApartmentModel;
use App\History;
use App\Http\Requests\ApartmentRequest;
use App\ImageFiles;
use App\KostModel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Webpatser\Uuid\Uuid;

class ApartmentController extends Controller
{

    public function InsertApartment(ApartmentRequest $request){
//        dd("Kelwin");

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

        $apart = ApartmentModel::create([
            'id' => Uuid::generate()->string,
            'name' => $request->name,
            'description' => $request->description,
            'prices' => $request->prices,
            'city' => $request->city,
            'address' => $request->address,
            'unit_type'=> $request->unit_type,
            'unit_area' => $request->unit_area,
            'unit_condition' => $request->unit_condition,
            'unit_floor' => $request->unit_floor,
            'unit_facilities' => $request->unit_facilities,
            'unit_public_facilities' => $request->unit_public_facilities,
            'parking_facilities' => $request->parking_facilities,
            'additional_information' => $request->additional_information,
            'additional_fees' => $request->additional_fees,
            'longitude' => $request->longitude,
            'latitude' => $request->latitude,
            'banner_picture' => $bannerPath,
            'picture_360' => $path_360,
            'video' => $video_path,
            'owner_id' => $request->owner_id
        ]);

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
                    'imageable_id' => $apart->id,
                    'imageable_type' => 'App\ApartmentModel',
                    'filename' => $fileNameToStore
                ]);
            }
        }

//        dd($errors);
//        dd($apart);
        return response()->json('Insert Apartment Success!');
    }

    public function SearchApartments(Request $request){
        $latitude = $request->json()->get('lat');
        $longitude = $request->json()->get('lng');
//        dd($request);
        $apartments = ApartmentModel::selectRaw('*, ( 6367 * acos( cos( radians( ? ) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( ? ) ) + sin( radians( ? ) ) * sin( radians( latitude ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
            ->having('distance', '<', 30)
            ->orderBy('distance')
            ->get();
//        dd($apartments);
        return response()->json($apartments);
    }

    public function getOwnerApartment(Request $request){
//        dd("Hello");
//        dd(KostModel::where('owner_email', $recquest->json()->get('owner_email'))->get());

        return ApartmentModel::where('owner_id', $request->owner_id)->paginate(10);
    }

    public function getSpecificApartment(Request $request){
        $apart = ApartmentModel::where('slug', $request->slug)->first();
        $history = History::where('property_id', $apart["id"])->where('user_id', $request->user_id)->first();
        if (is_null($history)){
            $history = History::create([
                'id' => Uuid::generate()->string,
                'property_id' => $apart["id"],
                'user_id' => $request->user_id
            ]);
        }

        $history["created_at"] = Carbon::now();
        $history->save();
        return ApartmentModel::with('user')->where('slug', $request->slug)->get();
    }

    public function OwnerGetApart(Request $request){
        return ApartmentModel::where('slug', $request->slug)->first();
    }

    public function DeleteApartment(Request $request){
        ApartmentModel::where('slug', $request->slug)->delete();
    }

    public  function  OwnerTotalApartment(Request $request){
        return ApartmentModel::where('owner_id', $request->owner_id)->count();
    }

    public function SuggestApartment(Request $request){
        $apartments = ApartmentModel::with('transaction')->whereHas('transaction')->where('owner_id', $request->owner_id)->limit(4)->get();
        if (count($apartments)!=4){
            return History::select('property_id')->groupBy('property_id')->orderByRaw('COUNT(*) DESC')->limit(4)->with('apartments')->whereHas('apartments')->get();
        }
        return $apartments;
    }

    public function UpdateApartment(ApartmentRequest $request){
//        dd($request);
        $updateApart = ApartmentModel::where('id', $request->id)->first();
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
            $bannerPath = $updateApart['banner_picture'];
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
            $path_360 = $updateApart['picture_360'];
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
            $video_path = $updateApart['video'];
        }

        $updateApart = ApartmentModel::where('id', $request->id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'prices' => $request->prices,
            'city' => $request->city,
            'address' => $request->address,
            'unit_type'=> $request->unit_type,
            'unit_area' => $request->unit_area,
            'unit_condition' => $request->unit_condition,
            'unit_floor' => $request->unit_floor,
            'unit_facilities' => $request->unit_facilities,
            'unit_public_facilities' => $request->unit_public_facilities,
            'parking_facilities' => $request->parking_facilities,
            'additional_information' => $request->additional_information,
            'additional_fees' => $request->additional_fees,
            'longitude' => $request->longitude,
            'latitude' => $request->latitude,
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
                    'imageable_type' => 'App\ApartmentModel',
                    'filename' => $fileNameToStore
                ]);
            }
        }

//        echo "Update Success";
        return $updateApart;
    }

    public function ApartFilter(Request $request){
        if(is_null($request->name)){
            $name = "";
        }else{
            $name = $request->name;
        }

        if(is_null($request->prices)){
            $price = 0;
        }else{
            $price = $request->prices;
        }

        if (is_null($request->unit_area)){
            $unitArea = 0;
        }else{
            $unitArea = $request->unit_area;
        }

        if(is_null($request->unit_floor)){
            $unitFloor = 0;
        }else{
            $unitFloor = $request->unit_floor;
        }

        $apart = ApartmentModel::where('owner_id', $request->owner_id)->where('name', 'like', '%'.$name.'%')->where('prices', '>=', $price)->where('unit_area', '>=', $unitArea)->where('unit_floor', '>=', $unitFloor)->paginate(10);

        return $apart;
    }

}
