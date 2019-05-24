<?php

namespace App\Http\Controllers;

use App\Mail\verifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Webpatser\Uuid\Uuid;
use App\User;
use App\verify_email;


class VerifyEmailController extends Controller
{
    //

    public function verifyUserEmail(Request $request){
        $user = User::where('email', $request->json()->get('email'))->get()->first();
        $verified = verify_email::create([
            'user_id' => $user->id,
            'email'=> $user->email,
            'token' => Uuid::generate()->string
        ]);
        $user->email_verified_at = $verified->created_at;
        $user->save();
        echo("Verify Success");
    }

    public function verifyUser(Request $request)
    {
//        dd($request);
        $user = User::where('email', $request->json()->get('email'))->first();
        if($user->email_verified_at!==null){
            echo("verified");
            return;
        }
        $verified = verify_email::create([
            'id'=> Uuid::generate()->string,
            'user_id' => $user->id,
            'email'=> $user->email,
            'token' => Uuid::generate()->string
        ]);

        Mail::to($user->email)->send(new verifyEmail($user));
    }

    public function verifyUserToken($token){
        $verifyUser = verify_email::where('token', $token)->first();
//        dd($verifyUser);
        if (isset($verifyUser)){
            $user = User::where('email', $verifyUser->email)->get()->first();
            $user->email_verified_at = $verifyUser->created_at;
            $user->save();
            echo("Verify Success");
        }
//        echo("Verify Already");
        return redirect('http://localhost:3000/');
    }


}
