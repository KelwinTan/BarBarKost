<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public $incrementing = false;
    protected $primaryKey = 'id';

    protected $fillable = [
        'id', 'message', 'status', 'channel_id', 'sent_time'
    ];

    public function channel(){
        return $this->belongsTo(Channel::class, 'channel_id');
    }

}
