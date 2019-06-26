<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Facility extends Model
{
    use SoftDeletes;
    protected $keyType = 'string';
    public $incrementing = false;
    protected $softDelete = true;


    protected $fillable = [
        'id', 'name', 'icon', 'group'
    ];



}
