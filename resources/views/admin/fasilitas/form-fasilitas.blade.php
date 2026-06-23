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
        <form action="{{ route('update_fasilitas') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="row">
                <div class="col-lg-12 my-3">
                    <button type="button" class="btn btn-danger" onclick="window.history.back();">
                        <i class="fa fa-arrow-left"></i> Kembali
                    </button>
                    <button type="submit" class="btn btn-secondary ms-3">
                        <i class="fa fa-paper-plane"></i> Simpan
                    </button>
                </div>
                @include('admin.validation')
                <div class="col-md-6 mt-2">
                    <div class="card">
                        <div class="card-body">
                            <input type="hidden" id="id" name="id" value="{{ empty($fasilitas) ? '' : $fasilitas['id'] }}">
                            <div class="form-group">
                                <label for="kategori"><b>Kategori</b></label>
                                <select class="form-select form-control-lg" id="kategori" name="kategori" required>
                                    <option disabled selected>Pilih Kategori</option>
                                    @foreach ($kategori as $item)
                                        <option value="{{ $item->id }}" 
                                            {{ (!empty($fasilitas['kategori_id']) && $fasilitas['kategori_id'] == $item->id) ? 'selected' : '' }}>
                                            {{ $item->nama_kategori }}
                                        </option>
                                    @endforeach
                                </select>
                            </div> 
                            <div class="form-group">
                                <label for="sub_kategori"><b>Sub Kategori</b></label>
                                <select class="form-select form-control-lg" id="sub_kategori" name="sub_kategori" required>
                                    <option disabled selected>Pilih Sub Kategori</option>
                                    @foreach ($sub_kategori as $item)
                                        <option value="{{ $item->id }}" 
                                            {{ (!empty($fasilitas['sub_kategori_id']) && $fasilitas['sub_kategori_id'] == $item->id) ? 'selected' : '' }}>
                                            {{ $item->nama_sub }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>                            

                            <div class="form-group">
                                <label for="nama" class="form-label"><b>Nama Fasilitas</b></label>
                                <input type="text" class="form-control input-full" id="nama" name="nama" value="{{ empty($fasilitas) ? '' : $fasilitas['nama'] }}" required>
                            </div>
                            <div class="form-group">
                                <label for="alamat" class="form-label"><b>Alamat</b></label>
                                <textarea class="form-control" id="alamat" name="alamat" rows="4" required>{{ empty($fasilitas) ? '' : $fasilitas['alamat'] }}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="telp" class="form-label"><b>Telepon</b></label>
                                <input type="text" class="form-control input-full" id="telp" name="telp" value="{{ empty($fasilitas) ? '' : $fasilitas['telp'] }}" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mt-2">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                <label for="link" class="form-label"><b>Link Website</b></label>
                                <input type="text" class="form-control input-full" id="link" name="link" value="{{ empty($fasilitas) ? '' : $fasilitas['link'] }}" required>
                            </div>
                            <div class="form-group">
                                <label for="map" class="form-label"><b>Link Map</b></label>
                                <input type="text" class="form-control input-full" id="map" name="map" value="{{ empty($fasilitas) ? '' : $fasilitas['map'] }}" required>
                            </div>
                            <div class="form-group">
                                <div id="foto-preview" class="text-center">
                                    <img src="{{ empty($fasilitas) ? asset('assets/images/noimage.png') : asset('storage/fasilitas/' . $fasilitas['foto']) }}" width="30%">
                                </div>
                                <label for="gambar" class="form-label"><b>Gambar</b></label>
                                <input type="hidden" class="form-control" name="gambarlama" id="gambarlama" value="{{ empty($fasilitas) ? null : $fasilitas['foto'] }}" required/>
                                <input class="form-control" type="file" id="gambar" name="gambar" @if(empty($fasilitas)) required @endif/>
                                <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp dengan size max 2mb </i></p>
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
