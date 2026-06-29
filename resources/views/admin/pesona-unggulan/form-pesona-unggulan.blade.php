@extends('admin.layouts.app')

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
                    <a href="#">Pesona Unggulan</a>
                </li>

                <li class="separator">
                    <i class="icon-arrow-right"></i>
                </li>

                <li class="nav-item">
                    <a href="#">Form Pesona Unggulan</a>
                </li>

            </ul>

        </div>

        <form action="{{ route('update_pesona_unggulan') }}" method="POST" enctype="multipart/form-data">

            @csrf

            <div class="row">

                <div class="col-lg-12 my-3">

                    <button
                        type="button"
                        class="btn btn-danger"
                        onclick="window.history.back()">

                        <i class="fa fa-arrow-left me-2"></i>

                        Kembali

                    </button>

                    <button
                        type="submit"
                        class="btn btn-primary">

                        <i class="fa fa-paper-plane me-2"></i>

                        Simpan

                    </button>

                </div>

                @include('admin.validation')

                <input
                    type="hidden"
                    name="id"
                    value="{{ $pesona->id ?? '' }}">

                <div class="col-md-7">

                    <div class="card">

                        <div class="card-body">

                            <div class="form-group">

                                <label>Judul</label>

                                <input
                                    type="text"
                                    name="judul"
                                    class="form-control"
                                    required
                                    value="{{ $pesona->judul ?? '' }}">

                            </div>

                            <div class="form-group">

                                <label>Kategori</label>

                                <select
                                    name="id_kategori"
                                    class="form-control"
                                    required>

                                    <option value="">-- Pilih Kategori --</option>

                                    @foreach($kategori as $item)

                                        <option
                                            value="{{ $item->id }}"
                                            {{ ($pesona->id_kategori ?? '') == $item->id ? 'selected' : '' }}>

                                            {{ $item->nama_kategori }}

                                        </option>

                                    @endforeach

                                </select>

                            </div>

                            <div class="form-group">

                                <label>Deskripsi</label>

                                <textarea
                                    class="my-editor"
                                    id="my-editor"
                                    name="deskripsi">{!! $pesona->deskripsi ?? '' !!}</textarea>

                            </div>

                            <div class="form-group">

                                <label>FYI</label>

                                <textarea
                                    class="form-control"
                                    rows="4"
                                    name="fyi">{{ $pesona->fyi ?? '' }}</textarea>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="col-md-5">

                    <div class="card">

                        <div class="card-body">

                            <div
                                id="cover-preview"
                                class="text-center mb-3">

                                <img
                                    src="{{ empty($pesona) ? asset('assets/images/noimage.png') : asset('storage/pesona/'.$pesona->cover) }}"
                                    style="width:80%;border-radius:10px;">

                            </div>

                            <div class="form-group">

                                <label>Cover</label>

                                <input
                                    type="hidden"
                                    name="coverlama"
                                    value="{{ $pesona->cover ?? '' }}">

                                <input
                                    type="file"
                                    name="cover"
                                    id="cover"
                                    class="form-control"
                                    @if(empty($pesona)) required @endif>

                                <small class="text-danger">
                                    jpg, jpeg, png, webp maksimal 2 MB
                                </small>

                            </div>

                            <hr>

                            <div class="form-group">

                                <label>Judul Video</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="judul_video"
                                    value="{{ $pesona->judul_video ?? '' }}">

                            </div>

                            <div class="form-group">

                                <label>Deskripsi Video</label>

                                <textarea
                                    class="form-control"
                                    rows="3"
                                    name="deskripsi_video">{{ $pesona->deskripsi_video ?? '' }}</textarea>

                            </div>

                            <div class="form-group">

                                <label>URL Youtube</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="url_video"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value="{{ $pesona->url_video ?? '' }}">

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </form>

    </div>

</div>

<script>

const preview = document.getElementById('cover-preview');

const file = document.getElementById('cover');

file.addEventListener('change',function(){

    const foto = file.files[0];

    if(foto){

        const reader = new FileReader();

        reader.readAsDataURL(foto);

        reader.onload=function(){

            preview.innerHTML =
                '<img src="'+this.result+'" style="width:80%;border-radius:10px;">';

        }

    }

});

</script>

@endsection