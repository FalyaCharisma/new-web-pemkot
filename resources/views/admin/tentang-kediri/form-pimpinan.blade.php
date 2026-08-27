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

                <div class="mb-3">
                    <button type="button" class="btn btn-danger" onclick="window.history.back();">
                        <i class="fa fa-arrow-left"></i> Kembali
                    </button>

                    <button type="button" class="btn btn-warning" onclick="location.href='/list-jabatan'">
                        <i class="fa fa-list me-2"></i> List Jabatan
                    </button>

                    <button type="submit" class="btn btn-secondary ms-3">
                        <i class="fa fa-paper-plane"></i> Simpan
                    </button>
                </div>

                @include('admin.validation')

                <input type="hidden" name="id" value="{{ $pimpinan->id ?? '' }}">

                <div class="row">

                    {{-- DATA PIMPINAN --}}
                    <div class="col-md-6 mt-2">
                        <div class="card card-stats card-round">
                            <div class="card-body">

                                <h4 class="fw-bold mb-4">Data Pimpinan</h4>

                                <div class="form-group">
                                    <label class="form-label">Nama Pimpinan</label>
                                    <input type="text" class="form-control" name="nama_pimpinan" required
                                        value="{{ old('nama_pimpinan', $pimpinan->nama_pimpinan ?? '') }}">
                                </div>

                                {{-- TEMPAT & TANGGAL LAHIR --}}
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Tempat Lahir</label>
                                            <input type="text" class="form-control" name="tempat_lahir"
                                                value="{{ old('tempat_lahir', $pimpinan->tempat_lahir ?? '') }}">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Tanggal Lahir</label>
                                            <input type="date" class="form-control" name="tanggal_lahir"
                                                value="{{ old('tanggal_lahir', isset($pimpinan) && $pimpinan->tanggal_lahir ? \Carbon\Carbon::parse($pimpinan->tanggal_lahir)->format('Y-m-d') : '') }}">
                                        </div>
                                    </div>
                                </div>

                                {{-- AGAMA & JENIS KELAMIN --}}
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Agama</label>

                                            <select class="form-control" name="agama">
                                                <option value="">Pilih Agama</option>

                                                @php
                                                    $agama = [
                                                        'Islam',
                                                        'Kristen Protestan',
                                                        'Katolik',
                                                        'Hindu',
                                                        'Buddha',
                                                        'Konghucu',
                                                    ];
                                                @endphp

                                                @foreach ($agama as $item)
                                                    <option value="{{ $item }}"
                                                        {{ old('agama', $pimpinan->agama ?? '') == $item ? 'selected' : '' }}>
                                                        {{ $item }}
                                                    </option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Jenis Kelamin</label>

                                            <select class="form-control" name="jenis_kelamin">
                                                <option value="">Pilih Jenis Kelamin</option>

                                                <option value="Laki-laki"
                                                    {{ old('jenis_kelamin', $pimpinan->jenis_kelamin ?? '') == 'Laki-laki' ? 'selected' : '' }}>
                                                    Laki-laki
                                                </option>

                                                <option value="Perempuan"
                                                    {{ old('jenis_kelamin', $pimpinan->jenis_kelamin ?? '') == 'Perempuan' ? 'selected' : '' }}>
                                                    Perempuan
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">NIP</label>
                                    <input type="text" class="form-control" name="nip"
                                        value="{{ old('nip', $pimpinan->nip ?? '') }}">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Jabatan</label>

                                    <select class="form-control" name="jabatan" required>
                                        <option value="">Pilih Jabatan</option>

                                        @foreach ($jabatan as $item)
                                            <option value="{{ $item->id }}"
                                                {{ old('jabatan', $pimpinan->id_jabatan ?? '') == $item->id ? 'selected' : '' }}>
                                                {{ $item->nama_jabatan }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">OPD</label>

                                    <select class="form-control" name="opd">
                                        <option value="">Pilih OPD</option>

                                        @foreach ($opd as $item)
                                            <option value="{{ $item->id }}"
                                                {{ old('opd', $pimpinan->id_opd ?? '') == $item->id ? 'selected' : '' }}>
                                                {{ $item->nama }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                {{-- PANGKAT & GOLONGAN --}}
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Pangkat</label>
                                            <input type="text" class="form-control" name="pangkat"
                                                value="{{ old('pangkat', $pimpinan->pangkat ?? '') }}">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Gol. Ruang</label>
                                            <input type="text" class="form-control" name="gol_ruang"
                                                value="{{ old('gol_ruang', $pimpinan->gol_ruang ?? '') }}">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- DATA TAMBAHAN --}}
                    <div class="col-md-6 mt-2">
                        <div class="card card-stats card-round">
                            <div class="card-body">
                                <div class="form-group">

                                    <div id="foto-preview" class="text-center mb-3">
                                        <img src="{{ empty($pimpinan) || empty($pimpinan->foto)
                                            ? asset('assets/images/noimage.png')
                                            : asset('storage/pimpinan/' . $pimpinan->foto) }}"
                                            style="max-width:200px; max-height:250px; object-fit:contain;">
                                    </div>

                                    <label class="form-label">Foto</label>

                                    <input type="hidden" name="fotolama" value="{{ $pimpinan->foto ?? '' }}">

                                    <input class="form-control" type="file" id="foto" name="foto"
                                        accept=".jpg,.jpeg,.png,.webp">

                                    <small class="text-danger">
                                        * Tipe file .jpg, .jpeg, .png, .webp maksimal 2MB
                                    </small>
                                </div>
                                <div class="form-group">
                                    <h4 class="fw-bold mb-3">Deskripsi / Riwayat Pimpinan</h4>

                                    <div class="form-group">
                                        <label class="form-label">
                                            Riwayat Pendidikan, Organisasi, dan Informasi Lainnya
                                        </label>

                                        <textarea class="my-editor" id="my-editor" name="deskripsi">{{ old('deskripsi', $pimpinan->deskripsi ?? '') }}</textarea>
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
        const fotoPreview = document.getElementById("foto-preview");
        const fotoFile = document.getElementById("foto");

        fotoFile.addEventListener("change", function() {
            const foto = fotoFile.files[0];

            if (foto) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(foto);

                fileReader.addEventListener("load", function() {
                    fotoPreview.innerHTML =
                        '<img src="' + this.result +
                        '" style="max-width:200px; max-height:250px; object-fit:contain;">';
                });
            }
        });
    </script>
@endsection
