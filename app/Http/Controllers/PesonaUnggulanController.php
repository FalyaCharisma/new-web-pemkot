<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PesonaUnggulan;
use App\Models\Berita;
use App\Models\KategoriBerita;
use App\Models\PetaInteraktif;
use App\Models\HighlightPesona;
use Inertia\Inertia;
use DataTables;
use Carbon\Carbon;

class PesonaUnggulanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $kategori = $request->kategori;

        $pesona = PesonaUnggulan::with('kategori')
            ->when($kategori, function ($q) use ($kategori) {
                $q->where('id_kategori', $kategori);
            })
            ->latest()
            ->get();

        $peta = PetaInteraktif::with('kategoriFasilitas')->where('menu', 'pesona')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'desc' => $item->desc,
                    'lat' => $item->lat,
                    'lng' => $item->lng,
                    'category' => $item->category,
                    'icon' => $item->kategoriFasilitas?->icon,
                    'jam_buka' => $item->jam_buka,
                    'jam_tutup' => $item->jam_tutup,
                ];
            });

        return Inertia::render('pesonakediri/index', [
            'pesona' => $pesona,
            'kategori' => $kategori,
            'peta' => $peta,
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
    public function show($slug)
    {
        $kategori_berita = KategoriBerita::where('status_enabled', 1)->get();
        $pesona = PesonaUnggulan::with('kategori')->where('slug', $slug)->firstOrFail();

        // dd($pesona);

        // tambah viewer
        $pesona->increment('views');

        $judulPesona = strtolower($pesona->judul);

        $keywords = preg_split('/\s+/', $judulPesona);

        $stopWords = ['dan', 'di', 'ke', 'dari', 'yang', 'untuk', 'dengan', 'kota', 'kabupaten'];

        $related = Berita::with('kategori')
            ->get()
            ->map(function ($berita) use ($pesona, $judulPesona, $keywords, $stopWords) {
                $score = 0;

                $judul = strtolower($berita->judul);
                $deskripsi = strtolower(strip_tags($berita->deskripsi));

                // 1. Judul mengandung frasa lengkap
                if (str_contains($judul, $judulPesona)) {
                    $score += 100;
                }

                // 2. Keyword
                foreach ($keywords as $word) {
                    $word = trim($word);

                    if (strlen($word) < 3 || in_array($word, $stopWords)) {
                        continue;
                    }

                    // Keyword di judul
                    if (str_contains($judul, $word)) {
                        $score += 10;
                    }

                    // Keyword di deskripsi
                    if (str_contains($deskripsi, $word)) {
                        $score += 5;
                    }
                }

                // 3. Bonus kategori
                if (!empty($berita->id_kategori) && $berita->id_kategori == $pesona->kategori_id) {
                    $score += 3;
                }

                $berita->score = $score;

                return $berita;
            })
            ->filter(fn($berita) => $berita->score > 0)
            ->sort(function ($a, $b) {
                // Skor tertinggi
                if ($a->score === $b->score) {
                    // Jika skor sama, tampilkan yang terbaru
                    return strtotime($b->tanggal) <=> strtotime($a->tanggal);
                }

                return $b->score <=> $a->score;
            })
            ->take(4)
            ->values();

        // Jika hasil kurang dari 4,
        // tambahkan berita terbaru yang belum ada
        if ($related->count() < 4) {
            $additional = Berita::with('kategori')
                ->whereNotIn('id', $related->pluck('id')->toArray())
                ->orderByDesc('tanggal')
                ->take(4 - $related->count())
                ->get();

            $related = $related->merge($additional)->unique('id')->values();
        }

        return Inertia::render('pesonakediri/detail', [
            'pesona' => $pesona,
            'related' => $related,
            'kategori_berita' => $kategori_berita,
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


    // ===========================
    // ADMIN PAGE
    // ===========================

    public function list_pesona_unggulan(Request $request)
    {
        $titlepage = "Pesona Unggulan";

        if ($request->ajax()) {

            $pesona = PesonaUnggulan::with('kategori')->where('status_enabled', 1)
                ->latest()
                ->get();

            return Datatables::of($pesona)
                ->addIndexColumn()

                ->addColumn('cover', function ($row) {

                    if (!$row->cover) {
                        return '-';
                    }

                    return '<img src="' . asset('storage/pesona/' . $row->cover) . '" width="90">';
                })

                ->addColumn('judul', function ($row) {
                    return $row->judul;
                })

                ->addColumn('kategori', function ($row) {
                    return $row->kategori->nama_kategori;
                })

                ->addColumn('views', function ($row) {
                    return number_format($row->views);
                })

                ->addColumn('action', function ($row) {

                    return '
                        <button class="btn btn-primary"
                            onclick="location.href=`/form-pesona-unggulan/' . $row->id . '`">
                            <i class="fas fa-edit"></i>
                        </button>

                        <button class="btn btn-danger"
                            onclick="deletePesonaConfirmation(' . $row->id . ')">
                            <i class="fas fa-trash"></i>
                        </button>
                    ';
                })

                ->rawColumns([
                    'cover',
                    'judul',
                    'kategori',
                    'views',
                    'action'
                ])

                ->make(true);
        }

        return view('admin.pesona-unggulan.list-pesona-unggulan', compact('titlepage'));
    }

    public function form_pesona_unggulan($id)
    {
        $kategori = KategoriBerita::where('status_enabled', 1)->get();

        if ($id == 'add') {

            $titlepage = 'Tambah Pesona Unggulan';

            $pesona = '';

        } else {

            $titlepage = 'Edit Pesona Unggulan';

            $pesona = PesonaUnggulan::find($id);
        }

        return view(
            'admin.pesona-unggulan.form-pesona-unggulan',
            compact(
                'titlepage',
                'pesona',
                'kategori'
            )
        );
    }

    public function update_pesona_unggulan(Request $request)
    {
        $request->validate([
            'judul' => 'required',
            'id_kategori' => 'required',
            'cover' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->id) {

            $pesona = PesonaUnggulan::findOrFail($request->id);

            $cover = $pesona->cover;

        } else {

            $pesona = new PesonaUnggulan();

            $cover = null;
        }

        if ($request->hasFile('cover')) {

            if ($cover) {
                Storage::disk('public')->delete('pesona/' . $cover);
            }

            $file = $request->file('cover');

            $cover = 'pesona-' . time() . '.' . $file->extension();

            $file->storeAs(
                'pesona',
                $cover,
                'public'
            );
        }

        $pesona->cover = $cover;
        $pesona->judul = $request->judul;
        $pesona->slug = Str::slug($request->judul);
        $pesona->id_kategori = $request->id_kategori;
        $pesona->deskripsi = $request->deskripsi;
        $pesona->fyi = $request->fyi;
        $pesona->judul_video = $request->judul_video;
        $pesona->deskripsi_video = $request->deskripsi_video;
        $pesona->url_video = $request->url_video;

        if (!$request->id) {
            $pesona->views = 0;
            $pesona->status_enabled = 1;
        }

        $pesona->save();

        toastr()->success('Pesona Unggulan berhasil disimpan.');

        return redirect('/list-pesona-unggulan');
    }

    public function hapus_pesona_unggulan($id)
    {
        $hapus = PesonaUnggulan::where('id', $id)
            ->update([
                'status_enabled' => 0,
                'updated_at' => Carbon::now('Asia/Jakarta'),
            ]);

        if ($hapus) {

            $success = true;
            $message = 'Pesona Unggulan berhasil dihapus';

        } else {

            $success = false;
            $message = 'Data tidak ditemukan';
        }
 
        return response()->json([
            'success' => $success,
            'message' => $message,
        ]);
    }

    public function form_highlight_pesona()
    {
        $titlepage = "Highlight Pesona Unggulan";

        $highlight = HighlightPesona::first();

        return view(
            'admin.pesona-unggulan.form-highlight-pesona',
            compact(
                'titlepage',
                'highlight'
            )
        );
    }
}
