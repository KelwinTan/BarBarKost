<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ApartmentModel extends Model
{
    use SoftDeletes;
    protected $table = 'apartment_models';
    protected $softDelete = true;

    protected $fillable = [
        'id', 'name', 'pictures', 'banner_picture', 'picture_360','video', 'description',
        'unit_type', 'unit_area', 'unit_condition', 'unit_floor','unit_facilities', 'unit_public_facilities',
        'parking_facilities', 'additional_information', 'additional_fees', 'prices', 'city', 'address', 'longitude',
        'latitude',
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
