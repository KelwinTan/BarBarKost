<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Premium extends Model
{
    use Sluggable;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;
    protected $softDelete = true;

    protected $fillable = [
        'id', 'premium_name', 'premium_price', 'duration', 'slug', 'promo'
    ];

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
                'source' => 'premium_name'
            ]
        ];
    }

}
