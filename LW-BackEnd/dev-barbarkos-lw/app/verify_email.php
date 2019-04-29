<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class verify_email extends Model
{
    //
    use Notifiable;

    protected $table = 'verify_emails';

    protected $fillable = [
        'id', 'user_id', 'email', 'token'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

}
