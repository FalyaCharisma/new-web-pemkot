@extends('admin.layouts.app')

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Berita</h3>
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
                <a href="#">Berita</a>
            </li>
            <li class="separator">
                <i class="icon-arrow-right"></i>
            </li>
            <li class="nav-item">
                <a href="#">Form Dalam Berita</a>
            </li>
           
            </ul>
        </div>
        
        <div class="row">
            <form action="{{ route('update_berita_luar') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="col-lg-12 my-3">
                    <button type="button" class="btn btn-danger" onclick="window.history.back();">
                        <i class="fa fa-arrow-left me-2"></i> Kembali
                    </button>
                    <button type="submit" id="simpan" name="status_published" value="0" class="btn btn-warning">
                        <i class="fas fa-save"></i> Draft
                    </button>
                    <button type="submit" id="simpan" class="btn btn-primary mx-3">
                        <i class="fas fa-arrow-up"></i> Publish
                    </button>
                </div>

                <div class="row">
                    <div class="col-md-6 mt-2">
                        <div class="card card-stats card-round">
                            <div class="card-body">
                                <div class="form-group">
                                    <input type="hidden" id="id" name="id" value="{{ $berita ? $berita->id : '' }}">
                                    <label for="judul" class="form-label">Judul Berita:</label>
                                    <textarea class="form-control" id="judul" name="judul" required>{{ $berita == [] ? '' : $berita['judul'] }}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="deskripsi" class="mb-2 form-label">Deskripsi:</label>
                                    <textarea class="my-editor" id="my-editor" name="deskripsi">{{ $berita == [] ? '' : $berita['deskripsi'] }}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 mt-2">
                        <div class="card card-stats card-round">
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="link" class="form-label">Link:</label>
                                    <input type="text" class="form-control" id="link" name="link" required value="{{ $berita == [] ? '' : $berita['link'] }}">
                                </div>
                                <div class="form-group">
                                    <label for="web" class="form-label">Web:</label>
                                    <input type="text" class="form-control" id="web" name="web" required value="{{ $berita == [] ? '' : $berita['web'] }}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
