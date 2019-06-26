<?php

namespace App\Http\Controllers;

use App\Mail\verifyEmail;
use App\Mail\verifyPhone;
use App\User;
use App\verify_email;
use App\verify_phone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Webpatser\Uuid\Uuid;

class VerifyPhoneController extends Controller
{

    public function verifyPhone(Request $request)
    {
//        dd($request);
        $user = User::where('phone', $request->json()->get('phone'))->get()->first();
//        dd($user);
        $verified = verify_phone::create([
            'id'=> Uuid::generate()->string,
            'user_id' => $user->id,
            'phone'=> $user->phone,
            'token' => substr(md5(microtime()),rand(0,26),5)
        ]);

        Mail::to($user->email)->send(new verifyPhone($user, $verified));

    }

    public function verifyPhoneToken(Request $request){
        $verifyUser = verify_phone::where('token', $request->json()->get('token'))->first();

//        dd($verifyUser);
        if (isset($verifyUser)){
            $user = User::where('phone', $verifyUser->phone)->get()->first();
            $user->phone_verified_at = $verifyUser->created_at;
            $user->save();
            echo("Verify Success");
        }
        echo("Verify Already");
//        return redirect('http://localhost:3000/profile');
        return response()->json('Success');
    }


}
