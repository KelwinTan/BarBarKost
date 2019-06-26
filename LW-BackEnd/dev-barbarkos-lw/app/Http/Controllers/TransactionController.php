<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionRequest;
use App\Mail\verifyEmail;
use App\Transaction;
use Barryvdh\DomPDF\PDF;
use Dompdf\Dompdf;
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
    public function store(TransactionRequest $request)
    {
//        dd($request);
        Transaction::create([
            'id' => Uuid::generate()->string,
            'premium_id' => $request->premium_id,
            'owner_id' => $request->owner_id
        ]);

//        Mail::to($user->email)->send(new verifyEmail($user));


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

}
