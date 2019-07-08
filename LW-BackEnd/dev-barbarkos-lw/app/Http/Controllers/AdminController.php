<?php

namespace App\Http\Controllers;

use App\Mail\ResetPassword;
use App\Mail\verifyEmail;
use App\Premium;
use App\Transaction;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminController extends Controller
{
    public function Get10Guests(){
        return User::where('type', 1)->paginate(10);
    }

    public function Get10Owners(){
        return User::where('type', 2)->paginate(10);
    }

    public function ResetPassword(Request $request){
//        $characters = 'QWERTYUIOPASDFGHJKLZXCVBNMabcdefghijklmnopqrstuvwxyz0123456789';
//        $string = '';
//        $random_string_length = 10;
//        $max = strlen($characters) - 1;
//        for ($i = 0; $i < $random_string_length; $i++) {
//            $string .= $characters[mt_rand(0, $max)];
//        }
//        $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//        $length = 10;
//        return substr(str_shuffle(str_repeat($pool, 5)), 0, $length);
//        return response(compact('string'));

        $rnd = substr(md5(time()), 0, 12);
        $user = User::where('slug', $request->slug)->get()->first();

        $user->password = bcrypt($rnd);
        $user->save();
        Mail::to($user->email)->send(new ResetPassword($user, $rnd));

        return response()->json(['password'=> $rnd, 'user' => $user]);
    }

    public function GetSpecificUser(Request $request){
        return User::where('slug', $request->slug)->get();
    }

    public function BanUser(Request $request){
        $user = User::where('slug', $request->slug)->get()->first();
        $user->status = "Banned";
        $user->save();
        return response('User has been banned');
    }

    public function GetUser(Request $request){
        return User::where('id', $request->id)->first();
    }

    public function GetTransaction(Request $request){
        $data['transactions'] = Transaction::where('id', $request->id)->first();
        $data['user'] = User::where('id', $data['transactions']['owner_id'])->first();
        $data['premium'] = Premium::where('id', $data['transactions']['premium_id'])->first();
        return $data;
    }


}
