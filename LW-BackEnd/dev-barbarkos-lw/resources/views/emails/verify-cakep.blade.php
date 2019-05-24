@component('mail::message')
# Email Verification

Hello {{$user['name']}},
## Your registered email-id is {{$user['email']}}
## Please click on the below link to verify your email account

@component('mail::button', ['url' => url('api/user/verify', $user->verifyUser->token)])
Click Here
@endcomponent

@component('mail::panel', ['url' => ''])
Mau cari Kost-kostan murah ?
Di BarBar Kost aja!

![alt text](https://ihatetomatoes.net/demos/_rw/01-real-estate/tn_property04.jpg "Logo Title Text 1")
@endcomponent

Thanks,<br>
BarBar Kost
@endcomponent
