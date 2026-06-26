<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Berita;
use App\Models\BeritaLuar;
use App\Models\Pengumuman;
use App\Models\AlbumBerita;
use App\Models\KategoriBerita;
use App\Models\Banner;
use App\Models\ProgramUnggulan;
use App\Models\LayananDigital;
use App\Models\AsetKediri;
use App\Models\KalenderAcara;
use App\Models\Feedback;
use App\Models\Dokumen;
use App\Models\BannerPromo;
use App\Models\Artikel;
use Illuminate\Support\Str;
use DataTables;

class HomeController extends Controller
{
    // -------------------------------------------- ADMIN -------------------------------------
    public function banner_beranda(Request $request){
        $titlepage = 'List Banner';

        try {
            if ($request->ajax()) {
                $banner = Banner::whereIn('status_enabled', [1, 2])->orderBy('status_enabled', 'asc')->get();

                return Datatables::of($banner)
                    ->addIndexColumn()
                    ->addColumn('gambar', function($row){
                        $gambar = '<img src="'. url('storage/banner/' . $row->gambar) .'" width="200">';
                        return $gambar;
                    })->addColumn('kategori', function($row){
                        $kategori = $row->kategori;
                        return $kategori;
                    })->addColumn('status', function($row){
                        if ($row->status_enabled == 1) {
                            $status = '<button type="button" class="btn btn-info" onclick="location.href=`/update-status-banner/2/'.$row->id.'`" style="margin-right:5px; margin-bottom:5px;">
                                            Enabled
                                       </button>';
                        } else {
                            $status = '<button type="button" class="btn btn-danger" onclick="location.href=`/update-status-banner/1/'.$row->id.'`" style="margin-right:5px; margin-bottom:10px;">
                                            Disabled
                                       </button>';
                        }
                        return $status;
                    })->addColumn('action', function($row){
                        $actionBtn = '<button type="button" class="btn btn-danger" onclick="deletebannerConfirmation('. $row->id . ')" title="Hapus" style="margin-right:5px; margin-bottom:10px;"><i class="fas fa-trash"></i></button>';
                        return $actionBtn;
                    })->rawColumns(['gambar', 'kategori', 'status', 'action'])
                    ->make(true);
            }

            toastr()->success('Konten Berhasil Dimuat');
        } catch (\Exception $e){
            $titlepage = [];
            toastr()->error('Konten Gagal Dimuat. Hubungi Programmer!!');
        }

        return view ('admin.banner.index', compact('titlepage'));
    }

    public function update_status_banner($status, $id)
    {   
        if ($status == 2){
            Banner::where(['id' => $id])->update([
                'status_enabled' => 2,
            ]);

            toastr()->warning('Disable Banner Berhasil !');
        }else{
            Banner::where(['id' => $id])->update([
                'status_enabled' => 1,
            ]);

            toastr()->success('Enable Banner Berhasil !');
        }

        return redirect('/banner-beranda');
    }

    public function upload_banner(Request $request){
        $request->validate([
            'banner' => 'image|mimes:jpeg,png,jpg,webp,svg|max:8024',
        ],
        [
            'banner.image'=>trans('File yang di upload harus gambar !'),
            'banner.mimes'=>trans('Tipe file harus .jpeg .png .jpg .webp .svg !'),
            'banner.max'=>trans('Ukuran file maksimal 8mb !')
        ]);

        $file = $request->banner;
        $fileName = 'banner'.'-'.time().'.'.$file->extension();
        $file->move(storage_path('app/public/banner'), $fileName); 

        DB::beginTransaction();

        try {
            Banner::insert([
                'gambar' => $fileName,
                'kategori' => $request->kategori,
                'status_enabled' => 1,
                'created_at' => Carbon::now ('Asia/Jakarta')
            ]);

            toastr()->success('Banner Berhasil Diupload.');

            DB::commit();

        } catch (\Exception $e) {

            DB::rollback();
            toastr()->error('Terdapat kesalahan dalam memproses data. Hubungi Programmer!!');
        }

        return redirect()->back();
    }

    // Adminpage - Delete Banner
    public function hapus_banner($id){

        $aktif = Banner::where(['id'=>$id])->update([
            'status_enabled'=>0,
            'updated_at'=> Carbon::now ('Asia/Jakarta')
        ]);

        //Check data deleted or not
        if ($aktif == 1){
            $success = true;
            $message = "Data Berhasil Dihapus";
        }else {
            $success = false;
            $message = "Data Tidak Ditemukan!";
        }

        //Return response
        return response()->json([
            'success' => $success,
            'message' => $message,
        ]);
    }
}
