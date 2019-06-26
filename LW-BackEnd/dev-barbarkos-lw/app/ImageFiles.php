<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImageFiles extends Model
{
    protected $table = 'image-posts';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [ 'id', 'imageable_id', 'imageable_type', 'filename'];

    public function imageable(){
        return $this->morphTo();
    }

}
