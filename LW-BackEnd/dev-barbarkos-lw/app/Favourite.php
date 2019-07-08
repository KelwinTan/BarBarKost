<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favourite extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['id', 'user_id', 'property_id', 'property_type'];

    public function User(){
        return $this->belongsTo(User::class);
    }

    public function Properties(){
        return $this->belongsTo(KostModel::class, 'property_id');
    }

    public function Apartments(){
        return $this->belongsTo(ApartmentModel::class, 'property_id');
    }
}
