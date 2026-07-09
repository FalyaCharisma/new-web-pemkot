@extends('admin.layouts.app')

@section('title', $titlepage)

@section('content')
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
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
                                <input type="hidden" id="id" name="id"
                                    value="{{ empty($fasilitas) ? '' : $fasilitas['id'] }}">
                                <div class="form-group">
                                    <label><b>Kategori</b></label>
                                    <select class="form-select form-control-lg" id="kategori" name="kategori" required>
                                        <option value="">Pilih Kategori</option>
                                        @foreach ($kategori as $item)
                                            <option value="{{ $item->id }}"
                                                {{ !empty($fasilitas['kategori_id']) && $fasilitas['kategori_id'] == $item->id ? 'selected' : '' }}>
                                                {{ $item->nama_kategori }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label><b>Sub Kategori</b></label>
                                    <select class="form-select form-control-lg" id="sub_kategori" name="sub_kategori"
                                        required>
                                        <option value="">Pilih Sub Kategori</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="nama" class="form-label"><b>Nama Fasilitas</b></label>
                                    <input type="text" class="form-control input-full" id="nama" name="nama"
                                        value="{{ empty($fasilitas) ? '' : $fasilitas['nama'] }}" required>
                                </div>
                                <div class="form-group">
                                    <label><b>Alamat</b></label>

                                    <textarea id="alamat" name="alamat" class="form-control" rows="4">{{ old('alamat', $fasilitas['alamat'] ?? '') }}</textarea>

                                    <small class="text-muted">
                                        Alamat akan terisi otomatis setelah memilih lokasi di peta.
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="telp" class="form-label"><b>Telepon</b></label>
                                    <input type="text" class="form-control input-full" id="telp" name="telp"
                                        value="{{ empty($fasilitas) ? '' : $fasilitas['telp'] }}">
                                </div>
                                <div class="form-group">
                                    <label for="link" class="form-label"><b>Link Website</b></label>
                                    <input type="text" class="form-control input-full" id="link" name="link"
                                        value="{{ empty($fasilitas) ? '' : $fasilitas['link'] }}">
                                </div>
                                <div class="row">

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label><b>Jam Buka</b></label>
                                            <input type="time" class="form-control" name="jam_buka"
                                                value="{{ old('jam_buka', $fasilitas['jam_buka'] ?? '') }}">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label><b>Jam Tutup</b></label>
                                            <input type="time" class="form-control" name="jam_tutup"
                                                value="{{ old('jam_tutup', $fasilitas['jam_tutup'] ?? '') }}">
                                        </div>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <label for="deskripsi" class="mb-2 form-label">Deskripsi:</label>
                                    <textarea class="my-editor" id="my-editor" name="deskripsi">{{ $fasilitas == [] ? '' : $fasilitas['deskripsi'] }}</textarea>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mt-2">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group mt-4">
                                    <label><b>Pilih Titik Lokasi</b></label>

                                    <div id="map" style="height:420px; border-radius:10px; border:1px solid #ddd;">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label><b>Latitude</b></label>
                                            <input type="text" id="lat" name="lat" class="form-control"
                                                value="{{ old('lat', $fasilitas['lat'] ?? '') }}">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label><b>Longitude</b></label>
                                            <input type="text" id="lng" name="lng" class="form-control"
                                                value="{{ old('lng', $fasilitas['lng'] ?? '') }}">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div id="foto-preview" class="text-center">
                                        <img src="{{ empty($fasilitas) ? asset('assets/images/noimage.png') : asset('storage/fasilitas/' . $fasilitas['foto']) }}"
                                            width="30%">
                                    </div>
                                    <label for="gambar" class="form-label"><b>Gambar (Cover)</b></label>
                                    <input type="hidden" class="form-control" name="gambarlama" id="gambarlama"
                                        value="{{ empty($fasilitas) ? null : $fasilitas['foto'] }}" required />
                                    <input class="form-control" type="file" id="gambar" name="gambar"
                                        @if (empty($fasilitas)) required @endif />
                                    <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp
                                            dengan size max 2mb </i></p>
                                </div>
                                <div class="form-group">
                                    <label><b>Galeri Foto (Flickr)</b></label>
                                    <div id="foto-wrapper">

                                        @if (!empty($fasilitas) && $fasilitas->galeriFoto->count())

                                            @foreach ($fasilitas->galeriFoto as $item)
                                                <div class="row foto-item mb-2">

                                                    <div class="col-md-10">

                                                        <input type="text" class="form-control" name="foto[]"
                                                            value="{{ $item->url }}"
                                                            placeholder="https://live.staticflickr.com/...">

                                                    </div>

                                                    <div class="col-md-2">

                                                        <button type="button" class="btn btn-danger remove-foto">

                                                            Hapus

                                                        </button>

                                                    </div>

                                                </div>
                                            @endforeach
                                        @else
                                            <div class="row foto-item mb-2">

                                                <div class="col-md-10">

                                                    <input type="text" class="form-control" name="foto[]"
                                                        placeholder="https://live.staticflickr.com/...">

                                                </div>

                                                <div class="col-md-2">

                                                    <button type="button" class="btn btn-danger remove-foto">

                                                        Hapus

                                                    </button>

                                                </div>

                                            </div>

                                        @endif

                                    </div>
                                    <button type="button" id="add-foto" class="btn btn-primary btn-sm">
                                        + Tambah Foto
                                    </button>
                                </div>
                                <div class="form-group">
                                    <div id="video-wrapper">

                                        <label><b>Link Video</b></label>

                                        @if (!empty($fasilitas) && $fasilitas->galeriVideo->count())

                                            @foreach ($fasilitas->galeriVideo as $item)
                                                <div class="row video-item mb-2">

                                                    <div class="col-md-10">

                                                        <input type="text" class="form-control" name="video[]"
                                                            value="{{ $item->url }}"
                                                            placeholder="https://youtube.com/...">

                                                    </div>

                                                    <div class="col-md-2">

                                                        <button type="button" class="btn btn-danger remove-video">

                                                            Hapus

                                                        </button>

                                                    </div>

                                                </div>
                                            @endforeach
                                        @else
                                            <div class="row video-item mb-2">

                                                <div class="col-md-10">

                                                    <input type="text" class="form-control" name="video[]"
                                                        placeholder="https://youtube.com/...">

                                                </div>

                                                <div class="col-md-2">

                                                    <button type="button" class="btn btn-danger remove-video">

                                                        Hapus

                                                    </button>

                                                </div>

                                            </div>

                                        @endif

                                    </div>

                                    <button type="button" id="add-video" class="btn btn-primary btn-sm">

                                        + Tambah Video

                                    </button>
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

        fotoFile.addEventListener("change", function() {
            getImgData();
        });

        function getImgData() {
            const foto = fotoFile.files[0];
            if (foto) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(foto);
                fileReader.addEventListener("load", function() {
                    fotoPreview.style.display = "block";
                    fotoPreview.innerHTML = '<img src="' + this.result + '" style="width:30%;"/>';
                });
            }
        }
    </script>

    <script>
        $(document).ready(function() {

            function loadSubKategori(kategoriId, selected = null) {

                if (!kategoriId) {
                    $('#sub_kategori').html('<option value="">Pilih Sub Kategori</option>');
                    return;
                }

                $.ajax({
                    url: "{{ route('get_sub_kategori') }}",
                    type: "GET",
                    data: {
                        kategori: kategoriId
                    },
                    success: function(response) {

                        let html = '<option value="">Pilih Sub Kategori</option>';

                        $.each(response, function(i, item) {

                            html += `<option value="${item.id}"
                        ${selected == item.id ? 'selected' : ''}>
                        ${item.nama_sub}
                    </option>`;
                        });

                        $('#sub_kategori').html(html);
                    }
                });

            }

            // Saat kategori berubah
            $('#kategori').on('change', function() {
                loadSubKategori($(this).val());
            });

            // Saat halaman edit dibuka
            @if (!empty($fasilitas['kategori_id']))
                loadSubKategori(
                    "{{ $fasilitas['kategori_id'] }}",
                    "{{ $fasilitas['sub_kategori_id'] }}"
                );
            @endif

        });
    </script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>

    <script>
        const hasLocation =
            "{{ $fasilitas['lat'] ?? '' }}" !== "" &&
            "{{ $fasilitas['lng'] ?? '' }}" !== "";

        const defaultLat = hasLocation ?
            Number("{{ $fasilitas['lat'] ?? '' }}") :
            -7.8166;

        const defaultLng = hasLocation ?
            Number("{{ $fasilitas['lng'] ?? '' }}") :
            112.0119;

        const map = L.map('map').setView([defaultLat, defaultLng], 13);

        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap'
            }
        ).addTo(map);

        let marker = null;

        // Jika edit dan sudah ada lokasi, tampilkan marker
        if (hasLocation) {
            marker = L.marker([defaultLat, defaultLng], {
                draggable: true
            }).addTo(map);

            marker.on('dragend', updatePosition);

            document.getElementById('lat').value = defaultLat;
            document.getElementById('lng').value = defaultLng;
        }
        if (document.getElementById('alamat').value === "") {

            getAddress(
                defaultLat,
                defaultLng
            );

        }

        function updateMarker(lat, lng) {

            if (!marker) {
                marker = L.marker([lat, lng], {
                    draggable: true
                }).addTo(map);

                marker.on('dragend', updatePosition);
            } else {
                marker.setLatLng([lat, lng]);
            }

            document.getElementById('lat').value = lat;
            document.getElementById('lng').value = lng;
        }

        function updatePosition() {

            const pos = marker.getLatLng();

            document.getElementById('lat').value = pos.lat;
            document.getElementById('lng').value = pos.lng;

            getAddress(
                pos.lat,
                pos.lng
            );

        }

        function getAddress(lat, lng) {

            fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
                )
                .then(response => response.json())
                .then(data => {

                    if (data.display_name) {

                        document.getElementById('alamat').value = data.display_name;

                    }

                })
                .catch(error => {

                    console.log(error);

                });

        }

        // Search lokasi
        L.Control.geocoder({
                defaultMarkGeocode: false,
                placeholder: 'Cari lokasi...'
            })
            .on('markgeocode', function(e) {

                const lat = e.geocode.center.lat;
                const lng = e.geocode.center.lng;

                map.setView([lat, lng], 16);

                updateMarker(lat, lng);

                getAddress(lat, lng);

            })
            .addTo(map);

        // Klik peta
        map.on('click', function(e) {

            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            updateMarker(lat, lng);

            getAddress(lat, lng);

        });
    </script>
    <script>
        $('#add-foto').click(function() {

            $('#foto-wrapper').append(`

        <div class="row foto-item mb-2">

            <div class="col-md-10">

                <input
                    type="text"
                    name="foto[]"
                    class="form-control"
                    placeholder="https://live.staticflickr.com/...">

            </div>

            <div class="col-md-2">

                <button
                    type="button"
                    class="btn btn-danger remove-foto">

                    Hapus

                </button>

            </div>

        </div>

    `);

        });

        $(document).on('click', '.remove-foto', function() {

            $(this).closest('.foto-item').remove();

        });
        $('#add-video').click(function() {

            $('#video-wrapper').append(`

        <div class="row video-item mb-2">

            <div class="col-md-10">

                <input
                    type="text"
                    name="video[]"
                    class="form-control"
                    placeholder="https://youtube.com/...">

            </div>

            <div class="col-md-2">

                <button
                    type="button"
                    class="btn btn-danger remove-video">

                    Hapus

                </button>

            </div>

        </div>

    `);

        });

        $(document).on('click', '.remove-video', function() {

            $(this).closest('.video-item').remove();

        });
    </script>
@endsection
