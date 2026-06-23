<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Models\User;
use Carbon\Carbon;
use DataTables;

class UserController extends Controller
{
    //list user
    public function list_user(Request $request)
    {
        try{
            if($request->ajax()){
                $user = User::all();
                return Datatables::of($user)
                ->addIndexColumn()
                ->addColumn('action', function($row){
                    $actionBtn = '<button  type="button" class="btn btn-primary" onclick="edituser(' . $row->id .')" title="Edit" style="margin-right:5px; margin-bottom:5px;"><i class="fas fa-edit"></i></button>
                                    <button type="button" class="btn btn-danger" onclick="deleteConfirmation('. $row->id . ')" title="Hapus" style="margin-right:5px; margin-bottom:5px;"><i class="fas fa-trash"></i></button>';
                    return $actionBtn;
                })->rawColumns(['action'])
                ->make(true);
            }
            
            toastr()->success('Data Berhasil Dimuat');
        }catch (\Exception $exception){
            $user = [];
            toastr()->error('Data Gagal Dimuat. Hubungi Programmer!!');
        }

        return view('admin.user.index');
    }

    // Get Value User
    public function value_user($id)
    {
        $user = User::where('id', $id)->first();
        return response()->json($user);
    }

    // Update User
    public function update_user(Request $request){
        // dd($request->all());

        DB::beginTransaction();

        try{
            if (isset($request->id)){
                User::where(['id'=>$request->id])->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'username' => $request->username,
                    'password' => Hash::make($request->password),
                ]);

                toastr()->success('User Berhasil Diubah.');
            }else{
                $request->validate([
                    'name' => ['required', 'string', 'max:255'],
                    'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
                    'password' => ['required', 'confirmed', Rules\Password::defaults()],
                ]);

                User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'username' => $request->username,
                    'password' => Hash::make($request->password),
                ]);

                toastr()->success('User Berhasil Ditambahkan.');
            }

            DB::commit();

        }catch(\Exception $exception){
            DB::rollback();
            toastr()->error('Terdapat kesalahan dalam memproses data. Hubungi Programmer!!');
        }

        return redirect('/list-user');
    }
}
