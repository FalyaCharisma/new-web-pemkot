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
                    <a href="#">Ada Apa Di Kediri</a>
                </li>
                <li class="separator">
                    <i class="icon-arrow-right"></i>
                </li>
                <li class="nav-item">
                    <a href="#">{{ empty($titlepage) ? '' : $titlepage }}</a>
                </li>
            </ul>
        </div>
        <form action="{{ route('update_aset') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="row col-md-12">
                <div class="card">
                    <div class="card-header d-flex gap-3">
                        <button type="button" class="btn btn-danger" onclick="window.history.back();">
                            <i class="fa fa-arrow-left me-2"></i> Kembali
                        </button>
                        <button type="button" class="btn btn-warning" onclick="location.href='/list-kategori-aset'">
                            <span class="btn-label">
                                <i class="fa fa-list me-2"></i>
                            </span>
                            List Kategori
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
                                    <input type="hidden" id="id" name="id" value="{{ empty($aset) ? '' : $aset['id'] }}">
                                    <label for="nama" class="form-label">Nama aset / Produk</label>
                                    <input class="form-control" type="text" id="nama" name="nama" value="{{ empty($aset) ? '' : $aset['nama'] }}" required/>
                                </div>
                                <div class="form-group">
                                    <label for="kategori" class="form-label">Kategori</label>
                                    <select class="form-control select2" id="kategori" name="kategori" required>
                                        <option disabled {{ empty($aset['kategori_id']) ? 'selected' : '' }}>Pilih Kategori</option>
                                        @foreach ($kategori as $item)
                                        <option value="{{ $item->id }}" {{ (!empty($aset['kategori_id']) && $aset['kategori_id'] == $item->id) ? 'selected' : '' }}>
                                            {{ $item->nama_kategori }}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <div id="foto-preview" class="text-center">
                                        <img src="{{ empty($aset) ? asset('assets/images/noimage.png') : asset('storage/aset/' . $aset['gambar']) }}" width="30%">
                                    </div>
                                    <label for="gambar" class="form-label">Gambar</label>
                                    <input type="hidden" class="form-control" name="gambarlama" id="gambarlama" value="{{ empty($aset) ? null : $aset['gambar'] }}" required/>
                                    <input class="form-control" type="file" id="gambar" name="gambar" @if(empty($aset)) required @endif/>
                                    <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp dengan size max 2mb </i></p>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <div class="form-group">
                                    <label for="alamat" class="form-label">Alamat</label>
                                    <input class="form-control" type="text" id="alamat" name="alamat" value="{{ empty($aset) ? '' : $aset['alamat'] }}"/>
                                </div>
                                <div class="form-group">
                                    <label for="maps" class="form-label">Link Maps</label>
                                    <input class="form-control" type="text" id="maps" name="maps" value="{{ empty($aset) ? '' : $aset['maps'] }}"/>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <label for="jam_buka" class="form-label">Jam Buka</label>
                                        <input class="form-control" type="time" id="jam_buka" name="jam_buka" value="{{ empty($aset) ? '' : $aset['jam_buka'] }}"/>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="jam_tutup" class="form-label">Jam Tutup</label>
                                        <input class="form-control" type="time" id="jam_tutup" name="jam_tutup" value="{{ empty($aset) ? '' : $aset['jam_tutup'] }}"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="harga_tiket" class="form-label">Harga Tiket</label>
                                    <input class="form-control" type="text" id="harga_tiket" name="harga_tiket" value="{{ empty($aset) ? '' : $aset['harga_tiket'] }}"/>
                                </div>
                                <div class="form-group">
                                    <label for="kategori"><b>Deskripsi</b></label>
                                    <textarea class="my-editor" id="my-editor" name="deskripsi">{!! empty($aset) ? '' : $aset['deskripsi'] !!}</textarea>
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
  $(document).ready(function() {
    $('.select2').select2({
      placeholder: "Select Kategori",
      allowClear: true
    });
  });
</script>

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