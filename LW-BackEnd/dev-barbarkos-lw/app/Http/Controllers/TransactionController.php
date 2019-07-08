<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionRequest;
use App\Mail\TransactionMail;
use App\Mail\verifyEmail;
use App\Premium;
use App\Transaction;
use App\User;
use Barryvdh\DomPDF\PDF;
use Carbon\Carbon;
use Dompdf\Dompdf;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;
use phpDocumentor\Reflection\File;
use Webpatser\Uuid\Uuid;

class TransactionController extends Controller
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
//        dd($request);
        $currTransaction = Transaction::where('owner_id', $request->owner_id)->where('premium_status', 1)->first();
        if ($currTransaction){
            throw new HttpResponseException(response()->json('Owner has ongoing premium product', 422));
        }

        $currTransaction = Transaction::where('owner_id', $request->owner_id)->where('premium_status', null)->where('deleted_at', null)->first();
        if ($currTransaction){
            throw new HttpResponseException(response()->json('Owner has ongoing transaction', 422));
        }

        Transaction::create([
            'id' => Uuid::generate()->string,
            'premium_id' => $request->premium_id,
            'owner_id' => $request->owner_id
        ]);
        $user = User::where('id', $request->owner_id)->first();
        $premium = Premium::where('id', $request->premium_id)->first();

        Mail::to($user->email)->send(new TransactionMail($user, $premium));


        return response('Transaction Created');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        //
    }

    public function ExportPDF($type = 'stream'){

//        $dompdf->stream("dompdf_out.pdf", array("Attachment" => false));
        $transactions = Transaction::all();

        $pdf = \PDF::loadview('pdf',['transactions'=>$transactions]);
        return $pdf->stream('transaction.pdf');
    }

    public function VerifyTransaction(Request $request){
        $transaction = Transaction::where('id', $request->id)->first();
        $transaction->start_date = Carbon::now();
        $transaction->premium_status = 1;
        $premium = Premium::where('id', $transaction->premium_id)->first();
        $transaction->end_date = Carbon::parse($transaction->start_date)->addDays($premium->duration);
        $transaction->save();
        $user = User::where('id', $transaction->owner_id)->first();
//        dd(User::where('email', $request->owner_email));
//        dd($user);

        if(is_null($premium['promo'])){
            $promo = 0;
        }
        else{
            $promo = $premium['promo']/100;
        }
        $data = array('premium'=> $premium, 'user'=> $user, 'promo'=> $promo);
        Mail::send('transaction', ["data1"=>$data], function($message) use($data){

            $pdf = \PDF::loadView('pdf', $data);
            $message->to($data['user']->email, $data['user']->name)->subject('Premium Product Transaction');
            $message->from('lw.kelwin@gmail.com', 'BarBar Kost Admin');
            $message->attachData($pdf->output(), 'PaymentInvoice.pdf', ['mime'=>'application/pdf']);
        });
        return response('Email has been sent');
    }

    public function ViewIncomplete(){
//        $transactions = Transaction::where('start_date', null)->get();
//        dd($transactions);
//        $users = User::where('id', $transactions['owner_id']);
//        $items = [];
//        $items->push($transactions);
//        $items->push($users);
        return Transaction::where('start_date', null)->paginate(10);
    }

    public function ViewComplete(){
        return Transaction::whereNotNull('start_date')->paginate(10);
    }

    public function OwnerGetComplete(Request $request){
       return Transaction::where('owner_id', $request->owner_id)->where('premium_status', 0)->paginate(10);
    }

    public function OwnerGetOngoing(Request $request){
        $transaction = Transaction::where('owner_id', $request->owner_id)->where('premium_status', null)->where('deleted_at', null)->first();
        if (is_null($transaction)){
            $transaction = Transaction::where('owner_id', $request->owner_id)->where('premium_status', 1)->where('deleted_at', null)->first();
        }
//        dd($transaction);
        $premium = Premium::where('id', $transaction->premium_id)->first();
        if(is_null($premium['promo'])){
            $promo = 0;
        }
        else{
            $promo = $premium['promo']/100;
        }
        $data = array('premium'=> $premium,'transaction'=> $transaction);
        return $data;
    }

    public function OwnerCancelTransaction(Request $request){
        Transaction::where('owner_id', $request->owner_id)->where('id', $request->transaction_id)->delete();
        return response()->json('Your Premium Order has been Cancelled');
    }

}
