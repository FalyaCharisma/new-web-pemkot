<?php

namespace App\Http\Controllers;

use App\Models\PetaInteraktif;
use App\Models\KategoriFasilitas;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DataTables;

class PetaController extends Controller
{
    public function list_peta_interaktif(Request $request)
    {
        $titlepage = "Peta Interaktif";

        if ($request->ajax()) {

            $data = PetaInteraktif::orderBy('created_at', 'desc')->get();

            return DataTables::of($data)
                ->addIndexColumn()

                ->addColumn('menu', function ($row) {
                    return $row->menu;
                })

                ->addColumn('action', function ($row) {

                    return '
                        <button type="button"
                            class="btn btn-primary"
                            onclick="location.href=`/form-peta-interaktif/'.$row->id.'`">
                            <i class="fas fa-edit"></i>
                        </button>

                        <button type="button"
                            class="btn btn-danger"
                            onclick="deleteConfirmation('.$row->id.')">
                            <i class="fas fa-trash"></i>
                        </button>
                    ';
                })

                ->rawColumns(['action'])
                ->make(true);
        }

        return view(
            'admin.peta-interaktif.list-peta',
            compact('titlepage')
        );
    }

    public function form_peta_interaktif($id)
    {
        $kategori = KategoriFasilitas::all();

        if ($id == 'add') {

            $titlepage = "Tambah Lokasi";
            $peta = [];

        } else {

            $titlepage = "Edit Lokasi";
            $peta = PetaInteraktif::findOrFail($id);

        }

        return view(
            'admin.peta-interaktif.form-peta-interaktif',
            compact('titlepage', 'peta', 'kategori')
        );
    }

    public function update_peta_interaktif(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'menu' => 'required|string',
            'category' => 'nullable|string',
            'desc' => 'nullable|string',
        ]);

        if (isset($request->id)) {

            PetaInteraktif::where('id', $request->id)->update([
                'name' => $request->name,
                'desc' => $request->desc,
                'category' => $request->category,
                'lat' => $request->lat,
                'lng' => $request->lng,
                'menu' => $request->menu,
                'updated_at' => Carbon::now('Asia/Jakarta'),
            ]);

            toastr()->success('Lokasi berhasil diubah.');

        } else {

            PetaInteraktif::create([
                'name' => $request->name,
                'desc' => $request->desc,
                'category' => $request->category,
                'lat' => $request->lat,
                'lng' => $request->lng,
                'menu' => $request->menu,
                'created_at' => Carbon::now('Asia/Jakarta'),
            ]);

            toastr()->success('Lokasi berhasil ditambahkan.');
        }
        
        return redirect()->route('list_peta_interaktif');
    }

    public function hapus_peta_interaktif($id)
    {
        $hapus = PetaInteraktif::destroy($id);

        return response()->json([
            'success' => $hapus ? true : false,
            'message' => $hapus
                ? 'Data berhasil dihapus.'
                : 'Data tidak ditemukan.',
        ]);
    }
}