<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('saldokeluar', function (Blueprint $table) {
            $table->ulid('idsaldokeluar')->primary();
            $table->uuid('idguru');
            $table->date('tglsaldokeluar');
            $table->integer('jumlahsaldokeluar');
            $table->string('keterangansaldokeluar')->nullable();
            $table->timestamps();


                $table->index('idguru', 'index_tb_idguru');

        });

            DB::statement('
            ALTER TABLE `admingopintar_db`.`saldokeluar`
            ADD CONSTRAINT `fk_saldokeluar_idguru`
            FOREIGN KEY (`idguru`)
            REFERENCES `gurugopintar_db`.`userguru` (`idguru`)
            ON DELETE CASCADE
        ');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {   
           DB::statement('
            ALTER TABLE `admingopintar_db`.`saldokeluar`
            DROP FOREIGN KEY `fk_saldokeluar_idguru`
        ');


         Schema::table('saldokeluar', function (Blueprint $table) {
               $table->dropIndex('idx_saldokeluar_idguru');
        });

        Schema::dropIfExists('saldokeluar');
    }
};
