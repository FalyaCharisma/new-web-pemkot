<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Agenda;
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
        $today = Carbon::today();
        $search = $request->search;

        $baseQuery = Agenda::query()
            ->where('status_enabled', 1)
            ->when($search, function ($query) use ($search) {
                $query->where('judul_acara', 'like', "%{$search}%")->orWhere('lokasi_acara', 'like', "%{$search}%");
            });

        $timelineAgenda = (clone $baseQuery)
            ->orderBy('tanggal_mulai', 'desc')
            ->get()
            ->map(function ($item) use ($today) {
                $item->is_ongoing = $today->betweenIncluded(Carbon::parse($item->tanggal_mulai)->startOfDay(), Carbon::parse($item->tanggal_selesai)->startOfDay());

                return $item;
            });

        $upcomingAgenda = (clone $baseQuery)

            ->where(function ($q) use ($today) {
                $q->whereDate('tanggal_mulai', '>=', $today)
                ->orWhere(function ($qq) use ($today) {
                    $qq->whereDate('tanggal_mulai', '<=', $today)->whereDate('tanggal_selesai', '>=', $today);
                });
            })

            ->orderBy('tanggal_mulai')

            ->take(4)

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

            $agenda = '';
        } else {
            $titlepage = 'Edit Agenda';

            $agenda = Agenda::find($id);
        }

        return view(
            'admin.agenda.form-agenda',

            compact(
                'titlepage',

                'agenda',
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

            $file->storeAs(
                'agenda',

                $banner,

                'public',
            );
        }

        $agenda->tanggal_mulai = $request->tanggal_mulai;

        $agenda->tanggal_selesai = $request->tanggal_selesai;

        $agenda->judul_acara = $request->judul_acara;

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
