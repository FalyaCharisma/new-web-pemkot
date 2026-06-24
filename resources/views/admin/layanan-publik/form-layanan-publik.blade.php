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
        <form action="{{ route('update_layanan_publik') }}" method="POST" enctype="multipart/form-data">
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
                                        <input type="hidden" id="id" name="id" value="{{ empty($layanan_publik) ? '' : $layanan_publik['id'] }}">
                                        <label for="judul" class="form-label">Judul Layanan</label>
                                        <textarea class="form-control" id="judul" name="judul" required>{{ empty($layanan_publik) ? '' : $layanan_publik['judul'] }}</textarea>
                                    </div>
                                    <div class="form-group">
                                        <div id="foto-preview" class="text-center">
                                            <img src="{{ empty($layanan_publik) ? asset('assets/images/noimage.png') : asset('storage/layanan-publik/' . $layanan_publik['gambar']) }}" width="30%">
                                        </div>
                                        <label for="gambar" class="form-label">Gambar</label>
                                        <input type="hidden" class="form-control" name="gambarlama" id="gambarlama" value="{{ empty($layanan_publik) ? null : $layanan_publik['gambar'] }}" required/>
                                        <input class="form-control" type="file" id="gambar" name="gambar" @if(empty($layanan_publik)) required @endif/>
                                        <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp dengan size max 2mb </i></p>
                                    </div>
                                    <div class="form-group">
                                        <label for="gambar" class="form-label">Link Website</label>
                                        <input class="form-control" type="text" id="link" name="link" value="{{ empty($layanan_publik) ? '' : $layanan_publik['link'] }}"/>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label for="deskripsi" class="mb-2 form-label">Deskripsi:</label>
                                        <textarea class="my-editor" id="my-editor" name="deskripsi">{{ empty($layanan_publik) ? '' : $layanan_publik['deskripsi'] }}</textarea>
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
    // LOGO PREVIEW BERITA
    const fotoPreview = document.getElementById("foto-preview");
    const fotoFile = document.getElementById("gambar");

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