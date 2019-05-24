<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class verify_phone extends Model
{
    use Notifiable;
    protected $guarded = [];
    protected $table = 'verify_phones';

    protected $fillable = [
        'id', 'user_id', 'phone', 'token'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
