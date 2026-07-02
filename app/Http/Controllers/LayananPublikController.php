<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\LayananPublik;
use Carbon\Carbon;
use DataTables;

class LayananPublikController extends Controller
{
    // Datatable Layanan Publik
    public function list_layanan_publik(Request $request){
        $data['menu'] = 'Layanan Publik';

        try {
            if ($request->ajax()) {
                $layanan_publik = LayananPublik::where('status_enabled', 1)->get();
                return Datatables::of($layanan_publik)
                    ->addIndexColumn()
                    ->addColumn('judul', function($row){
                        $judul = substr($row['judul'], 0, 200) . '...';
                        return $judul;
                    })->addColumn('deskripsi', function($row){
                        $deskripsi = substr(strip_tags($row['deskripsi'], '<p><a><br>'),0, 150) . '...';
                        return $deskripsi;
                    })->addColumn('gambar', function($row){
                        $gambar = '<img src="'. url('storage/layanan-publik/'. $row->gambar .''). '" width="50%">';
                        return $gambar;
                    })->addColumn('link', function($row){
                        $link = $row->link;
                        return $link;
                    })->addColumn('action', function($row){
                        $action = '<button type="button" class="btn btn-warning" onclick="location.href=`/form-layanan-publik/'. $row->id .'`" title="Edit" style="margin-right:5px; margin-bottom:5px;"><i class="fa fa-pen"></i></button>
                                    <button type="button" class="btn btn-danger" onclick="deleteConfirmation('. $row->id . ')" title="Delete" style="margin-right:5px; margin-bottom:5px;"><i class="fa fa-trash"></i></button>';
                        return $action;
                    })->rawColumns(['deskripsi', 'judul', 'gambar', 'action'])
                    ->make(true);
            }

            toastr()->success('Data Berhasil Dimuat');
        }catch (\Exceprion $exception){
            $layanan_publik = [];
            toastr()->error('Data Gagal Dimuat. Hubungi Programmer!!');
        }

        return view ('admin.layanan-publik.list-layanan-publik', compact('data'));
    }

    // Show form editor for Layanan Publik
    public function form_layanan_publik($id){
        if ($id == 'add'){
            $titlepage = 'Tambah Layanan Publik';
            $layanan_publik = [];
        }else{
            $titlepage = 'Edit Layanan Publik';
            $layanan_publik = LayananPublik::where('id', $id)->first();
        }

        return view ('admin.layanan-publik.form-layanan-publik', compact('titlepage', 'layanan_publik'));
    }

    // Update Layanan Publik
    public function update_layanan_publik(Request $request){
        $request->validate([
            'gambar' => 'image|mimes:jpeg,png,jpg,webp,svg|max:2024'
        ],
        [
            'gambar.image'=>trans('File yang di upload harus gambar !'),
            'gambar.mimes'=>trans('Tipe file harus .jpeg .png .jpg .webp .svg !'),
            'gambar.max'=>trans('Ukuran file maksimal 2mb !')
        ]);

        if (isset($request->gambar)){
            $file = $request->gambar;
            $fileName = 'layanan'.'-'.time().'.'.$file->extension();
            $file->move(storage_path('app/public/layanan-publik'), $fileName); 
        }else{
            $fileName = $request->gambarlama;
        }

        DB::beginTransaction();

        try{
            if (isset($request->id)){
                LayananPublik::where(['id'=>$request->id])->update([
                    'judul' => $request->judul,
                    'deskripsi' => $request->deskripsi,
                    'gambar' => $fileName,
                    'link' => $request->link,
                    'updated_at' => Carbon::now ('Asia/Jakarta')
                ]);
                
                toastr()->success('Layanan Publik Berhasil Diubah.');
            }else{
                LayananPublik::insert([
                    'judul' => $request->judul,
                    'deskripsi' => $request->deskripsi,
                    'gambar' => $fileName,
                    'link' => $request->link,
                    'created_at' => Carbon::now ('Asia/Jakarta')
                ]);
    
                toastr()->success('Layanan Publik Berhasil Ditambahkan.');
            }

            DB::commit();

        }catch(\Exception $exception){
            DB::rollback();
            toastr()->error('Terdapat kesalahan dalam memproses data. Hubungi Programmer!!');
        }

        return redirect('/list-layanan-publik');
    }
    
    // Hapus Layanan Publik
    public function hapus_layanan_publik($id){
    
        $aktif = LayananPublik::where(['id'=>$id])->update([
            'status_enabled' => 0,
            'updated_at' => Carbon::now ('Asia/Jakarta')
        ]);

        //Check data deleted or not
        if ($aktif == 1){
            $success = true;
            $message = "Data Berhasil Dihapus";
        }else {
            $success = false;
            $message = "Data Tidak Ditemukan!";
        }

        // //Return response
        return response()->json([
            'success' => $success,
            'message' => $message,
        ]);

    }
}
