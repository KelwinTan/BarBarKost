<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use Sluggable;
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;
    protected $softDelete = true;
    protected $fillable = [
        'id', 'title', 'content', 'thumbnail_path', 'tags', 'visibility', 'slug'
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
                'source' => 'title'
            ]
        ];
    }

    public function Review(){
        return $this->morphMany(Review::class, 'reviewable');
    }

}
