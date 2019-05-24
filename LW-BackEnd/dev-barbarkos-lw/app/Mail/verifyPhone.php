<?php

namespace App\Mail;

use App\User;
use App\verify_phone;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class verifyPhone extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $user;
    public $verified;

    public function __construct(User $user, verify_phone $verified)
    {
        $this->user = $user;
        $this->verified = $verified;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.verify-phone');
    }
}
