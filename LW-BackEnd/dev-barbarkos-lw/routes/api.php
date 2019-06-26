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
Route::post('get-owner-apart', 'ApartmentController@getOwnerApartment');

Route::get('home', 'UserController@BackHome');
Route::get('total-users', 'UserController@getTotalUsers');

Route::get('KostData', 'KostController@getAllKost');
Route::post('/ownerTotalKost', 'KostController@OwnerTotalKost');
Route::post('owner-kost', 'KostController@getOwnerKost');
Route::post('specific-kost', 'KostController@SpecificKost');
Route::post('delete-kost', 'KostController@DeleteKost');
Route::post('update-kost', 'KostController@updateKost');
Route::post('delete-kost-imageprev', 'KostController@DeleteSpecificImage');
Route::post('/owner-get-specific-apartment', 'ApartmentController@getSpecificApartment');
Route::post('/delete-apartment', 'ApartmentController@DeleteApartment');
Route::post('/owner-total-apartment', 'ApartmentController@OwnerTotalApartment');

Route::post('SearchApartments', 'ApartmentController@SearchApartments');

Route::middleware('auth:api')->get('/user', function(Request $request){
    return $request->user();
});


//Route::group(['middleware'=> ['jwt.auth']], function (){
Route::post('/SendMessage/{channelId}', 'ChatController@SendMessage');
Route::post('/SendChat', 'ChatController@SendChatRedis');
Route::post('/Get-All-Chat', 'ChatController@getAllChat');
Route::post('/Get-Chat-List', 'ChatController@getChatList');


//});

Route::get('/image-view', 'ImageController@Index');
Route::post('/upload-image', 'ImageController@Store');
Route::post('/get-image', 'ImageController@getImages');

Route::post('/create-review', 'ReviewController@store');


Route::post('/test-redis', 'UserController@TestRedis');

Route::post('/insert-post', 'PostController@InsertPost');
Route::post('/delete-post', 'PostController@DeletePost');
Route::post('/get-all-post', 'PostController@getAllPost');
Route::post('/get-specific-post', 'PostController@getSpecificPost');
Route::post('/update-post', 'PostController@UpdatePost');
Route::post('/insert-post-review', 'PostController@InsertPostReview');

Route::post('/insert-facility', 'FacilityController@InsertFacility');
Route::post('/delete-facility', 'FacilityController@DeleteFacility');
Route::post('/get-facility', 'FacilityController@GetFacility');
Route::post('/update-facility', 'FacilityController@UpdateFacility');

Route::post('/get-10-guest', 'AdminController@Get10Guests');
Route::post('/get-10-owners', 'AdminController@Get10Owners');

Route::post('/reset-password', 'AdminController@ResetPassword');
Route::post('/get-specific-user', 'AdminController@GetSpecificUser');
Route::post('/ban-specific-user', 'AdminController@BanUser');

Route::post('/create-premium', 'PremiumController@store');
Route::post('/show-premium', 'PremiumController@show');
Route::post('/get-specific-premium', 'PremiumController@GetSpecificPremium');
Route::post('/delete-premium', 'PremiumController@destroy');
Route::post('/update-premium', 'PremiumController@update');
Route::post('/add-promo-premium', 'PremiumController@AddPromo');
Route::post('/remove-promo-premium', 'PremiumController@RemovePromo');

Route::post('/create-transaction', 'TransactionController@store');
Route::get('/laporan-pdf', 'TransactionController@ExportPDF');
