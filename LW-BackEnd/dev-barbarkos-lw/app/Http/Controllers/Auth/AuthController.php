<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use JWTAuthException;

class AuthController extends Controller
{
    //
    public function store(Request $request){
        $this->validate($request,[
            'name'=>'required',
            'email'=>'requird|email',
            'password'=>'required|min:5' 
        ]);
        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');
        
        $user = new User([
            'name'=>$name,
            'email'=>$email,
            'password'=>bcrypt($password)
        ]);
        
        $credentials = [
            'email'=>$email,
            'password'=>$password
        ];

        if($user->save()){
            $token = null;
            try{
                if(!$token = JWTAuth::attempt($credentials)){
                    return response()->json([
                        'msg'=>'Email or Password are incorrect',
                    ], 404);
                }
            }catch(JWTAuthException $e){
                return response()->json([
                    'msg' => 'failed_to_create_token',
                ], 404);
            }
            $user->signin = [
                'href' => 'api/v1/user/signin',
                'method' => 'POST',
                'params' => 'email, password'
            ];
            $response = [
                'msg' => 'User Created',
                'user' => $user,
                'token' => $token
            ];
            return response()->json($response, 201);
        }

    }

}
