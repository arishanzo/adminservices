<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('promo', function (Blueprint $table) {
            $table->uuid('idpromo')->primary();
            $table->uuid('idadmin');
            $table->string('judulpromo');
            $table->string('keteranganpromo');
            $table->date('tglpromo');
            $table->date('tglberakhirpromo');
            $table->integer('stokpromo');
            $table->integer('jumlahdiskon');
            $table->timestamps();

            
              $table->foreign('idadmin', 'fk_idamin_promo')
                  ->references('idadmin')->on('adminlogin')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    
    {
        Schema::table('promo', function (Blueprint $table) {
             $table->dropIndex('idx_promo_idadmin');
        });

        Schema::dropIfExists('promo');
    }
};
