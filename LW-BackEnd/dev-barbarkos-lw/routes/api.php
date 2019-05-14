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
Route::get('profile', 'UserController@getAuthenticatedUser');
Route::get('send', 'MailController@send');
Route::delete('users/delete/{email}', 'UserController@destroyUser');
Route::post('users/update', 'UserController@updateUserPassword');

Route::post('userFollowers', 'UserFollowersController@registerFollower');
Route::post('unfollowUser', 'UserFollowersController@unfollow');

Route::post('verifyEmail', 'VerifyEmailController@verifyUserEmail');

Route::post('fileupload', 'FileUploadController@store');

Route::middleware('auth:api')->get('/user', function(Request $request){
    return $request->user();
});