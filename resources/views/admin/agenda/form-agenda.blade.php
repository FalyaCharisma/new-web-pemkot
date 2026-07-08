@extends('admin.layouts.app')

@section('content')
    <div class="container">
        <div class="page-inner">

            <div class="page-header">

                <h3 class="fw-bold mb-3">{{ $titlepage }}</h3>

                <ul class="breadcrumbs mb-3">

                    <li class="nav-home">
                        <a href="#"><i class="icon-home"></i></a>
                    </li>

                    <li class="separator">
                        <i class="icon-arrow-right"></i>
                    </li>

                    <li class="nav-item">
                        <a href="#">Agenda</a>
                    </li>

                    <li class="separator">
                        <i class="icon-arrow-right"></i>
                    </li>

                    <li class="nav-item">
                        <a href="#">Form Agenda</a>
                    </li>

                </ul>

            </div>



            <form action="{{ route('update_agenda') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="row">
                    <div class="col-lg-12 my-3">

                        <button type="button" class="btn btn-danger" onclick="window.history.back()">

                            <i class="fa fa-arrow-left me-2"></i>
                            Kembali
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fa fa-paper-plane me-2"></i>
                            Simpan
                        </button>
                    </div>
                    @include('admin.validation')
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <input type="hidden" name="id" value="{{ $agenda->id ?? '' }}">
                                <div class="form-group">
                                    <label>
                                        Judul Acara
                                    </label>
                                    <input type="text" name="judul_acara" class="form-control" required
                                        value="{{ $agenda->judul_acara ?? '' }}">
                                </div>
                                <div class="form-group">
                                    <label>
                                        Tanggal Mulai
                                    </label>
                                    <input type="date" name="tanggal_mulai" class="form-control" required
                                        value="{{ $agenda?->tanggal_mulai?->format('Y-m-d') ?? '' }}">
                                </div>
                                <div class="form-group">
                                    <label>
                                        Tanggal Selesai
                                    </label>
                                    <input type="date" name="tanggal_selesai" class="form-control" required
                                        value="{{ $agenda?->tanggal_selesai?->format('Y-m-d') ?? '' }}">
                                </div>
                                <div class="form-group">
                                    <label>
                                        Lokasi Acara
                                    </label>
                                    <input type="text" name="lokasi_acara" class="form-control" required
                                        value="{{ $agenda->lokasi_acara ?? '' }}">
                                </div>
                                <div class="form-group">
                                    <label>
                                        Link Google Maps
                                    </label>
                                    <input type="text" name="maps_lokasi" class="form-control"
                                        placeholder="https://maps.google.com/..." value="{{ $agenda->maps_lokasi ?? '' }}">
                                </div>
                                <div class="form-group">
                                    <label>
                                        Deskripsi
                                    </label>
                                    <textarea class="my-editor" id="my-editor" name="deskripsi">
                                        {!! $agenda->deskripsi ?? '' !!}
                                    </textarea>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div id="banner-preview" class="text-center">
                                    <img src="{{ empty($agenda) ? asset('assets/images/noimage.png') : asset('storage/agenda/' . $agenda->banner) }}"
                                        width="70%">
                                </div>
                                <div class="form-group">
                                    <label>
                                        Banner Agenda
                                    </label>
                                    <input type="hidden" name="bannerlama" value="{{ $agenda->banner ?? '' }}">
                                    <input type="file" name="banner" id="banner" class="form-control"
                                        @if (empty($agenda)) required @endif>
                                    <p class="text-danger">
                                        <i>
                                            * jpg,png,jpeg,webp maksimal 2 MB
                                        </i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <script>
        const preview = document.getElementById(
            'banner-preview'
        );
        const file = document.getElementById(
            'banner'
        );
        file.addEventListener(
            'change',
            function() {
                const foto = file.files[0];
                if (foto) {
                    const reader = new FileReader();
                    reader.readAsDataURL(
                        foto
                    );
                    reader.onload = function() {
                        preview.innerHTML =
                            '<img src="' + this.result + '" style="width:70%;">';
                    }
                }
            }
        );
    </script>
@endsection
