<?php

namespace App\Http\Controllers;

use App\ApartmentModel;
use App\Http\Requests\ApartmentRequest;
use App\ImageFiles;
use App\KostModel;
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
        return response()->json($apartments);
    }

    public function getOwnerApartment(Request $request){
//        dd("Hello");
//        dd(KostModel::where('owner_email', $recquest->json()->get('owner_email'))->get());

        return ApartmentModel::where('owner_id', $request->owner_id)->paginate(10);
    }

    public function getSpecificApartment(Request $request){
        return ApartmentModel::where('slug', $request->slug)->get();

    }

    public function DeleteApartment(Request $request){
        ApartmentModel::where('slug', $request->slug)->delete();
    }

    public  function  OwnerTotalApartment(Request $request){
        return ApartmentModel::where('owner_id', $request->owner_id)->count();
    }
}
