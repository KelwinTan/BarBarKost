<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

}
