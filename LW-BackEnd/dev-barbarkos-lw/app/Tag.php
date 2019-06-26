<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'id', 'tag_name'
    ];

    protected $hidden = [
        'password', 'remember_token'
    ];
}
