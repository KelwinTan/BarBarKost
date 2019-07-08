<?php

namespace App\Http\Controllers;

use App\Report;
use Illuminate\Http\Request;
use Webpatser\Uuid\Uuid;

class ReportController extends Controller
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

        Report::create([
            'id' => Uuid::generate()->string,
            'user_id' => $request->user_id,
            'property_id' => $request->property_id,
            'property_type' => $request->property_type,
            'description' => $request->description,
            'report_type' => $request->report_type
        ]);
        return response('Report has been created');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return Report::paginate(10);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function edit(Report $report)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Report $report)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function destroy(Report $report)
    {
        //
    }

    public function ShowSpecificReport(Request $request){
        return Report::where('id', $request->id)->get();
    }

    public function ReportFilter(Request $request){
        if(!$request->date && $request->type){
            $reports = Report::where('type', 'like', '%'.$request->type.'%')->paginate(10);
        }else if(!$request->type && $request->date){
            $reports = Report::where('created_at', '>=', $request->date)->paginate(10);
        }else{
            $reports = Report::where('type', 'like', '%'.$request->type.'%')->where('created_at', '>=', $request->date)->paginate(10);
        }
        return $reports;
    }

}
