<?php

namespace App\Http\Controllers;

use App\Facility;
use App\Http\Requests\FacilityRequest;
use App\Http\Requests\FacilityRequest1;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Webpatser\Uuid\Uuid;

class FacilityController extends Controller
{
    public function InsertFacility(FacilityRequest $request){
//        dd($request);
        $newFacility = Facility::create([
            'id' => Uuid::generate()->string,
            'name' => $request->name,
            'icon' => $request->icon,
            'group' => $request->group
        ]);
        $redis = Redis::connection();
        $redis->del('facilities');
        return response(compact('newFacility'));
    }

    public function DeleteFacility(Request $request){
        Facility::where('icon', $request->icon)->delete();
        return response('Facility has been deleted');
    }

    public function GetFacility(){
        return Facility::paginate(10);
    }

    public function GetFacilityRedis(){
        $redis = Redis::connection();
        if($redis->get('facilities') == null){
            $redis->set('facilities', Facility::all());
        }
        $redisRes = json_decode($redis->get('facilities'));
        return $redisRes    ;
    }

    public function UpdateFacility(FacilityRequest1 $request){
        $facility = Facility::where('icon', $request->icon)->get()->first();
        $facility->name = $request->name;
        $facility->group = $request->group;
        $facility->save();
        return $facility;
    }


    public function MultipleQuery(Request $request){
        $facilities =Facility::where('name', $request->filterName)->orWhere('name', 'like', '%'.$request->filterName.'%')->where('group', $request->group)->paginate(10);
//        dd($facilities);
        return $facilities;
    }

}
