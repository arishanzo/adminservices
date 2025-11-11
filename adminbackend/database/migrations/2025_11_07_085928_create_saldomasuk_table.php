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
        Schema::create('saldomasuk', function (Blueprint $table) {
            $table->uuid('idsaldomasuk')->primary();
            $table->uuid('idadmin');
            $table->uuid('idbookingprivate');
            $table->date('tglsaldomasuk');
            $table->integer('jumlahsaldo');
            $table->timestamps();

            $table->foreign('idadmin', 'fk_idamin_saldomasuk')
                  ->references('idadmin')->on('adminlogin')
            ->onDelete('cascade');

             $table->index('idbookingprivate', 'index_tb_idbookingprivate');
        });

           DB::statement('
            ALTER TABLE `admingopintar_db`.`saldomasuk`
            ADD CONSTRAINT `fk_saldomasuk_idbookingprivate`
            FOREIGN KEY (`idbookingprivate`)
            REFERENCES `usrgopintar_db`.`booking` (`idbookingprivate`)
            ON DELETE CASCADE
        ');


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('
            ALTER TABLE `admingopintar_db`.`saldomasuk`
            DROP FOREIGN KEY `fk_saldomasuk_idbookingprivate`
        ');


         Schema::table('saldomasuk', function (Blueprint $table) {
             $table->dropIndex('idx_saldomasuk_idadmin');
            $table->dropIndex('idx_saldomasuk_idbookingprivate');
        });

        Schema::dropIfExists('saldomasuk');
    }
};
