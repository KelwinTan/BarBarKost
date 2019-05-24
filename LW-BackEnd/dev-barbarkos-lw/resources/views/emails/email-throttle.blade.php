@component('mail::message')
# Email Verification

Hello {{$user['name']}},
## Your registered email-id is {{$user['email']}}
## Alert you have tried to many times to login!
## Please wait for a minute and then try to login again.

@component('mail::panel', ['url' => ''])
    If that was not you, then you can change your password here...
@endcomponent

Thanks,<br>
BarBar Kost
@endcomponent
