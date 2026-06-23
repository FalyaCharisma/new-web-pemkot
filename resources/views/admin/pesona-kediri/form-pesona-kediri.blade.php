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
                    <a href="#">{{ empty($titlepage) ? '' : $titlepage }}</a>
                </li>
            </ul>
        </div>
        <form action="{{ route('update_pesona_kediri') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <button type="submit" class="btn btn-secondary ms-3">
                                <i class="fa fa-paper-plane"></i> Simpan
                            </button>
                        </div>
                        @include('admin.validation')
                        <div class="card-body">
                            <div class="row">
                                <input type="hidden" id="id" name="id" value="{{ $pesona['id'] }}">
                                <div class="col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label for="kategori"><b>Judul</b></label>
                                        <input type="text" id="judul" name="judul" class="form-control" value="{{ $pesona['judul'] }}" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="deskripsi" class="mb-2 form-label">Deskripsi:</label>
                                        <textarea class="my-editor" id="my-editor" name="deskripsi">{{ $pesona['deskripsi'] }}</textarea>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6">
                                    <div class="row col-md-12">
                                        <div class="col-md-4">
                                            <label for="gambar" class="form-label">Gambar 1</label>
                                            <div id="foto-preview1" class="text-center mb-5">
                                                <img src="{{ empty($pesona['gambar1']) ? asset('assets/images/noimage.png') : asset('storage/pesona-kediri/' . $pesona['gambar1']) }}" width="60%">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="gambar" class="form-label">Gambar 2</label>
                                            <div id="foto-preview2" class="text-center">
                                                <img src="{{ empty($pesona['gambar2']) ? asset('assets/images/noimage.png') : asset('storage/pesona-kediri/' . $pesona['gambar2']) }}" width="60%">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="gambar3" class="form-label">Gambar 3</label>
                                            <div id="foto-preview3" class="text-center mb-5">
                                                <img src="{{ empty($pesona['gambar3']) ? asset('assets/images/noimage.png') : asset('storage/pesona-kediri/' . $pesona['gambar3']) }}" width="60%">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="gambar1" class="form-label">Gambar 1</label>
                                        <input type="hidden" class="form-control" name="gambarlama1" id="gambarlama1" value="{{ $pesona['gambar1'] }}" required/>
                                        <input class="form-control" type="file" id="gambar1" name="gambar1" />
                                        <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp dengan size max 2mb </i></p>
                                    </div>
                                    <div class="form-group">
                                        <label for="gambar2" class="form-label">Gambar 2</label>
                                        <input type="hidden" class="form-control" name="gambarlama2" id="gambarlama2" value="{{ $pesona['gambar2'] }}" required/>
                                        <input class="form-control" type="file" id="gambar2" name="gambar2" />
                                        <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp dengan size max 2mb </i></p>
                                    </div>
                                    <div class="form-group">
                                        <label for="gambar3" class="form-label">Gambar 3</label>
                                        <input type="hidden" class="form-control" name="gambarlama3" id="gambarlama3" value="{{ $pesona['gambar3'] }}" required/>
                                        <input class="form-control" type="file" id="gambar3" name="gambar3" />
                                        <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp dengan size max 2mb </i></p>
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
    function previewImage(inputElement, previewElementId) {
        const file = inputElement.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById(previewElementId).innerHTML = 
                    '<img src="' + e.target.result + '" style="width:60%;" />';
            };
            reader.readAsDataURL(file);
        }
    }

    // Event listeners for image previews
    document.getElementById("gambar1").addEventListener("change", function () {
        previewImage(this, "foto-preview1");
    });

    document.getElementById("gambar2").addEventListener("change", function () {
        previewImage(this, "foto-preview2");
    });

    document.getElementById("gambar3").addEventListener("change", function () {
        previewImage(this, "foto-preview3");
    });
</script>

@endsection