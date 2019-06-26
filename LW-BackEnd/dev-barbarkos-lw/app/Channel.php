<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    public $incrementing = false;
    protected  $primaryKey = 'id';

    protected $fillable = [
        'user_1', 'user_2'
    ];

    public function sender(){
        return $this->belongsTo(User::class, 'user_1');
    }

    public  function receiver(){
        return $this->belongsTo(User::class, 'user_2');
    }

    public function  message(){
        return $this->hasMany(Message::class);
    }

}
