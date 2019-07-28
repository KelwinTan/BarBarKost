<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Follow extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    use SoftDeletes;

    protected $fillable = ['id', 'user_id', 'owner_id'];

    public function User(){
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function Followers(){
        return $this->belongsTo(Follower::class, 'owner_id', 'owner_id');
    }

    public function SearchOwner($name){
        return $this->belongsTo(User::class, 'owner_id')->where('name', 'LIKE', '%'.$name.'%');
    }
}
