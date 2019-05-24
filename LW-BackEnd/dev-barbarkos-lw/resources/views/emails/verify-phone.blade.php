@component('mail::message')

# Email Verification
Hello {{$user['name']}},
## Your registered phone number is {{$user['phone']}}
<br>
# Your Token {{$verified['token']}}

@component('mail::panel', ['url' => ''])
    Mau cari Kost-kostan murah ?
    Di BarBar Kost aja!
    ![alt text](https://ihatetomatoes.net/demos/_rw/01-real-estate/tn_property04.jpg "Logo Title Text 1")
@endcomponent

@component('mail::button', ['url' => url('api/home')])
    Click Here
@endcomponent

Thanks,<br>
BarBar Kost
@endcomponent
