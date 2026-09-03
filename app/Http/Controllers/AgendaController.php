<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Agenda;
use App\Models\KategoriBerita;
use Carbon\Carbon;
use Exception;
use DataTables;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $now = Carbon::now();
        $search = $request->search;

        /*
        |--------------------------------------------------------------------------
        | BASE QUERY
        |--------------------------------------------------------------------------
        */

        $baseQuery = Agenda::query()
            ->where('status_enabled', 1)
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where(
                        'judul_acara',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'lokasi_acara',
                        'like',
                        "%{$search}%"
                    );
                });
            });

        /*
        |--------------------------------------------------------------------------
        | SEMUA AGENDA
        |--------------------------------------------------------------------------
        |
        | Tidak diberi filter tanggal karena data digunakan untuk:
        | - kalender
        | - agenda sebelumnya
        | - agenda sedang berlangsung
        | - agenda mendatang
        |
        */

        $timelineAgenda = (clone $baseQuery)
            ->orderBy('tanggal_mulai')
            ->get()
            ->map(function ($item) use ($now) {

                $mulai = Carbon::parse(
                    $item->tanggal_mulai
                );

                $selesai = $item->tanggal_selesai
                    ? Carbon::parse(
                        $item->tanggal_selesai
                    )
                    : $mulai->copy();

                /*
                |--------------------------------------------------------------------------
                | STATUS SEDANG BERLANGSUNG
                |--------------------------------------------------------------------------
                */

                $item->is_ongoing =
                    $now->greaterThanOrEqualTo(
                        $mulai->copy()->startOfDay()
                    )
                    &&
                    $now->lessThanOrEqualTo(
                        $selesai->copy()->endOfDay()
                    );

                /*
                |--------------------------------------------------------------------------
                | STATUS SELESAI
                |--------------------------------------------------------------------------
                */

                $item->is_finished =
                    $now->greaterThan(
                        $selesai->copy()->endOfDay()
                    );

                /*
                |--------------------------------------------------------------------------
                | STATUS MENDATANG
                |--------------------------------------------------------------------------
                */

                $item->is_upcoming =
                    $now->lessThan(
                        $mulai->copy()->startOfDay()
                    );

                /*
                |--------------------------------------------------------------------------
                | LABEL STATUS
                |--------------------------------------------------------------------------
                */

                if ($item->is_ongoing) {
                    $item->status_label = 'Sedang Berlangsung';
                } elseif ($item->is_upcoming) {
                    $item->status_label = 'Mendatang';
                } else {
                    $item->status_label = 'Sudah Selesai';
                }

                return $item;
            })
            ->values();

        /*
        |--------------------------------------------------------------------------
        | AGENDA SEDANG BERLANGSUNG
        |--------------------------------------------------------------------------
        */

        $ongoingAgenda = $timelineAgenda
            ->filter(
                fn ($item) =>
                    $item->is_ongoing
            )
            ->sortBy('tanggal_mulai')
            ->first();

        /*
        |--------------------------------------------------------------------------
        | AGENDA TERDEKAT
        |--------------------------------------------------------------------------
        */

        $nextAgenda = $timelineAgenda
            ->filter(
                fn ($item) =>
                    $item->is_upcoming
            )
            ->sortBy('tanggal_mulai')
            ->first();

        /*
        |--------------------------------------------------------------------------
        | AGENDA TERAKHIR YANG SUDAH SELESAI
        |--------------------------------------------------------------------------
        */

        $latestFinishedAgenda = $timelineAgenda
            ->filter(
                fn ($item) =>
                    $item->is_finished
            )
            ->sortByDesc(function ($item) {

                return $item->tanggal_selesai
                    ?? $item->tanggal_mulai;
            })
            ->first();

        /*
        |--------------------------------------------------------------------------
        | HIGHLIGHT
        |--------------------------------------------------------------------------
        |
        | Prioritas:
        | 1. Sedang berlangsung
        | 2. Agenda terdekat
        | 3. Agenda terakhir selesai
        |
        */

        if ($ongoingAgenda) {

            $highlightAgenda = $ongoingAgenda;
            $highlightStatus = 'Sedang Berlangsung';

        } elseif ($nextAgenda) {

            $highlightAgenda = $nextAgenda;
            $highlightStatus = 'Agenda Terdekat';

        } elseif ($latestFinishedAgenda) {

            $highlightAgenda = $latestFinishedAgenda;
            $highlightStatus = 'Baru Selesai';

        } else {

            $highlightAgenda = null;
            $highlightStatus = null;
        }

        /*
        |--------------------------------------------------------------------------
        | AGENDA LAINNYA
        |--------------------------------------------------------------------------
        |
        | Menampilkan:
        | - Sedang berlangsung
        | - Mendatang
        | - Sudah selesai
        |
        | Urutan:
        | 1. Sedang berlangsung
        | 2. Mendatang
        | 3. Sudah selesai terbaru
        |
        */

        $ongoingList = $timelineAgenda
            ->filter(
                fn ($item) =>
                    $item->is_ongoing
            )
            ->sortBy('tanggal_mulai')
            ->values();

        $upcomingList = $timelineAgenda
            ->filter(
                fn ($item) =>
                    $item->is_upcoming
            )
            ->sortBy('tanggal_mulai')
            ->values();

        $finishedList = $timelineAgenda
            ->filter(
                fn ($item) =>
                    $item->is_finished
            )
            ->sortByDesc(function ($item) {

                return $item->tanggal_selesai
                    ?? $item->tanggal_mulai;
            })
            ->values();

        /*
        |--------------------------------------------------------------------------
        | GABUNGKAN SEMUA AGENDA
        |--------------------------------------------------------------------------
        */

        $otherAgenda = $ongoingList
            ->concat($upcomingList)
            ->concat($finishedList)
            ->values();

        /*
        |--------------------------------------------------------------------------
        | RESPONSE
        |--------------------------------------------------------------------------
        */

        return Inertia::render('agenda/index', [

            /*
            | SEMUA AGENDA
            */
            'timelineAgenda' => $timelineAgenda,

            /*
            | HIGHLIGHT
            */
            'highlightAgenda' => $highlightAgenda,

            'highlightStatus' => $highlightStatus,

            /*
            | AGENDA LAINNYA
            */
            'otherAgenda' => $otherAgenda,

            /*
            | SEARCH
            */
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
        $today = Carbon::today();

        $agenda = Agenda::query()->where('status_enabled', 1)->findOrFail($id);

        $agenda->is_ongoing = $today->betweenIncluded(Carbon::parse($agenda->tanggal_mulai)->startOfDay(), Carbon::parse($agenda->tanggal_selesai)->startOfDay());

        $agendaLainnya = Agenda::query()
            ->where('status_enabled', 1)
            ->where('id', '!=', $agenda->id)
            ->orderByDesc('tanggal_mulai')
            ->take(5)
            ->get()
            ->map(function ($item) use ($today) {
                $item->is_ongoing = $today->betweenIncluded(Carbon::parse($item->tanggal_mulai)->startOfDay(), Carbon::parse($item->tanggal_selesai)->startOfDay());

                return $item;
            });

        return Inertia::render('agenda/detail', [
            'agenda' => $agenda,
            'agendaLainnya' => $agendaLainnya,
        ]);
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

    // ADMINPAGE
    public function list_agenda(Request $request)
    {
        if ($request->ajax()) {
            $agenda = Agenda::where('status_enabled', 1)->latest()->get();

            return Datatables::of($agenda)
                ->addIndexColumn()

                ->addColumn('judul', function ($row) {
                    return $row->judul_acara;
                })

                ->addColumn('tanggal', function ($row) {
                    return Carbon::parse($row->tanggal_mulai)->format('d-m-Y') . ' s/d ' . Carbon::parse($row->tanggal_selesai)->format('d-m-Y');
                })

                ->addColumn('lokasi', function ($row) {
                    return $row->lokasi_acara;
                })

                ->addColumn('action', function ($row) {
                    return '
                    <button class="btn btn-primary"
                        onclick="location.href=`/form-agenda/' .
                        $row->id .
                        '`">

                        <i class="fas fa-edit"></i>

                    </button>


                    <button class="btn btn-danger"
                        onclick="deleteagendaConfirmation(' .
                        $row->id .
                        ')">

                        <i class="fas fa-trash"></i>

                    </button>
                ';
                })

                ->rawColumns(['judul', 'tanggal', 'lokasi', 'action'])

                ->make(true);
        }

        return view('admin.agenda.list-agenda');
    }

    public function form_agenda($id)
    {
        if ($id == 'add') {
            $titlepage = 'Tambah Agenda';

            $agenda = null;
        } else {
            $titlepage = 'Edit Agenda';

            $agenda = Agenda::find($id);
        }

        $kategori = KategoriBerita::where('status_enabled', 1)->get();

        return view(
            'admin.agenda.form-agenda',

            compact(
                'titlepage',
                'agenda',
                'kategori'
            ),
        );
    }

    public function update_agenda(Request $request)
    {
        $request->validate([
            'judul_acara' => 'required',
            'tanggal_mulai' => 'required',
            'tanggal_selesai' => 'required',
            'lokasi_acara' => 'required',
            'banner' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->id) {
            $agenda = Agenda::findOrFail($request->id);
            $banner = $agenda->banner;
        } else {
            $agenda = new Agenda();
            $banner = null;
        }

        if ($request->hasFile('banner')) {
            if ($banner) {
                Storage::disk('public')->delete('agenda/' . $banner);
            }

            $file = $request->file('banner');
            $banner = 'agenda-' . time() . '.' . $file->extension();
            $file->storeAs('agenda',$banner,'public',);
        }

        $agenda->tanggal_mulai = $request->tanggal_mulai;
        $agenda->tanggal_selesai = $request->tanggal_selesai;
        $agenda->judul_acara = $request->judul_acara;
        $agenda->id_kategori = $request->id_kategori;
        $agenda->lokasi_acara = $request->lokasi_acara;
        $agenda->maps_lokasi = $request->maps_lokasi;
        $agenda->banner = $banner;
        $agenda->deskripsi = $request->deskripsi;
        $agenda->status_enabled = 1;
        $agenda->save();
        toastr()->success('Agenda berhasil disimpan.');

        return redirect('/list-agenda');
    }

    public function hapus_agenda($id)
    {
        $aktif = Agenda::where(
            'id',

            $id,
        )->update([
            'status_enabled' => 0,

            'updated_at' => Carbon::now('Asia/Jakarta'),
        ]);

        if ($aktif) {
            $success = true;

            $message = 'Agenda berhasil dihapus';
        } else {
            $success = false;

            $message = 'Agenda tidak ditemukan';
        }

        return response()->json([
            'success' => $success,

            'message' => $message,
        ]);
    }
}
