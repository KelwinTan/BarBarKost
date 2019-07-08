<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuestLoginRequest;
use App\Http\Requests\GuestRegisterRequest;
use App\Http\Requests\OwnerLoginRequest;
use App\Http\Requests\OwnerRegisterRequest;
use App\Mail\emailThrottle;
use App\Mail\verifyPhone;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;
use Webpatser\Uuid\Uuid;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;
use Carbon\Carbon;

class UserController extends Controller{

    use AuthenticatesUsers;

    public function register(GuestRegisterRequest $request){
        $validated = $request->validated();
        // print_r(Uuid::generate()->string);
//        dd($validated);
        $user = User::create([
            'id' => Uuid::generate()->string,
            'type' => User::TYPE_GUEST,
            'username' => $validated['name'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt(base64_decode($validated['password'])),
            'slug' =>  str_replace(' ', '-', $validated['name']) . '-' . substr(md5(microtime()),rand(0,26),5),
        ]);
//        dd($user);
//        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user'), 201);
    }

    public function registerOwner(OwnerRegisterRequest $request){
        $validated = $request->validated();
//        dd($validated);
        // print_r(Uuid::generate()->string);
//        dd($request);

        $user = User::create([
            'id' => Uuid::generate()->string,
            'type' => User::TYPE_OWNER,
            'username' => $validated['name'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' =>  bcrypt(base64_decode($validated['password'])),
            'phone' => $validated['phone'],
            'slug' =>  str_replace(' ', '-', $validated['name']) . '-' . substr(md5(microtime()),rand(0,26),5),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user'), 201);
    }

    public function login(GuestLoginRequest $request){
        $validated = $request->validated();

//        dd($validated);

        if ($this->hasTooManyLoginAttempts($request)){
            //Fire the lockout event.
            $this->fireLockoutEvent($request);
            //redirect the user back after lockout.
//            dd("weh salah");
            $user = User::where('email', $validated['email'])->get()->first();
//            dd($user->email);
            Mail::to($user->email)->send(new emailThrottle($user));
            return $this->sendLockoutResponse($request);
        }

        $credentials['email'] = $validated['email'];
        $credentials['password'] = base64_decode($validated['password']);
//        dd($credentials);

        $extendTime = $request->json()->get('rememberMe');

        if($extendTime != null && $extendTime){
            $myTTL = 10080;
            JWTAuth::factory()->setTTL($myTTL);
        }
//        dd(JWTAuth::attempt($credentials));
        try{
            if(! $token = JWTAuth::attempt($credentials)){
//                $attempts = $attempts + 1;
                $this->incrementLoginAttempts($request);
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        }catch(JWTException $e){
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
//        echo("Hello");
        $this->clearLoginAttempts($request);

        return response()->json(compact('token', ['user' => auth()->user()]));
    }

    public function loginOwner(OwnerLoginRequest $request){
        $validated = $request->validated();
//        dd($validated);
        if ($this->hasTooManyLoginAttempts($request)){
            //Fire the lockout event.
            $this->fireLockoutEvent($request);
            //redirect the user back after lockout.
//            dd("weh salah");
            $user = User::where('phone', $validated['phone'])->get()->first();
//            dd($user->email);
            Mail::to($user->email)->send(new emailThrottle($user));
            return $this->sendLockoutResponse($request);
        }

        $credentials['phone'] = $validated['phone'];
        $credentials['password'] = base64_decode($validated['password']);
//        dd($credentials);
        $extendTime = $request->json()->get('rememberMe');
//        dd(JWTAuth::attempt($credentials));
        if($extendTime != null && $extendTime){
            $myTTL = 10080;
            JWTAuth::factory()->setTTL($myTTL);
        }

        try{
            if(! $token = JWTAuth::attempt($credentials)){
                $this->incrementLoginAttempts($request);
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        }catch(JWTException $e){
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
//        echo("Hello");
        $this->clearLoginAttempts($request);
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
        $user = User::where('id', $request->id)->get()->first();
        if ($request->name != null){
            $user->name = $request->name;
            $user->slug = str_replace(' ', '-', $request->name . '-' . substr(md5(microtime()),rand(0,26),5));
        }

        if($request->password != null){
            $user->password = bcrypt($request->updatePassword);
        }

        if($request->username != null){
            $user->username = $request->username;
        }

        if($request->email != $user->email){
            $user->email = $request->email;
            $user->email_verified_at = null;
        }

        if($request->phone != null){
            $user->phone = $request->phone;
            $user->phone_verified_at = null;
        }

        if($request->hasFile('profile')) {
            //Get FileName with the extension
            $fileNameWithExt = $request->file('profile')->getClientOriginalName();
            //Get just filename
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //Get Just ext
            $extension = $request->file('profile')->getClientOriginalExtension();
            //File Name to store
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            //Upload Image
            $profile = $request->file('profile')->storeAs('public/profile', $fileNameToStore);
            $profilePath = "profile/".$fileNameToStore;
        }else{
            $profilePath  = $user->picture_id;
        }
        $user->picture_id = $profilePath;
        $user->save();


        return response("Update Success");
    }

    public function updateUserPhone(Request $request){
        $user = User::where('email', $request->json()->get('email'))->get()->first();
//        dd($user);
        $user->phone = $request->json()->get('updatePhone');
        $user->save();
        echo("Success");
    }

    public function updateUserProfile(){

    }

    public function BackHome(){
        echo('hello');
        return redirect('http://localhost:3000/enter-phone-token');
    }

    public function logoutUser(){
        auth()->logout();
        \Tymon\JWTAuth\Facades\JWTAuth::invalidate(\Tymon\JWTAuth\Facades\JWTAuth::getToken());
        echo('logout success');
    }

    public function ResetPassword(Request $request){
        $user = User::where('email', $request->json()->get('email'))->get()->first();
//        dd($user);
        $user->password = $user->name;
        $user->save();
        echo("Reset User Password Success");
    }

    public function getGuestData(Request $request){
//        dd($request);
        $user = User::where('email', $request->json()->get('email'))->get()->first();
//        dd($user);
        if($user->type === 3){
            return User::paginate(10);
        }
        else{
            return response()->json('You are unauthorized');
        }
    }
    public function getTotalUsers(){
        return User::count();
    }

    public function TestRedis(Request $request){
        $keyword = $request->keyword;
        $redis = Redis::connection();
        return $redis->get($keyword);
    }


    public function GuestQueries(Request $request){

        $guests = User::where('email', 'like', '%@'.$request->emailDomain.'%')->where('name', 'like', '%'.$request->name.'%')->where('type', 1)->paginate(10);

        return $guests;
    }

    public function OwnerQueries(Request $request){

        $owners = User::where('email', 'like', '%@'.$request->emailDomain.'%')->where('name', 'like', '%'.$request->name.'%')->where('type', 2)->paginate(10);

        return $owners;
    }


}
