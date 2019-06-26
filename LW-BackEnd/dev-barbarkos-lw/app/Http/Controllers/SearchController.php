<?php

namespace App\Http\Controllers;

use App\KostModel;
use Illuminate\Http\Request;
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


}
