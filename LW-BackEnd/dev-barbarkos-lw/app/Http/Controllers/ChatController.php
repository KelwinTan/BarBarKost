<?php

namespace App\Http\Controllers;

use App\Events\MessageSend;
use App\Message;
use App\User;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use phpDocumentor\Reflection\DocBlock\Serializer;

class ChatController extends Controller
{

//    public function SendMessage($channelID, Request $request){
//        $faker = Factory::create();
//        $time = Carbon::now('Asia/Jakarta');
//
////        Message::create([
////            'id' => $faker->uuid,
////            'message' => $request->message,
////            'status' => 0,
////            'channel_id' => $channelID,
////            'sent_time' => $time,
////        ]);
//
//        broadcast(new MessageSend($request->message, $time, $channelID), 'chat.'.$channelID)->toOthers();
//        return response()->json([
//            'Message' => 'success',
//            'Time' => $time->format('H:i:s')
//        ], 200);
//    }

    public function CreateChannel(Request $request){
        $guest = $request->guest_id;
        $owner = $request->owner_id;
        $faker = Factory::create();

        $redis = Redis::connection();
        $chat_room_id = $faker->uuid;

        $chatRoom = $redis->get('channel:'.$guest.$owner);
        if(is_null($chatRoom)){
            $redis->set('channel:'.$guest.$owner, $chat_room_id);
            $redis->lpush('chatList:'.$owner, $guest);
            $redis->lpush('chatList:'.$guest, $owner);
            return response()->json('Chat Room Created with ID:' . $chat_room_id);
        }
        return response()->json('Chat room has already existed:'.$chatRoom);
    }

    public function SendMessasge(Request $request){
        $owner = $request->owner_id;
        $guest = $request->guest_id;
        $msg = $request->msg;

        $message = json_decode($msg);
//        dd($message->msg);

        $redis = Redis::connection();
        $channelID = $redis->get('channel:'.$guest.$owner);

        $redis->lpush('chat:'.$channelID, $msg);
        broadcast(new MessageSend($request->msg, Carbon::now(), $channelID), 'chat.'.$channelID)->toOthers();
        return response()->json('Message Sent');
    }


    public function GetChatList(Request $request){
        $user = $request->user_id;
        $redis = Redis::connection();
        $chatList = $redis->lrange('chatList:'.$user, 0, -1);

        $arr = [];

        foreach($chatList as $id){
            $user = User::where('id', $id)->first();
            array_push($arr, $user);
        }

        return $arr;
    }

    public function GetChatDetail(Request $request){
        $owner = $request->owner_id;
        $guest = $request->guest_id;

        $redis = Redis::connection();
        $channelID = $redis->get('channel:'.$guest.$owner);
        $chatDetail = $redis->lrange('chat:'.$channelID, 0, -1);
        if(is_null($chatDetail)){
//            $msg = json_decode($chatDetail);
            return response()->json('Detail kosong');
        }
//        $chats = json_decode($chatDetail);
//        dd(json_decode($chatDetail));
//        dd($chatDetail);
        $arr = [];
        foreach($chatDetail as $str){
//            dd($str);
             $data = json_decode($str);
             array_push($arr, $data);
        }
//        dd($arr);
        return $arr;
    }



    public function SendChatRedis(Request $request){
        $to_id = $request->to_id;
        $from_id = $request->from_id;
        $contents = $request->contents;

        $redis = Redis::connection();
        $chat_room_id = $redis->get($to_id.$from_id) ? $redis->get($to_id.$from_id):$redis->get($from_id.$to_id);
        if($chat_room_id == null){
            $chat_room_id = (int)$redis->get('chat_room_id')+1;
            $redis->set('chat_room_id', $chat_room_id);
            $redis->set($to_id.$from_id, $chat_room_id);
        }
//       Masukin ke list $to_id
        $redis->lrem('chat.with'.$to_id, 0, $from_id);
        $redis->lpush('chat.with'.$from_id,$to_id);

//       Masukin ke $from_id
        $redis->lrem('chat.with'.$from_id, 0, $to_id);
        $redis->lpush('chat.with'.$from_id, $to_id);

        $new_id = sizeof($redis->zrangebyscore('chat.room:'.$chat_room_id, '-inf', '+inf'))+1;
//        return $new_id;
//        $redis->hset("taxi_car", "brand", "Toyota");
//        return "Redis Chat Created";
        $redis->hmset('chat.'.$chat_room_id.':'.$new_id, 'chat_id', $new_id, 'to_id', $to_id, 'from_id', $from_id, 'contents', $contents);
        $redis->zadd('chat.room:'.$chat_room_id, $new_id, $new_id);
        return "Redis Chat Created";
    }

    public function getAllChat(Request $request){
//        return $request;
        $to_id = $request->to_id;
        $from_id = $request->from_id;

        $redis = Redis::connection();
        $chat_room_id = $redis->get($to_id.$from_id)?$redis->get($to_id.$from_id):$redis->get($from_id.$to_id);
//        return $chat_room_id;
        if($chat_room_id == null){
            $chat_room_id = (int) $redis->get('chat_room_id') + 1;
            $redis->set('chat_room_id', $chat_room_id);
            $redis->set($to_id.$from_id, $chat_room_id);
        }

        $new_id = sizeof($redis->zrangebyscore('chat.room:'.$chat_room_id, '-inf', '+inf'));
        $arr = $redis->zrangebyscore('chat.room:'.$chat_room_id, 0, $new_id);
//        Kasih Tau lawan, udh read sampe mana
        $redis->set($to_id.':'.$chat_room_id, $new_id);
//        Liat lawan udh read sampe mana
        $read = $redis->get($from_id.':'.$chat_room_id) ? $redis->get($from_id.':'.$chat_room_id):0;
        $arrItem = [];
        for ($i=0; $i<sizeof($arr); $i++){
            if($redis->hgetall('chat.'.$chat_room_id.':'.$arr[$i])!=null){
                array_push($arrItem, $redis->hgetall('chat.'.$chat_room_id.':'.$arr[$i]));
            }
        }

        return response()->json([
            'chat' => $arrItem,
            'read' => $read
        ]);
    }

//    public function getChatList(Request $request){
//        $id = $request->id;
//        $redis = Redis::connection();
//        $arr = $redis->lrange('chat.with'.$id, 0, -1);
//        $arrJson = [];
//        for($i=0; $i<sizeof($arr); $i++){
//            $chat_room_id = $redis->get($id.$arr[$i])?$redis->get($id.$arr[$i]):$redis->get($arr[$i].$id);
//            $new_id = sizeof($redis->zrangebyscore('chat.room:'.$chat_room_id, '-inf', '+inf'));
//            $last_id = $redis->zrangebyscore('chat.room:'.$chat_room_id, $new_id, $new_id)[0];
//            $message = $redis->hgetall('chat.'.$chat_room_id.':'.$last_id);
//            $new = [
//                'id' => $arr[$i],
//                'last_chat' => $message,
////                'user' => User::where('id', $arr[$i])->get()[0]
//            ];
//            array_push($arrJson, $new);
//        }
//        return $arrJson;
//    }



}
