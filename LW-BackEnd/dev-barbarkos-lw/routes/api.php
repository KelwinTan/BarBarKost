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
Route::post('/registerOwner', 'UserController@registerOwner');
Route::post('login', 'UserController@login');
Route::post('loginOwner', 'UserController@loginOwner');
Route::post('ResetPassword', 'UserController@ResetPassword');
Route::post('/filter-guests', 'UserController@GuestQueries');
Route::post('/filter-owners', 'UserController@OwnerQueries');

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
Route::post('/suggest-kost', 'KostController@SuggestKost');

Route::post('insert-apartment', 'ApartmentController@InsertApartment');
Route::post('get-owner-apart', 'ApartmentController@getOwnerApartment');

Route::post('/suggest-apart', 'ApartmentController@SuggestApartment');

Route::get('home', 'UserController@BackHome');
Route::get('total-users', 'UserController@getTotalUsers');

Route::get('KostData', 'KostController@getAllKost');
Route::post('/ownerTotalKost', 'KostController@OwnerTotalKost');
Route::post('/owner-kost', 'KostController@getOwnerKost');
Route::post('/specific-kost', 'KostController@SpecificKost');
Route::post('/owner-specific-kost', 'KostController@OwnerGetSpecificKost');
Route::post('/owner-filter-kost', 'KostController@OwnerFilterKost');

Route::post('/delete-kost', 'KostController@DeleteKost');
Route::post('/update-kost', 'KostController@updateKost');
Route::post('/delete-kost-imageprev', 'KostController@DeleteSpecificImage');
Route::post('/owner-get-specific-apartment', 'ApartmentController@getSpecificApartment');
Route::post('/owner-get-apartment', 'ApartmentController@OwnerGetApart');
Route::post('/owner-update-apartment', 'ApartmentController@UpdateApartment');

Route::post('/delete-apartment', 'ApartmentController@DeleteApartment');
Route::post('/owner-total-apartment', 'ApartmentController@OwnerTotalApartment');

Route::post('/SearchApartments', 'ApartmentController@SearchApartments');
Route::post('/search-property', 'SearchController@Searching');

Route::middleware('auth:api')->get('/user', function(Request $request){
    return $request->user();
});


//Route::group(['middleware'=> ['jwt.auth']], function (){
//Route::post('/SendMessage/{channelId}', 'ChatController@SendMessage');
//Route::post('/SendChat', 'ChatController@SendChatRedis');
//Route::post('/Get-All-Chat', 'ChatController@getAllChat');
//Route::post('/Get-Chat-List', 'ChatController@getChatList');

Route::post('/Get-Chat-List', 'ChatController@GetChatList');
Route::post('/Get-Chat-Detail', 'ChatController@GetChatDetail');
Route::post('/Send-Message', 'ChatController@SendMessasge');
Route::post('/Create-Channel', 'ChatController@CreateChannel');

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
Route::post('/recommend-post', 'PostController@GetRecommend');
Route::post('/insert-post-review', 'PostController@InsertPostReview');
Route::post('/filter-post', 'PostController@PostFilter');

Route::post('/insert-facility', 'FacilityController@InsertFacility');
Route::post('/delete-facility', 'FacilityController@DeleteFacility');
Route::post('/get-facility', 'FacilityController@GetFacility');
Route::post('/get-facility-redis', 'FacilityController@GetFacilityRedis');

Route::post('/filter-facility', 'FacilityController@MultipleQuery');

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
Route::post('/filter-premium', 'PremiumController@PremiumFilter');

Route::post('/create-transaction', 'TransactionController@store');
Route::get('/laporan-pdf', 'TransactionController@ExportPDF');
Route::post('/admin-verify-transaction', 'TransactionController@VerifyTransaction');
Route::post('/admin-view-complete', 'TransactionController@ViewComplete');

Route::post('/owner-history-transaction', 'TransactionController@OwnerGetComplete');
Route::post('/owner-ongoing-transaction', 'TransactionController@OwnerGetOngoing');
Route::post('/owner-cancel-transaction', 'TransactionController@OwnerCancelTransaction');
Route::post('/admin-view-incomplete', 'TransactionController@ViewIncomplete');

Route::group(['middleware' => ['check.role'], 'prefix' => '/user/admin'], function (){



});

Route::post('/admin-get-user-trans', 'AdminController@GetUser');
Route::post('/admin-get-trans', 'AdminController@GetTransaction');

Route::post('/guest-report', 'ReportController@store');
Route::post('/get-guest-report', 'ReportController@show');
Route::post('/show-specific-report', 'ReportController@ShowSpecificReport');
Route::post('/filter-report', 'ReportController@ReportFilter');

Route::post('/guest-latest-views', 'HistoryController@GuestLatestViews');
Route::post('/top-4-kosts', 'HistoryController@TopKost4');
Route::post('/top-4-apart', 'HistoryController@TopApart4');

Route::post('/guest-favourite', 'FavouriteController@store');
Route::post('/favourite-kost', 'FavouriteController@KostFavourite');
Route::post('/favourite-apart', 'FavouriteController@ApartFavourite');
Route::post('/favourite-properties', 'FavouriteController@FavouriteProperties');

Route::post('/user-follow-owner', 'FollowController@store');
Route::post('/show-following', 'FollowController@show');
Route::post('/show-total-follower', 'FollowController@TotalFollowers');
Route::post('/unfollow', 'FollowController@destroy');
Route::post('/total-following', 'FollowController@TotalFollowing');


