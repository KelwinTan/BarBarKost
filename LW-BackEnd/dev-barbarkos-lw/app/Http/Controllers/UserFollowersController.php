<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Webpatser\Uuid\Uuid;
use Illuminate\Http\Request;
use App\User_Followers;

class UserFollowersController extends Controller
{
    public function registerFollower(Request $request){
        // $validator = Validator::make($request->json()->all(), [
        //     'name' => 'required|string|max:255', 
        //     'email' => 'required|string|email|max:255|unique:users',
        //     'password' => 'required|string|min:8',
        // ]);
        
        // if($validator->fails()){
        //     return response()->json($validator->errors()->toJson(), 400);
        // }

        $userFollowers = User_Followers::create([
            'user_id' => $request->json()->get('user_id'),
            'follower_id'=>$request->json()->get('follower_id'),
        ]);
        // dd($userFollowers);
        return response()->json(['message'=>'Success Inserting User Followers'], 201);
    }

    public function unfollow(Request $request){
        $userFollowers = User_Followers::where('id', $request->json()->get('id'))->get()->first();
        $userFollowers->delete();
        echo("SUCCESS IN UNFOLLOWING USER");     
    }


}
