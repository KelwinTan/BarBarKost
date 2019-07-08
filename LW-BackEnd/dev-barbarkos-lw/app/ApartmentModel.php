<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ApartmentModel extends Model
{
    use SoftDeletes;
    use Sluggable;

    protected $table = 'apartment_models';
    protected $softDelete = true;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id', 'name', 'pictures', 'banner_picture', 'picture_360','video', 'description',
        'unit_type', 'unit_area', 'unit_condition', 'unit_floor','unit_facilities', 'unit_public_facilities',
        'parking_facilities', 'additional_information', 'additional_fees', 'prices', 'city', 'address', 'longitude',
        'latitude','owner_id', 'slug'
    ];

//    protected $hidden = [
//        'created_at', 'updated_at'
//    ];


//    protected $hidden = [
//        'created_at', 'updated_at'
//    ];
    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }


    public function photos(){
        return $this->morphMany('App\ImageFiles', 'imageable');
    }

    public function Transaction(){
        return $this->belongsTo(Transaction::class, 'owner_id', 'owner_id');
    }

    public function User(){
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }
}
