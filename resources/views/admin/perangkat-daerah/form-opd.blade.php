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
                <a href="#">Profil</a>
            </li>
            <li class="separator">
                <i class="icon-arrow-right"></i>
            </li>
            <li class="nav-item">
                <a href="#">{{ $titlepage }}</a>
            </li>
            </ul>
        </div>
        <form action="{{ route('update_opd') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="row">
                <div class="col-lg-12 my-3">
                    <button type="button" class="btn btn-danger" onclick="window.history.back();">
                        <i class="fa fa-arrow-left"></i> Kembali
                    </button>
                    <button type="button" class="btn btn-warning" onclick="location.href='/list-kategori-opd'">
                        <span class="btn-label">
                            <i class="fa fa-list me-2"></i>
                        </span>
                        List Kategori
                    </button>
                    <button type="submit" class="btn btn-secondary ms-3">
                        <i class="fa fa-paper-plane"></i> Simpan
                    </button>
                </div>
                @include('admin.validation')
                <div class="row">
                    <div class="col-md-6 mt-2">
                        <div class="card card-stats card-round">
                            <div class="card-body">
                                <div class="form-group">
                                    <input type="hidden" id="id" name="id" value="{{ empty($opd) ? '' : $opd['id'] }}">
                                    <label for="nama" class="form-label">Nama OPD</label>
                                    <input type="text" class="form-control" id="nama" name="nama" required value="{{ empty($opd) ? '' : $opd['nama'] }}">
                                </div>
                                <div class="form-group">
                                    <label for="kategori" class="form-label">Kategori</label>
                                    <select class="form-control" id="kategori" name="kategori" required>
                                        <option value="" disabled selected>Pilih Kategori</option>
                                        @foreach ($kategori as $item)
                                            <option value="{{ $item->id }}" {{ isset($opd) && $opd['kategori'] == $item->id ? 'selected' : '' }}>
                                                {{ $item->nama }}
                                            </option>
                                        @endforeach 
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <div id="foto-preview" class="text-center">
                                        <img src="{{ empty($opd) ? asset('assets/images/noimage.png') : asset('storage/opd/' . $opd['logo']) }}" width="30%">
                                    </div>
                                    <label for="gambar" class="form-label">Logo</label>
                                    <input type="hidden" class="form-control" name="logolama" id="logolama" value="{{ empty($opd) ? null : $opd['logo'] }}" required/>
                                    <input class="form-control" type="file" id="logo" name="logo" @if(empty($opd)) required @endif/>
                                    <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp dengan size max 2mb </i></p>
                                </div>
                                <div class="form-group">
                                    <label for="website" class="form-label">Link Website</label>
                                    <input type="text" class="form-control" id="website" name="website" required value="{{ empty($opd) ? '' : $opd['website'] }}">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mt-2">
                        <div class="card card-stats card-round">
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="alamat" class="form-label">Alamat</label>
                                    <textarea class="form-control" id="alamat" name="alamat" required>{{ empty($opd) ? '' : $opd['alamat'] }}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="deskripsi" class="mb-2 form-label">Detail:</label>
                                    <textarea class="my-editor" id="my-editor" name="detail_opd">{{ empty($opd) ? '' : $opd['detail_opd'] }}</textarea>
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
    const fotoFile = document.getElementById("logo");

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