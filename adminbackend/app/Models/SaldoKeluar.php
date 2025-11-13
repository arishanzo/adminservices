<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SaldoKeluar extends Model
{
    use HasFactory;

     
          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'saldokeluar';
     protected $primaryKey = 'idsaldokeluar';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

   
    protected $fillable = [ 
        'idguru',
        'tglsaldokeluar',
        'jumlahsaldokeluar',
        'keterangansaldokeluar',
    ];

           protected static function booted()
    {
        static::creating(function ($model) {
            $model->idsaldokeluar = (string) Str::uuid();
        });
    }
}
