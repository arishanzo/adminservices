<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SaldoMasuk extends Model
{
    use HasFactory;

      
          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'saldomasuk';
    protected $primaryKey = 'idsaldomasuk';
    public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

   
    protected $fillable = [   
        'idbookingprivate',
        'tglsaldomasuk',
        'jumlahsaldo',
        'keterangansaldomasuk',
    ];

           protected static function booted()
    {
        static::creating(function ($model) {
            $model->idsaldomasuk = (string) Str::uuid();
        });
    }

}
