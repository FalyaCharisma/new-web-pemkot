<?php

namespace App\Http\Controllers;
use App\Models\OPD;
use App\Models\KategoriOPD;
use App\Models\Jabatan;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use DataTables;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class PerangkatDaerahController extends Controller
{
    public function index(string $slug)
    {
        $kategori = KategoriOPD::with([
            'opd.pimpinan.jabatan'
        ])
        ->where('slug', $slug)
        ->firstOrFail();

        $kategoriList = KategoriOPD::select(
            'id',
            'nama',
            'slug'
        )->get();

        return Inertia::render(
            'perangkat-daerah/index',
            [
                'kategori' => $kategori,
                'kategoriList' => $kategoriList,
            ]
        );
    }

    // ------------------------------ ADMINPAGE ---------------------------------
    // Adminpage - List Jabatan
    public function list_jabatan(Request $request){
        try{
            if($request->ajax()){
                $jabatan = Jabatan::where('status_enabled', 1)->orderBy('created_at', 'desc')->get();
                return Datatables::of($jabatan)
                ->addIndexColumn()
                ->addColumn('jabatan', function($row){
                    $jabatan = $row['nama_jabatan'];
                    return $jabatan;
                })->addColumn('action', function($row){
                    $actionBtn = '<button  type="button" class="btn btn-primary" onclick="editjabatan(' . $row->id .')" title="Edit" style="margin-right:5px; margin-bottom:5px;"><i class="fas fa-edit"></i></button>
                                    <button type="button" class="btn btn-danger" onclick="deleteConfirmation('. $row->id . ')" title="Hapus" style="margin-right:5px; margin-bottom:5px;"><i class="fas fa-trash"></i></button>';
                    return $actionBtn;
                })->rawColumns(['action', 'jabatan'])
                ->make(true);
            }
        }catch (\Exception $exception){
            $jabatan = [];
            toastr()->error('Data Gagal Dimuat. Hubungi Programmer!!');
        }

        return view('admin.perangkat-daerah.list-jabatan');
    }

    // Adminpage - Update Jabatan
    public function update_jabatan(Request $request){        
        
        DB::beginTransaction();

        try{
            if (isset($request->id)){
                Jabatan::where(['id'=>$request->id])->update([
                    'nama_jabatan' => $request->nama_jabatan,
                    'updated_at' => Carbon::now ('Asia/Jakarta')
                ]);

                toastr()->success('Jabatan Berhasil Diperbarui.');
            }else{
                Jabatan::insert([
                    'nama_jabatan' => $request->nama_jabatan,
                    'created_at' => Carbon::now ('Asia/Jakarta')
                ]);

                toastr()->success('Jabatan Berhasil Ditambahkan.');
            }

            DB::commit();
        }catch(\Exception $exception){
            DB::rollback();
            toastr()->error('Terdapat kesalahan dalam memproses data. Hubungi Programmer!!');
        }

        return redirect('/list-jabatan');
    }

    // Adminpage - Value Jabatan
    public function value_jabatan($id){
        $jabatan = Jabatan::where('id', $id)->first();
        return response()->json($jabatan);
    }

    // Adminpage - Delete Jabatan
    public function hapus_jabatan($id){
    
        $jabatan = DaftarPimpinan::where('id_jabatan', $id)->get();

        if (count($jabatan) == 0){
            $aktif = Jabatan::where(['id'=>$id])->update([
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

        } else{
            $success = false;
            $message = "Data Tidak Bisa Dihapus Karena Terhubung Dengan Data Lain!";
        }

        //Return response
        return response()->json([
            'success' => $success,
            'message' => $message,
        ]);
    }

     // Adminpage - List Kategori OPD
     public function list_kategori_opd(Request $request){
        try{
            if($request->ajax()){
                $kategori_opd = KategoriOPD::where('status_enabled', 1)->orderBy('created_at', 'desc')->get();
                return Datatables::of($kategori_opd)
                ->addIndexColumn()
                ->addColumn('kategori_opd', function($row){
                    $kategori_opd = $row['nama'];
                    return $kategori_opd;
                })->addColumn('action', function($row){
                    $actionBtn = '<button  type="button" class="btn btn-primary" onclick="edit(' . $row->id .')" title="Edit" style="margin-right:5px; margin-bottom:5px;"><i class="fas fa-edit"></i></button>
                                    <button type="button" class="btn btn-danger" onclick="deleteConfirmation('. $row->id . ')" title="Hapus" style="margin-right:5px; margin-bottom:5px;"><i class="fas fa-trash"></i></button>';
                    return $actionBtn;
                })->rawColumns(['action', 'kategori_opd'])
                ->make(true);
            }
        }catch (\Exception $exception){
            $kategori_opd = [];
            toastr()->error('Data Gagal Dimuat. Hubungi Programmer!!');
        }

        return view('admin.perangkat-daerah.list-kategori-opd');
    }

    // Adminpage - Update Kategori OPD
    public function update_kategori_opd(Request $request){        
        
        DB::beginTransaction();

        try{
            if (isset($request->id)){
                KategoriOPD::where(['id'=>$request->id])->update([
                    'nama' => $request->nama,
                    'updated_at' => Carbon::now ('Asia/Jakarta')
                ]);

                toastr()->success('Kategori OPD Berhasil Diperbarui.');
            }else{
                KategoriOPD::insert([
                    'nama' => $request->nama,
                    'created_at' => Carbon::now ('Asia/Jakarta')
                ]);

                toastr()->success('Kategori OPD Berhasil Ditambahkan.');
            }

            DB::commit();
        }catch(\Exception $exception){
            DB::rollback();
            toastr()->error('Terdapat kesalahan dalam memproses data. Hubungi Programmer!!');
        }

        return redirect('/list-kategori-opd');
    }

    // Adminpage - Value Kategori OPD
    public function value_kategori_opd($id){
        $kategori_opd = KategoriOPD::where('id', $id)->first();
        return response()->json($kategori_opd);
    }

    // Adminpage - Delete Kategori OPD
    public function hapus_kategori_opd($id){
    
        $kategori_opd = OPD::where('kategori', $id)->get();

        if (count($kategori_opd) == 0){
            $aktif = KategoriOPD::where(['id'=>$id])->update([
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

        } else{
            $success = false;
            $message = "Data Tidak Bisa Dihapus Karena Terhubung Dengan Data Lain!";
        }

        //Return response
        return response()->json([
            'success' => $success,
            'message' => $message,
        ]);
    }

    // Adminpage - List OPD
    public function list_opd(Request $request){
        if ($request->ajax()) {
            $opd = OPD::where('status_enabled', 1)->get();
            return Datatables::of($opd)
                ->addIndexColumn()
                ->addColumn('nama', function($row){
                    $nama = substr($row['nama'], 0, 200) . '...';
                    return $nama;
                })->addColumn('kategori', function($row){
                    $kategori = $row->kategori_opd->nama;
                    return $kategori;
                })->addColumn('logo', function($row){
                    $logo = '<img src="'. url('storage/opd/' . $row->logo) .'" width="100">';
                    return $logo;
                })->addColumn('website', function($row){
                    $website = $row['website'];
                    return $website;
                })->addColumn('action', function($row){
                    $action = '<button type="button" class="btn btn-warning" onclick="location.href=`/form-opd/'. $row->id .'`" title="Edit" style="margin-right:5px; margin-bottom:5px;"><i class="fa fa-pen"></i></button>
                                <button type="button" class="btn btn-danger" onclick="deleteConfirmation('. $row->id . ')" title="Delete" style="margin-right:5px; margin-bottom:5px;"><i class="fa fa-trash"></i></button>';
                    return $action;
                })->rawColumns(['nama', 'kategori', 'logo', 'website', 'action'])
                ->make(true);
        }
        return view('admin.perangkat-daerah.list-opd');
    }

    public function form_opd($id){
        $kategori = KategoriOPD::where('status_enabled', 1)->get();
        if ($id == 'add'){
            $titlepage = 'Tambah OPD';
            $opd = [];
        }else{
            $titlepage = 'Edit OPD';
            $opd = OPD::where('id', $id)->first();
        }

        return view ('admin.perangkat-daerah.form-opd', compact('titlepage', 'opd', 'kategori'));
    }

    // Update opd
    public function update_opd(Request $request){
        $request->validate([
            'logo' => 'image|mimes:jpeg,png,jpg,webp,svg|max:2024'
        ],
        [
            'logo.image'=>trans('File yang di upload harus gambar !'),
            'logo.mimes'=>trans('Tipe file harus .jpeg .png .jpg .webp .svg !'),
            'logo.max'=>trans('Ukuran file maksimal 2mb !')
        ]);

        if (isset($request->logo)){
            $file = $request->logo;
            $fileName = 'logoopd'.'-'.time().'.'.$file->extension();
            $file->move(storage_path('app/public/opd'), $fileName); 
        }else{
            $fileName = $request->logolama;
        }

        DB::beginTransaction();

        try{
            if (isset($request->id)){
                OPD::where(['id'=>$request->id])->update([
                    'nama' => $request->nama,
                    'kategori' => $request->kategori,
                    'logo' => $fileName,
                    'website' => $request->website,
                    'alamat' => $request->alamat,
                    'detail_opd' => $request->detail_opd,
                    'updated_at' => Carbon::now ('Asia/Jakarta')
                ]);
                
                toastr()->success('Perangkat Daerah Berhasil Diubah.');
            }else{
                OPD::insert([
                    'nama' => $request->nama,
                    'kategori' => $request->kategori,
                    'logo' => $fileName,
                    'website' => $request->website, 
                    'alamat' => $request->alamat,
                    'detail_opd' => $request->detail_opd,
                    'created_at' => Carbon::now ('Asia/Jakarta')
                ]);
    
                toastr()->success('Perangkat daerah Berhasil Ditambahkan.');
            }

            DB::commit();

        }catch(\Exception $exception){
            DB::rollback();
            toastr()->error('Terdapat kesalahan dalam memproses data. Hubungi Programmer!!');
        }

        return redirect('/list-opd');
    }

    // Hapus OPD
    public function hapus_opd($id){
    
        $aktif = OPD::where(['id'=>$id])->update([
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
