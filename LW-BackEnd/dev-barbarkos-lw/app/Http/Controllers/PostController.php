<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Post;
use App\Review;
use App\Tag;
use Illuminate\Http\Request;
use Webpatser\Uuid\Uuid;

class PostController extends Controller
{
    public function InsertPost(PostRequest $request){
//        dd($request);
        if($request->hasFile('thumbnail_picture')) {
            //Get FileName with the extension
            $fileNameWithExt = $request->file('thumbnail_picture')->getClientOriginalName();
            //Get just filename
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //Get Just ext
            $extension = $request->file('thumbnail_picture')->getClientOriginalExtension();
            //File Name to store
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            //Upload Image
            $thumbnail = $request->file('thumbnail_picture')->storeAs('public/thumbnail', $fileNameToStore);
            $thumbnail_path = 'thumbnail/'.$fileNameToStore;
        }else{
            $thumbnail_path = null;
        }

//        Tag::create([
//            'id' => Uuid::generate()->string,
//            'tag_name' => 'Home'
//        ]);

        Post::create([
            'id' => Uuid::generate()->string,
            'title' => $request->title,
            'content' => $request->post_content,
            'thumbnail_path' => $thumbnail_path,
            'tags' => $request->tags,
            'visibility' => $request->visibility
        ]);
        return response("Post Created");
    }

    public function DeletePost(Request $request){
        Post::where('slug', $request->slug)->delete();
        return response()->json('Post Deleted (Soft)');
//        dd($request);
    }

    public function getAllPost(){
        $posts = Post::with('Review')->paginate(8);
//        dd($posts);
        return compact('posts');
    }

    public function getSpecificPost(Request $request){
        return Post::where('slug', $request->slug)->get();
    }

    public function InsertPostReview(Request $request){
        $review = new Review();
        $review->user_id = $request->user_id;
        $review->content = $request->review_content;
        $review->reviewable_id = $request->post_id;
        $review->reviewable_type = Post::class;
        $review->save();
        return response('Post Review Inserted');
    }


    public function UpdatePost(PostRequest $request){
        $updatePost = Post::where('slug', $request->slug)->get();
//        dd($updatePost);
        if($request->hasFile('thumbnail_picture')) {
            //Get FileName with the extension
            $fileNameWithExt = $request->file('thumbnail_picture')->getClientOriginalName();
            //Get just filename
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            //Get Just ext
            $extension = $request->file('thumbnail_picture')->getClientOriginalExtension();
            //File Name to store
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            //Upload Image
            $thumbnail = $request->file('thumbnail_picture')->storeAs('public/thumbnail', $fileNameToStore);
            $thumbnail_path = 'thumbnail/'.$fileNameToStore;
        }else{
            $thumbnail_path = $updatePost[0]['thumbnail_path'];
        }

        $postUpdated = Post::where('slug', $request->slug)->update([
            'title' => $request->title,
            'content' => $request->post_content,
            'thumbnail_path' => $thumbnail_path,
            'tags' => $request->tags,
            'visibility' => $request->visibility
        ]);
        return response(compact('postUpdated'));
    }

    public function GetRecommend(){
        return Post::inRandomOrder()->take(4)->get();
    }

    public function PostFilter(Request $request){
        if (!$request->type && !$request->date){
            $posts = Post::where('title', 'like', '%'.$request->title.'%')->paginate(8);
        }
        else if(!$request->date){
            $posts = Post::where('title', 'like', '%'.$request->title.'%')->where('visibility', $request->type)->paginate(8);
        }else{
            $posts = Post::where('title', 'like', '%'.$request->title.'%')->where('visibility', $request->type)->where('created_at', '>=', $request->date)->paginate(8);
        }

        return $posts;
    }


}
