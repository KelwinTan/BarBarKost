<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Follower extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['id', 'follower_count', 'owner_id'];

    public function User(){
        return $this->belongsTo(User::class, 'owner_id');
    }
}
