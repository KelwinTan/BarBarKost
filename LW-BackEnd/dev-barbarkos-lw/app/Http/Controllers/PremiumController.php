<?php

namespace App\Http\Controllers;

use App\Http\Requests\PremiumRequest;
use App\Premium;
use http\Env\Response;
use Illuminate\Http\Request;
use Webpatser\Uuid\Uuid;

class PremiumController extends Controller
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


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PremiumRequest $request)
    {
//        dd($request);
        Premium::create([
            'id' => Uuid::generate()->string,
            'premium_name' => $request->premium_name,
            'premium_price' => $request->premium_price,
            'duration' => $request->duration,
            'promo' => $request->promo
        ]);
        return response('Premium Content Created');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Premium  $premium
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return Premium::paginate(10);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Premium  $premium
     * @return \Illuminate\Http\Response
     */
    public function edit(Premium $premium)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Premium  $premium
     * @return \Illuminate\Http\Response
     */
    public function update(PremiumRequest $request)
    {
        $premium = Premium::where('id', $request->id)->update([
            'premium_name' => $request->premium_name,
            'premium_price' => $request->premium_price,
            'duration' =>  $request->duration,
        ]);
        return response('Premium Product Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Premium  $premium
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Premium::where('slug', $request->slug)->delete();
    }

    public function GetSpecificPremium(Request $request){
        return Premium::where('slug', $request->slug)->get();
    }

    public function AddPromo(Request $request){
        $premium = Premium::where('id', $request->id)->update([
            'promo' => $request->promo
        ]);
        return response('Premium Promo Added');
    }

    public function RemovePromo(Request $request){
        $premium = Premium::where('id', $request->id)->update([
            'promo' => null
        ]);
        return response('Premium Promo Added');
    }

}
