@extends('admin.layouts.app')

@section('title', empty($data) ? '' : $data['menu'])

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">{{ $data == null ? '' : $data['menu'] }}</h3>
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
                <a href="#">Deskripsi Kota</a>
            </li>
            <li class="separator">
                <i class="icon-arrow-right"></i>
            </li>
            <li class="nav-item">
                <a href="#">{{ $data == null ? '' : $data['menu'] }}</a>
            </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <form class="row g-3" action="/update-profil-kota" method="POST" enctype="multipart/form-data">
                    @csrf
                        <div class="card-header ps-5 pe-5">
                            <div class="d-flex justify-content-end">
                                <button type="submit" class="btn btn-secondary">
                                    <span class="btn-label">
                                        <i class="fa fa-paper-plane"></i>
                                    </span>
                                    Simpan
                                </button>
                            </div>
                        </div>
                        <div class="card-body ps-5 pe-5">
                            <input class="form-control" type="hidden" name="id" value="{{ $data == null ? '' : $data['id'] }}">
                            <textarea class="my-editor" id="my-editor" name="content">{{ $data == null ? '' : $data['content'] }}</textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection