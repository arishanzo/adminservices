<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Promo extends Model
{
    use HasFactory;

     use HasFactory;

     
          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'promo';
     protected $primaryKey = 'idpromo';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

   
    protected $fillable = [ 
        'idadmin',
        'judulpromo',
        'keteranganpromo',
        'tglpromo',
        'tglberakhirpromo',
        'stokpromo',
        'jumlahdiskon',
    ];

           protected static function booted()
    {
        static::creating(function ($model) {
            $model->idpromo = (string) Str::uuid();
        });
    }
}
