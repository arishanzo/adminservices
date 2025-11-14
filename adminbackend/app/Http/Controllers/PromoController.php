<?php

namespace App\Http\Controllers;

use App\Http\Requests\PromoRequest;
use App\Models\Promo;
use Illuminate\Http\Request;

class PromoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllPromo()
    {
         $getAll = Promo::all();
          return response()->json([
            'data' => $getAll,
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
    public function store(PromoRequest $request)
    {
          $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }

        $data = $request->validated();
        $data['idadmin'] = $user->idadmin;

       
       
        try {
           
                $result = Promo::create($data);
        
            return response()->json([
                'message' => 'Promo Berhasil Disimpan',
                'data' => $result
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan Tugas Belajar',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    
        
    
    /**
     * Display the specified resource.
     */
    public function show(Promo $promo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Promo $promo)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PromoRequest $request, $idpromo)
    {
                
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }

        $data = $request->validated();
        $data['idadmin'] = $user->idadmin;

        $cek = Promo::where('idpromo', $idpromo)->firstOrFail();


        try {
            if($cek){
                
                $cek->update($data);
                $result = $cek;

            } 

            return response()->json([
                'message' => 'Berhasil Diupdate',
                'data' => $result
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan Promo',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idpromo)
    {
        try {
        $tugas = Promo::findOrFail($idpromo);
        $tugas->delete();


        return response()->json([
            'success' => true,
            'message' => 'berhasil dihapus',
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal menghapus tugas',
            'error' => $e->getMessage()
        ], 500);
    }
    }
}
