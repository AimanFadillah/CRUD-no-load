<?php

namespace App\Http\Controllers;

use App\Models\Penduduk;
use Illuminate\Http\Request;

class PendudukController extends Controller
{
    
    public function index () {
        return view("welcome");
    }

    public function data (Request $request) {
        if(!$request->query("s")){
            $data = Penduduk::latest()->paginate(30);
            return response()->json($data);
        }else{
            $id = $request->query("s");

            $penduduk = Penduduk::find($id);

            return response()->json($penduduk);
        }
    }

    public function createPenduduk (Request $request) {
        $validatedData = $request->validate([
            "nama" => "required",
            "umur" => "required",
            "jabatan" => "required",
        ]);
        
        Penduduk::create($validatedData);
    }

    public function hapusPenduduk (Penduduk $Penduduk){
        Penduduk::destroy($Penduduk->id);
    }

    public function updatePenduduk (Request $request,Penduduk $Penduduk){

        $validatedData = $request->validate([
            "nama" => "required",
            "umur" => "required",
            "jabatan" => "required",
        ]);

        Penduduk::where("id",$Penduduk->id)->update($validatedData);
    }

}
