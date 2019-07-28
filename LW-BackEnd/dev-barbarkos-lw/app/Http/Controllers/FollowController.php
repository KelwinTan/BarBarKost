<?php

namespace App\Http\Controllers;

use App\Follow;
use App\Follower;
use Illuminate\Http\Request;
use Webpatser\Uuid\Uuid;

class FollowController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $follow = Follow::where('owner_id', $request->owner_id)->where('user_id', $request->user_id)->first();
        $followers = Follower::where('owner_id', $request->owner_id)->first();
        if (is_null($followers)){
            $followers = Follower::create([
                'id' => Uuid::generate()->string,
                'owner_id' => $request->owner_id,
                'follower_count' => 0
            ]);
        }
        $followers->follower_count = $followers->follower_count + 1;
        $followers->save();

        if(is_null($follow)){
            Follow::create([
                'id' => Uuid::generate()->string,
                'user_id' => $request->user_id,
                'owner_id' => $request->owner_id
            ]);
            return response()->json('Owner is followed');
        }
        return $follow;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Follow  $follow
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        return Follow::with('user')->with('followers')->where('user_id', $request->user_id)->orderBy('created_at', 'DESC')->paginate(1);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Follow  $follow
     * @return \Illuminate\Http\Response
     */
    public function edit(Follow $follow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Follow  $follow
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Follow $follow)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Follow  $follow
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Follow::where('user_id', $request->user_id)->where('owner_id', $request->owner_id)->delete();
        $followers = Follower::where('owner_id', $request->owner_id)->first();
        $followers->follower_count = $followers->follower_count-1;
        $followers->save();
        return response()->json('Owner has been successfully unfollowed');
    }

    public function TotalFollowers(Request $request){
        return count(Follow::where('owner_id', $request->owner_id)->get());
    }

    public function TotalFollowing(Request $request){
        return count(Follow::where('user_id', $request->user_id)->get());
    }

    public function SearchFollowedOwners(Request $request)
    {
        $following = Follow::with('user')->with('followers')->where('user_id', $request->user_id)->orderBy('created_at', 'DESC')->paginate(10);
//        dd($following);
        $filterFollowing = $following->where('user{"name"]', 'LIKE', '%'.$request->name.'%');
        dd($following->where('user{"name"]', 'LIKE', '%'.$request->name.'%'));

        return Follow::with('SearchOwner', $request->name)->with('followers')->where('user_id', $request->user_id)->orderBy('created_at', 'DESC')->paginate(10);
    }

}
