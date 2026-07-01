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
        Schema::create('highlight_pesona', function (Blueprint $table) {
            $table->id();

            $table->string('kategori_label');

            $table->string('judul');

            $table->longText('deskripsi')->nullable();

            // Array gambar
            $table->json('images')->nullable();

            // Highlight Card 1
            $table->string('highlight1_icon')->nullable();
            $table->string('highlight1_judul')->nullable();
            $table->text('highlight1_deskripsi')->nullable();

            // Highlight Card 2
            $table->string('highlight2_icon')->nullable();
            $table->string('highlight2_judul')->nullable();
            $table->text('highlight2_deskripsi')->nullable();

            // Highlight Card 3
            $table->string('highlight3_icon')->nullable();
            $table->string('highlight3_judul')->nullable();
            $table->text('highlight3_deskripsi')->nullable();

            // CTA
            $table->string('cta_judul')->nullable();
            $table->text('cta_deskripsi')->nullable();
            $table->string('cta_button')->nullable();
            $table->integer('cta_kategori')->nullable();
            $table->string('cta_keyword')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('highlight_pesona');
    }
};
