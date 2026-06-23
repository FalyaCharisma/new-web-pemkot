@extends('admin.layouts.app')

@section('title', $titlepage)

@section('content')

<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">{{ $titlepage }}</h3>
            <ul class="breadcrumbs mb-3">
                <li class="nav-home">
                    <a href="#">
                    <i class="icon-home"></i>
                    </a>
                </li>
                <li class="separator">
                    <i class="icon-arrow-right"></i>
                </li>
                <li class="nav-item">
                    <a href="#">{{ $titlepage }}</a>
                </li>
            </ul>
        </div>
        <form action="{{ route('update_kalender_acara') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <button type="button" class="btn btn-danger" onclick="window.history.back();">
                                <i class="fa fa-arrow-left"></i> Kembali
                            </button>
                            <button type="submit" class="btn btn-secondary ms-3">
                                <i class="fa fa-paper-plane"></i> Simpan
                            </button>
                        </div>
                        @include('admin.validation')
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <input type="hidden" id="id" name="id" value="{{ $acara == [] ? '' : $acara['id'] }}">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label for="kategori"><b>Tanggal Mulai</b></label>
                                                <input type="date" id="tanggal_mulai" name="tanggal_mulai" class="form-control" value="{{ $acara == [] ? '' : \Carbon\Carbon::parse($acara['tanggal_mulai'])->format('Y-m-d') }}" required>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="kategori"><b>Tanggal Selesai</b></label>
                                                <input type="date" id="tanggal_selesai" name="tanggal_selesai" class="form-control" value="{{ $acara == [] ? '' : \Carbon\Carbon::parse($acara['tanggal_selesai'])->format('Y-m-d') }}" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input type="hidden" id="id" name="id" value="{{ $acara == [] ? '' : $acara['id'] }}">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label for="kategori"><b>Tempat Acara</b></label>
                                                <input type="text" id="lokasi_acara" name="lokasi_acara" class="form-control" value="{{ $acara == [] ? '' : $acara['lokasi_acara'] }}" required>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="kategori"><b>Link Maps</b></label>
                                                <input type="text" id="maps_lokasi" name="maps_lokasi" class="form-control" value="{{ $acara == [] ? '' :  $acara['maps_lokasi'] }}" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="kategori"><b>Judul Acara</b></label>
                                        <textarea class="form-control" id="judul_acara" name="judul_acara" rows="3" maxlength="300">{{ $acara == [] ? '' : $acara['judul_acara'] }}</textarea>
                                        <small id="charCount">0/300 Karakter</small>
                                    </div>
                                    <div class="form-group">
                                        <div id="foto-preview" class="text-center">
                                            <img src="{{ empty($acara) ? asset('assets/images/noimage.png') : asset('storage/acara/' . $acara['banner']) }}" width="30%">
                                        </div>
                                        <label for="kategori"><b>Banner</b></label>
                                        <input type="hidden" class="form-control" name="bannerlama" id="bannerlama" value="{{ $acara == [] ? null : $acara['banner'] }}" required/>
                                        <!-- <input type="file" class="form-control" name="banner" id="banner" required> -->
                                        <input class="form-control" type="file" id="foto" name="foto" style="margin-bottom:20px;" {{ $acara == [] ? 'required' : '' }} />
                                        <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp .svg dengan size max 2mb </i></p>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label for="kategori"><b>Deskripsi</b></label>
                                        <textarea class="my-editor" id="my-editor" name="deskripsi">{{ $acara == [] ? '' : $acara['deskripsi'] }}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>

<script>
    // CHARACTER COUNT
    document.addEventListener('DOMContentLoaded', function () {
        const textarea = document.getElementById('judul_acara');
        const charCount = document.getElementById('charCount');

        textarea.addEventListener('input', function () {
            const length = textarea.value.length;
            charCount.textContent = `${length}/300 characters`;

            if (length > 300) {
                textarea.value = textarea.value.substring(0, 300); // Truncate if exceeds
            }
        });
    });
</script>

<script>
    // LOGO PREVIEW BANNER
    const fotoPreview = document.getElementById("foto-preview");
    const fotoFile = document.getElementById("banner");

    fotoFile.addEventListener("change", function () {
        getImgData();
    });

    function getImgData() {
        const foto = fotoFile.files[0];
        if (foto) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(foto);
            fileReader.addEventListener("load", function () {
                fotoPreview.style.display = "block";
                fotoPreview.innerHTML = '<img src="' + this.result + '" style="width:30%;"/>';
            }); 
        }
    }
</script>
@endsection