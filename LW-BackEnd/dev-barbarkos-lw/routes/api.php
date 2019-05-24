<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('register', 'UserController@register');
Route::post('registerOwner', 'UserController@registerOwner');
Route::post('login', 'UserController@login');
Route::post('loginOwner', 'UserController@loginOwner');
Route::post('ResetPassword', 'UserController@ResetPassword');

Route::post('GetGuest', 'UserController@getGuestData');


Route::get('profile', 'UserController@getAuthenticatedUser');
Route::get('send', 'MailController@send');
Route::delete('users/delete/{email}', 'UserController@destroyUser');
Route::post('users/update', 'UserController@updateUserPassword');
Route::post('users/updatePhone', 'UserController@updateUserPhone');

Route::get('logout/{token}', 'UserController@logoutUser');

Route::post('userFollowers', 'UserFollowersController@registerFollower');
Route::post('unfollowUser', 'UserFollowersController@unfollow');

Route::post('verifyEmail', 'VerifyEmailController@verifyUserEmail');

Route::post('fileupload', 'FileUploadController@store');

Route::post('verifyUser', 'VerifyEmailController@verifyUser');
Route::get('sendEmailDone', 'VerifyEmailController@sendEmailDone');
Route::get('/user/verify/{token}', 'VerifyEmailController@verifyUserToken');


Route::post('verifyPhone', 'VerifyPhoneController@verifyPhone');
Route::post('verifyPhoneToken', 'VerifyPhoneController@verifyPhoneToken');

Route::post('insert-kost', 'KostController@InsertKost');
Route::post('insert-apartment', 'ApartmentController@InsertApartment');

Route::get('home', 'UserController@BackHome');

Route::get('KostData', 'KostController@getAllKost');

Route::post('SearchApartments', 'ApartmentController@SearchApartments');

Route::middleware('auth:api')->get('/user', function(Request $request){
    return $request->user();
});
