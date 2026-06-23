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
                    <a href="#">Penghargaan</a>
                </li>
                <li class="separator">
                    <i class="icon-arrow-right"></i>
                </li>
                <li class="nav-item">
                    <a href="#">{{ empty($titlepage) ? '' : $titlepage }}</a>
                </li>
            </ul>
        </div>
        <form action="{{ route('update_penghargaan') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="row col-md-12">
                <div class="card">
                    <div class="card-header d-flex gap-3">
                        <button type="button" class="btn btn-danger" onclick="window.history.back();">
                            <i class="fa fa-arrow-left me-2"></i> Kembali
                        </button>
                        <button type="submit" class="btn btn-secondary">
                            <i class="fa fa-paper-plane me-2"></i> Simpan
                        </button>
                    </div>
                    @include('admin.validation')
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <div class="form-group">
                                    <input type="hidden" id="id" name="id" value="{{ empty($penghargaan) ? '' : $penghargaan['id'] }}">
                                    <label for="judul" class="form-label">Judul</label>
                                    <input class="form-control" type="text" id="judul" name="judul" value="{{ empty($penghargaan) ? '' : $penghargaan['judul'] }}" required/>
                                </div>
                                <div class="form-group">
                                    <label for="tanggal" class="form-label">Tanggal</label>
                                    <input type="date" id="tanggal" name="tanggal" class="form-control" value="{{ empty($penghargaan) ? '' : \Carbon\Carbon::parse($penghargaan['tanggal'])->format('Y-m-d') }}" required>
                                </div>
                                <div class="form-group">
                                    <div id="foto-preview" class="text-center">
                                        <img src="{{ empty($penghargaan) ? asset('assets/images/noimage.png') : asset('storage/penghargaan/' . $penghargaan['foto']) }}" width="30%">
                                    </div>
                                    <label for="foto" class="form-label">Foto</label>
                                    <input type="hidden" class="form-control" name="fotolama" id="fotolama" value="{{ empty($penghargaan) ? null : $penghargaan['foto'] }}" required/>
                                    <input class="form-control" type="file" id="foto" name="foto" @if(empty($penghargaan)) required @endif/>
                                    <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp dengan size max 2mb </i></p>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <div class="form-group">
                                    <label for="kategori"><b>Deskripsi</b></label>
                                    <textarea class="my-editor" id="my-editor" name="deskripsi">{!! empty($penghargaan) ? '' : $penghargaan['deskripsi'] !!}</textarea>
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
    // LOGO PREVIEW BERITA
    const fotoPreview = document.getElementById("foto-preview");
    const fotoFile = document.getElementById("foto");

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