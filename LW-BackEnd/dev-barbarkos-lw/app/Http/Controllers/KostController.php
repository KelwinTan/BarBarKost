<?php

namespace App\Http\Controllers;

use App\Http\Requests\KostRequest;
use App\KostModel;
use Illuminate\Http\Request;
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
            'kost_slug' => substr(md5(microtime()),rand(0,26),5) + $validate['name']
            ]);
//        dd($errors);
        return response()->json('Insert Kost Success!');
    }

    public function getAllKost(){
        return KostModel::paginate(10);
    }

}
