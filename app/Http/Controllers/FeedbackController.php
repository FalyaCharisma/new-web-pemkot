<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Feedback;
use Carbon\Carbon;
use DataTables;

class FeedbackController extends Controller
{
    public function list_feedback(Request $request){
        try{
            if($request->ajax()){
                $feedback = Feedback::orderBy('created_at', 'desc')->get();
                return Datatables::of($feedback)
                ->addIndexColumn()
                ->make(true);
            }
        }catch (\Exception $exception){
            $feedback = [];
            toastr()->error('Data Gagal Dimuat. Hubungi Programmer!!');
        }

        return view('admin.feedback.list-feedback');
    }
}
