<?php

namespace App\Http\Controllers;

use App\ImageFiles;
use Illuminate\Http\Request;
use Webpatser\Uuid\Uuid;

class ImageController extends Controller
{
    public function Index(){
        return view('Image-View');
    }

    public function Store(Request $request){
        $this->validate($request, [
            'image.*' => 'image|nullable|max:1999'
        ]);
        $user = $request->get('user_id');
        $type = $request->get('type');
        if($request->hasFile('image')){

            $files = $request->file('image');

            foreach($files as $currFile) {
                //Get FileName with the extension
                $fileNameWithExt = $currFile->getClientOriginalName();
                //Get just filename
                $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
                //Get Just ext
                $extension = $currFile->getClientOriginalExtension();
                //File Name to store
                $fileNameToStore = $fileName.'_'.time().'.'.$extension;
                //Upload Image
                $path = $currFile->storeAs('images', $fileNameToStore);
                $newImage = ImageFiles::create([
                    'image_id' => Uuid::generate()->string,
                    'user_id' => $user,
                    'image' => $fileNameToStore,
                    'type' => $type
                ]);
            }
        }else{
            $fileNameToStore = 'noimage.jpg';
            $newImage = ImageFiles::create([
                'image_id' => Uuid::generate()->string,
                'user_id' => $user,
                'image' => $fileNameToStore,
                'type' => $type
            ]);
        }
        return response()->json("Upload Image Success");
    }

    public function getImages(Request $request){
        return ImageFiles::where('imageable_id', $request->kost_id)->get();
    }


}
