<?php

namespace App\Http\Controllers;

use App\ApartmentModel;
use App\KostModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Webpatser\Uuid\Uuid;

class ApartmentController extends Controller
{

    public function InsertApartment(Request $request){
//        dd($request);

        $apart = ApartmentModel::create([
            'id' => Uuid::generate()->string,
            'name' => $request->json()->get('name'),
            'description' => $request->json()->get('description'),
            'prices' => $request->json()->get('prices'),
            'city' => $request->json()->get('city'),
            'address' => $request->json()->get('address'),
            'unit_type'=> $request->json()->get('unit_type'),
            'unit_area' => $request->json()->get('unit_area'),
            'unit_condition' => $request->json()->get('unit_condition'),
            'unit_floor' => $request->json()->get('unit_floor'),
            'unit_facilities' => $request->json()->get('unit_facilities'),
            'longitude' => $request->json()->get('longitude'),
            'latitude' => $request->json()->get('latitude'),
        ]);
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

}
