<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Review;
use Illuminate\Http\Request;
use Webpatser\Uuid\Uuid;

class ReviewController extends Controller
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


    public function store(ReviewRequest $request)
    {
        $newReview = new Review();
        if($request->has('parent_id')){
            $newReview->parent_id = $request->parent_id;
        }
        $newReview->content = $request->review_content;
        $newReview->user_id = $request->user_id;
        $newReview->reviewable_type = Review::class;
        $newReview->property_id = $request->property_id;
        $newReview->save();

        return response("Review Created Succesfully!");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Review  $reviewko
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $reviews = Review::with('user')->where('property_id', $request->property)->take(3)->get();
        return $reviews;
    }

    public function show10(Request $request){
        $reviews = Review::with('user')->where('property_id', $request->property)->paginate(10);
        return $reviews;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        //
    }
}
