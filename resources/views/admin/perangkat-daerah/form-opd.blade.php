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
                <input type="hidden" name="id" value="{{ $opd->id ?? '' }}">

                <div class="row">
                    <div class="col-lg-12 mb-3">
                        <button type="button" class="btn btn-danger" onclick="window.history.back();">
                            <i class="fa fa-arrow-left"></i> Kembali
                        </button>

                        <button type="button" class="btn btn-warning" onclick="location.href='/list-kategori-opd'">
                            <i class="fa fa-list me-2"></i>
                            List Kategori
                        </button>

                        <button type="submit" class="btn btn-secondary ms-2">
                            <i class="fa fa-paper-plane"></i> Simpan
                        </button>
                    </div>

                    @include('admin.validation')
                    <div class="col-md-6 mt-2">

                        {{-- DATA OPD --}}
                        <div class="card card-stats card-round">
                            <div class="card-body">

                                <h4 class="fw-bold mb-4">
                                    <i class="fa fa-building"></i>
                                    Data OPD
                                </h4>

                                <div class="form-group">
                                    <label for="nama" class="form-label">Nama OPD</label>

                                    <input type="text" class="form-control" id="nama" name="nama" required
                                        value="{{ $opd->nama ?? '' }}">
                                </div>

                                <div class="form-group">
                                    <label for="kategori" class="form-label">
                                        Kategori
                                    </label>

                                    <select class="form-control" id="kategori" name="kategori" required>

                                        <option value="" disabled {{ empty($opd) ? 'selected' : '' }}>
                                            Pilih Kategori
                                        </option>

                                        @foreach ($kategori as $item)
                                            <option value="{{ $item->id }}"
                                                {{ isset($opd) && $opd->kategori == $item->id ? 'selected' : '' }}>

                                                {{ $item->nama }}
                                            </option>
                                        @endforeach

                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="website" class="form-label">
                                        Link Website
                                    </label>

                                    <input type="text" class="form-control" id="website" name="website"
                                        value="{{ $opd->website ?? '' }}">
                                </div>

                                <div class="form-group">
                                    <label for="alamat" class="form-label">
                                        Alamat
                                    </label>

                                    <textarea class="form-control" id="alamat" name="alamat" required>{{ $opd->alamat ?? '' }}</textarea>
                                </div>

                            </div>
                        </div>

                        {{-- TUPOKSI --}}
                        <div class="card card-stats card-round mt-4">
                            <div class="card-body">

                                <h4 class="fw-bold mb-4">
                                    <i class="fa fa-file-alt"></i>
                                    Tupoksi OPD
                                </h4>

                                <div class="form-group">
                                    <label for="my-editor" class="mb-2 form-label">
                                        Detail Tupoksi
                                    </label>

                                    <textarea class="my-editor" id="my-editor" name="detail_opd">{{ $opd->detail_opd ?? '' }}</textarea>
                                </div>

                            </div>
                        </div>

                    </div>

                    {{-- DATA KEPALA OPD --}}
                    <div class="col-md-6 mt-2">

                        <div class="card card-stats card-round">
                            <div class="card-body">

                                <h4 class="fw-bold mb-4">
                                    <i class="fa fa-user"></i>
                                    Data Kepala OPD
                                </h4>

                                <div class="form-group">
                                    <label for="nama_pimpinan" class="form-label">
                                        Nama Kepala OPD
                                    </label>

                                    <input type="text" class="form-control" id="nama_pimpinan" name="nama_pimpinan"
                                        required value="{{ $pimpinan->nama_pimpinan ?? '' }}">
                                </div>

                                <div class="form-group">
                                    <label for="nip" class="form-label">
                                        NIP
                                    </label>

                                    <input type="text" class="form-control" id="nip" name="nip"
                                        value="{{ $pimpinan->nip ?? '' }}">
                                </div>

                                <div class="form-group">
                                    <label for="pangkat" class="form-label">
                                        Pangkat
                                    </label>

                                    <input type="text" class="form-control" id="pangkat" name="pangkat"
                                        value="{{ $pimpinan->pangkat ?? '' }}">
                                </div>

                                <div class="form-group">
                                    <label for="gol_ruang" class="form-label">
                                        Golongan / Ruang
                                    </label>

                                    <input type="text" class="form-control" id="gol_ruang" name="gol_ruang"
                                        value="{{ $pimpinan->gol_ruang ?? '' }}">
                                </div>

                                <div class="form-group">

                                    <div class="text-center mb-3">
                                        <img id="foto-preview"
                                            src="{{ !empty($pimpinan?->foto) ? asset('storage/pimpinan/' . $pimpinan->foto) : asset('assets/images/noimage.png') }}"
                                            width="150">
                                    </div>

                                    <label for="foto" class="form-label">
                                        Foto Kepala OPD
                                    </label>

                                    <input type="hidden" name="fotolama" value="{{ $pimpinan->foto ?? '' }}">

                                    <input class="form-control" type="file" id="foto" name="foto"
                                        accept=".jpg,.jpeg,.png,.webp">

                                    <p style="color:red;">
                                        <i>* File jpg, jpeg, png atau webp maksimal 2MB</i>
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
        const fotoPreview = document.getElementById("foto-preview");
        const fotoFile = document.getElementById("foto");

        fotoFile.addEventListener("change", function() {
            const foto = fotoFile.files[0];

            if (foto) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(foto);

                fileReader.addEventListener("load", function() {
                    fotoPreview.src = this.result;
                });
            }
        });
    </script>
@endsection
