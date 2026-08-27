<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('daftar_pimpinan', function (Blueprint $table) {
            $table->string('tempat_lahir')->nullable()->after('nama_pimpinan');
            $table->date('tanggal_lahir')->nullable()->after('tempat_lahir');
            $table->string('agama')->nullable()->after('tanggal_lahir');
            $table->string('jenis_kelamin')->nullable()->after('agama');
        });
    }

    public function down(): void
    {
        Schema::table('daftar_pimpinan', function (Blueprint $table) {
            $table->dropColumn([
                'tempat_lahir',
                'tanggal_lahir',
                'agama',
                'jenis_kelamin',
            ]);
        });
    }
};