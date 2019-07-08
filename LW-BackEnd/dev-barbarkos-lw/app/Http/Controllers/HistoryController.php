<?php

namespace App\Http\Controllers;

use App\ApartmentModel;
use App\History;
use App\KostModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HistoryController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\History  $history
     * @return \Illuminate\Http\Response
     */
    public function show(History $history)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\History  $history
     * @return \Illuminate\Http\Response
     */
    public function edit(History $history)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\History  $history
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, History $history)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\History  $history
     * @return \Illuminate\Http\Response
     */
    public function destroy(History $history)
    {
        //
    }

    public function GuestLatestViews(Request $request){
        return History::with('properties')->with('apartments')->where('user_id', $request->user_id)->orderBy('created_at', 'descending')->paginate(10);

    }

    public function TopKost4(Request $request){
        $latitude = $request->lat;
        $longitude = $request->lng;
        $properties = KostModel::selectRaw('*, ( 6367 * acos( cos( radians( ? ) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( ? ) ) + sin( radians( ? ) ) * sin( radians( latitude ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
            ->having('distance', '<', 30)
            ->orderBy('distance')
            ->get();
//        return $properties;
        $history = History::select('property_id')->whereIn('property_id', $properties)->groupBy('property_id')->orderByRaw('COUNT(*) DESC')->limit(4)->with('properties')->whereHas('properties')->get();
//        return $history;
        if(count($history)!=4){
            $extra = History::select('property_id')->groupBy('property_id')->orderByRaw('COUNT(*) DESC')->limit(4-count($history))->with('properties')->whereHas('properties')->get();
//            $newHistory = $history->merger($extra);
            $arr = array_merge($history->toArray(), $extra->toArray());
            return $arr;

            array_push($history, $extra);
        }
//        $history = $history->whereIn('property_id', $properties)->get();
        return $history;
    }

    public function TopApart4(Request $request){
        $latitude = $request->lat;
        $longitude = $request->lng;
        $properties = ApartmentModel::selectRaw('*, ( 6367 * acos( cos( radians( ? ) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( ? ) ) + sin( radians( ? ) ) * sin( radians( latitude ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
            ->having('distance', '<', 30)
            ->orderBy('distance')
            ->get();
//        return $properties;
        $history = History::select('property_id')->whereIn('property_id', $properties)->groupBy('property_id')->orderByRaw('COUNT(*) DESC')->limit(4)->with('apartments')->whereHas('apartments')->get();
//        return $history;
        if(count($history)!=4){
            $extra = History::select('property_id')->groupBy('property_id')->orderByRaw('COUNT(*) DESC')->limit(4-count($history))->with('apartments')->whereHas('apartments')->get();
//            $newHistory = $history->merger($extra);
            $arr = array_merge($history->toArray(), $extra->toArray());
            return $arr;

//            array_push($history, $extra);
        }
//        $history = $history->whereIn('property_id', $properties)->get();
        return $history;
//        return History::select('property_id')->groupBy('property_id')->orderByRaw('COUNT(*) DESC')->limit(4)->with('apartments')->whereHas('apartments')->get();

    }

}
