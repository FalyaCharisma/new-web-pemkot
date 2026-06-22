<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Agenda;
use Carbon\Carbon;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $today = Carbon::today();
        $search = $request->search;

        $baseQuery = Agenda::query()
            ->where('status_enabled', 1)
            ->when($search, function ($query) use ($search) {
                $query->where('judul_acara', 'like', "%{$search}%")
                    ->orWhere('lokasi_acara', 'like', "%{$search}%");
            });

        $timelineAgenda = (clone $baseQuery)
            ->orderBy('tanggal_mulai')
            ->get()
            ->map(function ($item) use ($today) {

                $item->is_ongoing =
                    $today->betweenIncluded(
                        Carbon::parse($item->tanggal_mulai)->startOfDay(),
                        Carbon::parse($item->tanggal_selesai)->startOfDay()
                    );

                return $item;
            });

        $upcomingAgenda = (clone $baseQuery)
            ->whereDate('tanggal_mulai', '>=', now())
            ->orderBy('tanggal_mulai')
            ->take(3)
            ->get();

        return Inertia::render('agenda/index', [
            'timelineAgenda' => $timelineAgenda,
            'upcomingAgenda' => $upcomingAgenda,
            'search' => $search,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
