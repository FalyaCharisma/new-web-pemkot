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
                    <a href="#">Artikel</a>
                </li>
                <li class="separator">
                    <i class="icon-arrow-right"></i>
                </li>
                <li class="nav-item">
                    <a href="#">{{ empty($titlepage) ? '' : $titlepage }}</a>
                </li>
            </ul>
        </div>
        <form action="{{ route('update_artikel') }}" method="POST" enctype="multipart/form-data">
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
                                    <input type="hidden" id="id" name="id" value="{{ empty($artikel) ? '' : $artikel['id'] }}">
                                    <label for="judul" class="form-label">Judul</label>
                                    <input class="form-control" type="text" id="judul" name="judul" value="{{ empty($artikel) ? '' : $artikel['judul'] }}" required/>
                                </div>
                                <div class="form-group">
                                    <div id="fotoartikel-preview" class="text-center">
                                        <img src="{{ empty($artikel) ? asset('assets/images/noimage.png') : asset('storage/artikel/' . $artikel['images']) }}" width="50%">
                                    </div>
                                    <label for="images" class="form-label">Upload Gambar</label>
                                    <input type="hidden" class="form-control" name="gambarlama" id="gambarlama" value="{{ empty($artikel) ? null : $artikel['images'] }}" required/>
                                    <input type="file" name="images" id="images" class="form-control"  @if(empty($artikel)) required @endif />
                                    <p id="logowarning" class="logowarning text-danger">
                                        <i>* Tipe file harus berupa .jpg, .png, .jpeg, .webp, .svg dengan size max 2MB</i><br>
                                    </p>
                                </div>
                                <div class="form-group">
                                    <label for="hits" class="form-label">
                                        <input type="checkbox" name="hits" value="1" {{ isset($artikel['hits']) && $artikel['hits'] == 1 ? 'checked' : '' }}> Konten Hits Di Kediri
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <div class="form-group">
                                    <label for="deskripsi" class="mb-2 form-label">Deskripsi</label>
                                    <textarea class="my-editor" id="my-editor" name="deskripsi">{{ $artikel == [] ? '' : $artikel['deskripsi'] }}</textarea>
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
    const fotoberitaPreview = document.getElementById("fotoartikel-preview");
    const fotoFile = document.getElementById("images");

    fotoFile.addEventListener("change", function () {
        getImgData();
    });

    function getImgData() {
        const foto = fotoFile.files[0];
        if (foto) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(foto);
            fileReader.addEventListener("load", function () {
                fotoberitaPreview.style.display = "block";
                fotoberitaPreview.innerHTML = '<img src="' + this.result + '" style="width:70%;"/>';
            }); 
        }
    }
</script>

@endsection