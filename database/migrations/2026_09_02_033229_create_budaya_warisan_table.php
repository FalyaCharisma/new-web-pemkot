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
        Schema::create('budaya_warisan', function (Blueprint $table) {
            $table->id();

            $table->foreignId('kategori_id')
                ->nullable()
                ->constrained('kategori')
                ->nullOnDelete();

            $table->string('tag', 100)->nullable();
            $table->string('judul', 150);
            $table->text('deskripsi')->nullable();
            $table->string('gambar')->nullable();

            $table->integer('urutan')->default(0);
            $table->boolean('status')->default(true);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budaya_warisan');
    }
};
