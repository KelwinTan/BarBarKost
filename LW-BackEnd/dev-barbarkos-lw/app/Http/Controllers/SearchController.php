<?php

namespace App\Http\Controllers;

use App\ApartmentModel;
use App\KostModel;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Redis;

class SearchController extends Controller
{

    public function Searching(Request $request){
        $key = $request->keyword;
        $redis = Redis::connection();

        $range = $key == 'Ap' ? null : $redis->lrange($key, 0,4);
        if($range!=null){
            $arr = [];
            foreach($range as $r){
                array_push($arr, json_decode($r));
            }
            return response()->json([
                'data' => $arr
            ]);
        }
        $properties = KostModel::where('name', 'like', '%'.$key.'%')->orderByDesc('total_views')->paginate(5);
        return $properties;
    }


    public function SearchPropertyNear(Request $request){
        $latitude = $request->lat;
        $longitude = $request->lng;


        if($request->type == "Kost"){
            if($request->gender!=null){
                $property = KostModel::selectRaw('*, ( 6367 * acos( cos( radians( ? ) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( ? ) ) + sin( radians( ? ) ) * sin( radians( latitude ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
                    ->having('distance', '<', 30)
                    ->orderBy('distance')->where('kost_gender', $request->gender)->get(10);

            }else{
                $property = KostModel::selectRaw('*, ( 6367 * acos( cos( radians( ? ) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( ? ) ) + sin( radians( ? ) ) * sin( radians( latitude ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
                    ->having('distance', '<', 30)
                    ->orderBy('distance')->get(10);

            }
        }else if($request->type == "Apartment"){
            if($request->floors !=null){
                $property = ApartmentModel::selectRaw('*, ( 6367 * acos( cos( radians( ? ) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( ? ) ) + sin( radians( ? ) ) * sin( radians( latitude ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
                    ->having('distance', '<', 30)
                    ->orderBy('distance')->where('unit_floor', $request->floors)->get(10);

            }else{
                $property = ApartmentModel::selectRaw('*, ( 6367 * acos( cos( radians( ? ) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( ? ) ) + sin( radians( ? ) ) * sin( radians( latitude ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
                    ->having('distance', '<', 30)
                    ->orderBy('distance')->get(10);

            }
        }

        if($request->priceType == "Murah"){
            $property->orderBy('prices', 'asc');
        }else if($request->priceType == "Murah") {
            $property->orderBy('prices', 'desc');
        }
//        $property = $property->paginate(10);
        $property = $this->paginate($property);
        return $property;
    }

    public function paginate($items, $perPage = 10, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }

}
