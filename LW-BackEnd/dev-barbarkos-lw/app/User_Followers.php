<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User_Followers extends Model
{
    use SoftDeletes;
    
    protected $table = 'users_followers';

    protected $softDelete = true;

    protected $fillable = [
        'id', 'user_id', 'follower_id'
    ]; 

    protected $hidden = [
        'created_at', 'updated_at'
    ];    

}
