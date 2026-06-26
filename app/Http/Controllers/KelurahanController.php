<?php

namespace App\Http\Controllers;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DataTables;

class KelurahanController extends Controller
{
    public function kelurahan(string $kecamatan = null)
    {
        $search = request('search');

        $kecamatanList = Kecamatan::orderBy('nm_kecamatan')->get();

        $selectedKecamatan = $kecamatan ? Kecamatan::where('kd_kecamatan', $kecamatan)->first() : $kecamatanList->first();

        $kelurahan = Kelurahan::with('kecamatan')

            ->where('kd_kecamatan', $selectedKecamatan?->kd_kecamatan)

            ->when($search, function ($q) use ($search) {
                $q->where(function ($query) use ($search) {
                    $query
                        ->where('nm_kelurahan', 'like', "%{$search}%")

                        ->orWhereHas('kecamatan', function ($q) use ($search) {
                            $q->where('nm_kecamatan', 'like', "%{$search}%");
                        });
                });
            })

            ->orderBy('nm_kelurahan')

            ->get();

        return Inertia::render(
            'kelurahan/index',

            [
                'kecamatanList' => $kecamatanList,

                'selectedKecamatan' => $selectedKecamatan,

                'kelurahan' => $kelurahan,

                'search' => $search,
            ],
        );
    }

    // ------------------------------ ADMINPAGE ------------------------------------
    // Datatable Kelurahan
    public function list_kelurahan(Request $request)
    {
        if ($request->ajax()) {
            $kelurahan = Kelurahan::where('status_enabled', 1)->get();
            return Datatables::of($kelurahan)
                ->addIndexColumn()
                ->addColumn('kelurahan', function ($row) {
                    $kelurahan = $row['nm_kelurahan'];
                    return $kelurahan;
                })
                ->addColumn('action', function ($row) {
                    $action = '<button type="button" class="btn btn-warning" onclick="edit(' . $row->id . ')" title="Edit" style="margin-right:5px; margin-bottom:5px;"><i class="fa fa-pen"></i></button>';
                    // <button type="button" class="btn btn-danger" onclick="deleteConfirmation('. $row->id . ')" title="Delete" style="margin-right:5px; margin-bottom:5px;"><i class="fa fa-trash"></i></button>';
                    return $action;
                })
                ->rawColumns(['kelurahan', 'action'])
                ->make(true);
        }

        return view('admin.kelurahan.list-kelurahan');
    }

    public function sync_kelurahan()
    {
        $kodeKecamatan = [];
        $responseKecamatan = Http::timeout(60)->get('https://api-splp.layanan.go.id/master_data_kecamatan/2.0/kode_kecamatan/35.71');
        $dataKecamatan = json_decode($responseKecamatan->body());

        if (isset($dataKecamatan->data)) {
            $kodeKecamatan = array_map(function ($kecamatan) {
                return $kecamatan->kode_kecamatan;
            }, $dataKecamatan->data);
        }

        foreach ($kodeKecamatan as $kode) {
            $responseKelurahan = Http::timeout(60)->get("https://api-splp.layanan.go.id/master_data_desakelurahan/2.0/kode_kecamatan/{$kode}");
            $dataKelurahan = json_decode($responseKelurahan->body());

            if (isset($dataKelurahan->data)) {
                foreach ($dataKelurahan->data as $kelurahan) {
                    Kelurahan::updateOrCreate(
                        ['kd_kelurahan' => $kelurahan->kode_desa_kelurahan],
                        [
                            'kd_kecamatan' => $kelurahan->kode_kecamatan,
                            'nm_kelurahan' => $kelurahan->nama_desa_kelurahan,
                        ],
                    );
                }
            }
            toastr()->success('Kelurahan Berhasil Diperbarui.');
        }

        return redirect('/list-kelurahan');
    }

    public function sync_kecamatan()
    {
        // Ambil data dari API
        $responseKecamatan = Http::timeout(60)->get('https://api-splp.layanan.go.id/master_data_kecamatan/2.0/kode_kecamatan/35.71');
        $dataKecamatan = json_decode($responseKecamatan->body());

        // Periksa apakah data tersedia
        if (isset($dataKecamatan->data)) {
            foreach ($dataKecamatan->data as $kecamatan) {
                // Simpan atau perbarui data kecamatan
                Kecamatan::updateOrCreate(
                    ['kd_kecamatan' => $kecamatan->kode_kecamatan],
                    [
                        'nm_kecamatan' => $kecamatan->nama_kecamatan,
                    ],
                );
            }
            toastr()->success('Kecamatan Berhasil Diperbarui.');
        }

        return redirect('/list-kelurahan');
    }

    // Adminpage - Update Kelurahan
    public function update_kelurahan(Request $request)
    {
        DB::beginTransaction();

        try {
            if (isset($request->id)) {
                Kelurahan::where(['id' => $request->id])->update([
                    'link' => $request->link,
                    'jml_penduduk' => $request->jumlah_penduduk,
                    'updated_at' => Carbon::now('Asia/Jakarta'),
                ]);

                toastr()->success('Kelurahan Berhasil Diperbarui.');
            }

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollback();
            toastr()->error('Terdapat kesalahan dalam memproses data. Hubungi Programmer!!');
        }

        return redirect('/list-kelurahan');
    }

    // Adminpage - Value Kelurahan
    public function value_kelurahan($id)
    {
        $kelurahan = Kelurahan::where('id', $id)->first();
        return response()->json($kelurahan);
    }
}
