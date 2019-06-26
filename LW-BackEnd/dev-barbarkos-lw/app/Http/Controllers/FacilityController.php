<?php

namespace App\Http\Controllers;

use App\Facility;
use App\Http\Requests\FacilityRequest;
use App\Http\Requests\FacilityRequest1;
use Illuminate\Http\Request;
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
        return response(compact('newFacility'));
    }

    public function DeleteFacility(Request $request){
        Facility::where('icon', $request->icon)->delete();
        return response('Facility has been deleted');
    }

    public function  GetFacility(){
        return Facility::paginate(10);
    }

    public function UpdateFacility(FacilityRequest1 $request){
        $facility = Facility::where('icon', $request->icon)->get()->first();
        $facility->name = $request->name;
        $facility->group = $request->group;
        $facility->save();
        return $facility;
    }


}
