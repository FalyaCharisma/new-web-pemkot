<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Feedback;
use Carbon\Carbon;
use DataTables;

class FeedbackController extends Controller
{
    public function list_feedback(Request $request)
    {
        try {
            if ($request->ajax()) {
                $feedback = Feedback::orderBy('created_at', 'desc')->get();
                return Datatables::of($feedback)->addIndexColumn()->make(true);
            }
        } catch (\Exception $exception) {
            $feedback = [];
            toastr()->error('Data Gagal Dimuat. Hubungi Programmer!!');
        }

        return view('admin.feedback.list-feedback');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:4',
            'infoEase' => 'required|string|max:255',
            'infoAccuracy' => 'required|string|max:255',
            'infoClarity' => 'required|string|max:255',
            'infoCategory' => 'required|string|max:255',
            'infoSuggestion' => 'required|string|max:20',
            'name' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:100',
            'message' => 'nullable|string|max:1000',
        ]);

        Feedback::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Terima kasih atas penilaian Anda.',
        ]);
    }

    public function statistics()
    {
        $total = Feedback::count();

        $sangatPuas = Feedback::where('rating', 4)->count();
        $puas = Feedback::where('rating', 3)->count();
        $cukup = Feedback::where('rating', 2)->count();
        $tidak = Feedback::where('rating', 1)->count();

        return response()->json([
            'total' => $total,
            'survey' => [
                [
                    'label' => 'Sangat Puas',
                    'percent' => $total ? round(($sangatPuas / $total) * 100) : 0,
                ],
                [
                    'label' => 'Puas',
                    'percent' => $total ? round(($puas / $total) * 100) : 0,
                ],
                [
                    'label' => 'Cukup Puas',
                    'percent' => $total ? round(($cukup / $total) * 100) : 0,
                ],
                [
                    'label' => 'Tidak Puas',
                    'percent' => $total ? round(($tidak / $total) * 100) : 0,
                ],
            ],
        ]);
    }
}
