@extends('admin.layouts.app')

@section('title', empty($titlepage) ? '' : $titlepage)

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">{{ empty($titlepage) ? '' : $titlepage }}</h3>
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
                    <a href="#">Pengumuman</a>
                </li>
                <li class="separator">
                    <i class="icon-arrow-right"></i>
                </li>
                <li class="nav-item">
                    <a href="#">{{ empty($titlepage) ? '' : $titlepage }}</a>
                </li>
            </ul>
        </div>
        <form action="{{ route('update_pengumuman') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="row col-md-12">
                <div class="card">
                    <div class="card-header d-flex gap-3">
                        <button type="button" class="btn btn-danger" onclick="window.history.back();">
                            <i class="fa fa-arrow-left me-2"></i> Kembali
                        </button>
                        <button type="submit" class="btn btn-warning" name="status" value="0">
                            <i class="fa fa-archive me-2"></i> Draft
                        </button>
                        <button type="submit" class="btn btn-secondary" name="status" value="1">
                            <i class="fa fa-paper-plane me-2"></i> Publish
                        </button>
                    </div>
                    @include('admin.validation')
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <div class="form-group">
                                    <input type="hidden" id="id" name="id" value="{{ empty($pengumuman) ? '' : $pengumuman['id'] }}">
                                    <label for="judul" class="form-label">Judul</label>
                                    <input class="form-control" type="text" id="judul" name="judul" value="{{ empty($pengumuman) ? '' : $pengumuman['judul'] }}" required/>
                                </div>
                                <div class="form-group">
                                    <label for="tanggal" class="form-label">Tanggal</label>
                                    <input type="date" id="tanggal" name="tanggal" class="form-control" value="{{ empty($pengumuman) ? '' : \Carbon\Carbon::parse($pengumuman['tanggal'])->format('Y-m-d') }}" required>
                                </div>
                                <div class="form-group">
                                    <div id="gambar-preview" class="text-center">
                                        <img src="{{ empty($pengumuman) ? asset('assets/images/noimage.png') : asset('storage/pengumuman/' . $pengumuman['gambar']) }}" width="30%">
                                    </div>
                                    <label for="gambar" class="form-label">Gambar</label>
                                    <input type="hidden" class="form-control" name="gambarlama" id="gambarlama" value="{{ empty($pengumuman) ? null : $pengumuman['gambar'] }}" required/>
                                    <input class="form-control" type="file" id="gambar" name="gambar" @if(empty($pengumuman)) required @endif/>
                                    <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp dengan size max 2mb </i></p>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <div class="form-group">
                                    <label for="kategori"><b>Deskripsi</b></label>
                                    <textarea class="my-editor" id="my-editor" name="deskripsi">{!! empty($pengumuman) ? '' : $pengumuman['deskripsi'] !!}</textarea>
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
    // LOGO PREVIEW PENGUMUMAN
    const gambarPreview = document.getElementById("gambar-preview");
    const gambarFile = document.getElementById("gambar");

    gambarFile.addEventListener("change", function () {
        getImgData();
    });

    function getImgData() {
        const gambar = gambarFile.files[0];
        if (gambar) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(gambar);
            fileReader.addEventListener("load", function () {
                gambarPreview.style.display = "block";
                gambarPreview.innerHTML = '<img src="' + this.result + '" style="width:30%;"/>';
            }); 
        }
    }
</script>
@endsection