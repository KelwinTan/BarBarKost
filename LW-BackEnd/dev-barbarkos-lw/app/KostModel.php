<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class KostModel extends Model
{
    use SoftDeletes;
    protected $table = 'properties';

    protected $softDelete = true;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id', 'name', 'pictures', 'owner_id', 'banner_picture', 'picture_360', 'video', 'description', 'room_facilities', 'room_area', 'public facilities', 'parking_facilities',
        'additional_information', 'additional_fees', 'prices', 'kost_slug', 'city', 'address', 'total_rooms', 'room_left', 'total_views', 'longitude', 'latitude', 'kost_gender'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function photos(){
        return $this->morphMany('App\ImageFiles', 'imageable');
    }

    public function getReview(){
        return $this->morphMany('App\Review', 'reviewable');
    }

    public function Transaction(){
        return $this->belongsTo(Transaction::class, 'owner_id', 'owner_id');
    }

    public function User(){
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }

}
