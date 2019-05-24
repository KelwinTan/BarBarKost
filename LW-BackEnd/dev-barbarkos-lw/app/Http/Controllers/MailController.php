<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class MailController extends Controller
{
    //
    public function send(Request $request){
        $data = array('name'=>"Kelwin Tantono");

        Mail::send(['text'=>'mail'], $data, function($message) {    
            $message->to('kelwintan7@gmail.com', 'Tutorials Point')->subject
                ('Laravel Basic Testing Mail');
            $message->from('lw.kelwin@gmail.com','LW18-2');
        });
        echo "Basic Email Sent. Check your inbox.";
    }

}
