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
        <form action="{{ route('update_pimpinan') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="row">
                <div class="col-lg-12 my-3">
                    <button type="button" class="btn btn-danger" onclick="window.history.back();">
                        <i class="fa fa-arrow-left"></i> Kembali
                    </button>
                    <button type="button" class="btn btn-warning" onclick="location.href='/list-jabatan'">
                        <span class="btn-label">
                            <i class="fa fa-list me-2"></i>
                        </span>
                        List Jabatan
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
                                    <input type="hidden" id="id" name="id" value="{{ empty($pimpinan) ? '' : $pimpinan['id'] }}">
                                    <label for="nama" class="form-label">Nama Pimpinan</label>
                                    <input type="text" class="form-control" id="nama" name="nama_pimpinan" required value="{{ empty($pimpinan) ? '' : $pimpinan['nama_pimpinan'] }}">
                                </div>
                                <div class="form-group">
                                    <label for="nip" class="form-label">NIP</label>
                                    <input type="text" class="form-control" id="nip" name="nip" value="{{ empty($pimpinan) ? '' : $pimpinan['nip'] }}">
                                </div>
                                <div class="form-group">
                                    <label for="kategori" class="form-label">Jabatan</label>
                                    <select class="form-control" id="kategori" name="jabatan" required>
                                        <option value="" disabled selected>Pilih Jabatan</option>
                                        @foreach ($jabatan as $item)
                                            <option value="{{ $item->id }}" {{ isset($pimpinan) && $pimpinan['id_jabatan'] == $item->id ? 'selected' : '' }}>
                                                {{ $item->nama_jabatan }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="kategori" class="form-label">OPD</label>
                                    <select class="form-control" id="kategori" name="opd" >
                                        <option value="" disabled selected>Pilih OPD</option>
                                        @foreach ($opd as $item)
                                            <option value="{{ $item->id }}" {{ isset($pimpinan) && $pimpinan['id_opd'] == $item->id ? 'selected' : '' }}>
                                                {{ $item->nama }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <div id="foto-preview" class="text-center">
                                        <img src="{{ empty($pimpinan) ? asset('assets/images/noimage.png') : asset('storage/pimpinan/' . $pimpinan['foto']) }}" width="30%">
                                    </div>
                                    <label for="gambar" class="form-label">Foto</label>
                                    <input type="hidden" class="form-control" name="fotolama" id="fotolama" value="{{ empty($pimpinan) ? null : $pimpinan['foto'] }}" required/>
                                    <input class="form-control" type="file" id="foto" name="foto" @if(empty($pimpinan)) required @endif/>
                                    <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp dengan size max 2mb </i></p>
                                </div>
                             
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mt-2">
                        <div class="card card-stats card-round">
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="pangkat" class="form-label">Pangkat</label>
                                    <input type="text" class="form-control" id="pangkat" name="pangkat" value="{{ empty($pimpinan) ? '' : $pimpinan['pangkat'] }}">
                                </div>
                                <div class="form-group">
                                    <label for="gol_ruang" class="form-label">Gol. Ruang</label>
                                    <input type="text" class="form-control" id="gol_ruang" name="gol_ruang" value="{{ empty($pimpinan) ? '' : $pimpinan['gol_ruang'] }}">
                                </div>
                                <div class="form-group">
                                    <label for="deskripsi" class="mb-2 form-label">Deskripsi:</label>
                                    <textarea class="my-editor" id="my-editor" name="deskripsi">{{ empty($pimpinan) ? '' : $pimpinan['deskripsi'] }}</textarea>
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