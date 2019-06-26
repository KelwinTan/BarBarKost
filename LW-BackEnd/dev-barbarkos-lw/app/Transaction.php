<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use SoftDeletes;

    protected $softDelete = true;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id', 'owner_id', 'premium_id', 'start_date', 'end_date', 'premium_status'
    ];

}
