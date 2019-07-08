<?php

namespace App\Http\Controllers;

use App\Favourite;
use Illuminate\Http\Request;
use Webpatser\Uuid\Uuid;


class FavouriteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $favourite = Favourite::where('property_id', $request->property_id)->where('user_id', $request->user_id)->first();
        if(is_null($favourite)){
            Favourite::create([
                'id' => Uuid::generate()->string,
                'property_id' => $request->property_id,
                'user_id' => $request->user_id,
                'property_type' => $request->property_type
            ]);
            return response()->json('Favourite Property has been stored');
        }
        return $favourite;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Favourite  $favourite
     * @return \Illuminate\Http\Response
     */
    public function show(Favourite $favourite)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Favourite  $favourite
     * @return \Illuminate\Http\Response
     */
    public function edit(Favourite $favourite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Favourite  $favourite
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Favourite $favourite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Favourite  $favourite
     * @return \Illuminate\Http\Response
     */
    public function destroy(Favourite $favourite)
    {
        //
    }

    public function KostFavourite(Request $request){
        return Favourite::with('properties')->where("user_id", $request->user_id)->where("property_type", "Kost")->paginate(10);
    }

    public function ApartFavourite(Request $request){
        return Favourite::with('apartments')->where("user_id", $request->user_id)->where("property_type", "Apartment")->paginate(10);
    }

    public function FavouriteProperties(Request $request){
        return Favourite::with('properties')->with('apartments')->where("user_id", $request->user_id)->paginate(10);
    }

}
