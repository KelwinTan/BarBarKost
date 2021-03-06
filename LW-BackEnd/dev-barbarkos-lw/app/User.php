<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject{
    use Notifiable;
    
    const TYPE_GUEST = 1;
    const TYPE_OWNER = 2;
    const TYPE_ADMIN = 3;

    const STATUS_REGISTERED = 1;
    const STATUS_INACTIVE = 2;
    const STATUS_BANNED = 3;


    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id','name', 'email', 'password', 'username', 'picture_id', 'email_verified_at', 'phone', 'phone_verified_at', 'status','type', 'slug'
    ];

    protected $hidden = [
        'password', 'remember_token'
    ];

    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){
        return [];
    }

    public function verifyUser()
    {
        return $this->hasOne('App\verify_email');
    }

    // public static function boot(){
    //     parent::boot();
    //     self::creating(function ($user) {
    //         $user->id = (string) Uuid::generate(4);
    //     });
    // }

    public function pictures(){
        return $this->hasMany(ImageFiles::class, 'id', 'user_id');
    }

}
