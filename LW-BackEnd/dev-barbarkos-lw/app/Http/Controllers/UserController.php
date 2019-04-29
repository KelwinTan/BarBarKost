<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Webpatser\Uuid\Uuid;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;

class UserController extends Controller{



    public function register(Request $request){
        $validator = Validator::make($request->json()->all(), [
            'name' => 'required|string|max:255', 'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        // print_r(Uuid::generate()->string);

        $user = User::create([
            'id' => Uuid::generate()->string,
            'type' => User::TYPE_GUEST,
            'username' => $request->json()->get('name'), 
            'name' => $request->json()->get('name'),
            'email' => $request->json()->get('email'),
            'password' => bcrypt($request->json()->get('password')),
        ]);
        
        $token = JWTAuth::fromUser($user);
        
        return response()->json(compact('user', 'token'), 201);
    }

    public function registerOwner(Request $request){
        $validator = Validator::make($request->json()->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'required|string|unique:users',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        // print_r(Uuid::generate()->string);

        $user = User::create([
            'id' => Uuid::generate()->string,
            'type' => User::TYPE_OWNER,
            'username' => $request->json()->get('name'), 
            'name' => $request->json()->get('name'),
            'email' => $request->json()->get('email'),
            'password' => bcrypt($request->json()->get('password')),
            'phone' => $request->json()->get('phone'),
        ]);
        
        $token = JWTAuth::fromUser($user);
        
        return response()->json(compact('user', 'token'), 201);
    }

    public function login(Request $request){
        $credentials = $request->json()->all();
        // $myTTL = 30;
        try{
            if(! $token = JWTAuth::attempt($credentials)){
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        }catch(JWTException $e){
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser(){

        try{
            if(!$user = JWTAuth::parseToken()->authenticate()){
                return response()->json(['user_not_found'], 404);
            }
        }catch(Tymon\JWTAuth\Exceptions\TokenExpiredExceptions $e){
            return response()->json(['token_expired'], $e->getStatusCode());
        }catch(Tymon\JWTAuth\Exceptions\TokenInvalidExceptions $e){
            return response()->json(['token_inavlid'], $e->getStatusCode());
        }catch(Tymon\JWTAuth\Exceptions\JWTException $e){
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }
    
    public function destroyUser($email){
        $user = User::where('email', $email)->get()->first();
        // $user = User::find($email);
        // dd($user);
        $user->delete();
        
        echo("Delete Success");
    }

    public function updateUserPassword(Request $request){
        $user = User::where('email', $request->json()->get('email'))->get()->first();
        $user->password = bcrypt($request->json()->get('updatePassword'));
        // dd($user);
        $user->save();
    }

    public function updateUserProfile(){
        
    }

    // public function 
    
}  