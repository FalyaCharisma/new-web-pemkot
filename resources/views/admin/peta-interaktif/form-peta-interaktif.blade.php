@extends('admin.layouts.app')

@section('title', $titlepage ?? '')

@section('content')

<link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>

<div class="container">
    <div class="page-inner">

        <div class="page-header">
            <h3 class="fw-bold mb-3">{{ $titlepage ?? '' }}</h3>
        </div>

        <form action="{{ route('update_peta_interaktif') }}" method="POST">
            @csrf

            <input type="hidden" name="id" value="{{ $peta['id'] ?? '' }}">

            <div class="card">

                <div class="card-header d-flex gap-2">
                    <button type="button" class="btn btn-danger" onclick="window.history.back()">
                        Kembali
                    </button>

                    <button type="submit" class="btn btn-primary">
                        Simpan
                    </button>
                </div>

                <div class="card-body">
                    <div class="row">

                        {{-- LEFT --}}
                        <div class="col-md-6">

                            <div class="form-group mb-3">
                                <label>Nama Lokasi</label>
                                <input type="text"
                                       name="name"
                                       class="form-control"
                                       value="{{ $peta['name'] ?? '' }}"
                                       required>
                            </div>

                            <div class="form-group mb-3">
                                <label>Kategori</label>

                                <select name="category" class="form-control" required>
                                    <option value="">-- Pilih Kategori --</option>

                                    @foreach ($kategori as $item)
                                        <option value="{{ $item->nama_kategori }}"
                                            {{ ($peta['category'] ?? '') == $item->nama_kategori ? 'selected' : '' }}>
                                            {{ $item->nama_kategori }}
                                        </option>
                                    @endforeach

                                </select>
                            </div>

                            <div class="form-group mb-3">
                                <label>Menu</label>
                                <select name="menu" class="form-control" required>
                                    <option value="landing"
                                        {{ ($peta['menu'] ?? '') == 'landing' ? 'selected' : '' }}>
                                        Landing Page
                                    </option>
                                    <option value="pesona"
                                        {{ ($peta['menu'] ?? '') == 'pesona' ? 'selected' : '' }}>
                                        Pesona Kediri
                                    </option>
                                </select>
                            </div>

                            <div class="form-group mb-3">
                                <label>Latitude</label>
                                <input type="text"
                                       id="lat"
                                       name="lat"
                                       class="form-control"
                                       value="{{ $peta['lat'] ?? '' }}"
                                       required>
                            </div>

                            <div class="form-group mb-3">
                                <label>Longitude</label>
                                <input type="text"
                                       id="lng"
                                       name="lng"
                                       class="form-control"
                                       value="{{ $peta['lng'] ?? '' }}"
                                       required>
                            </div>

                        </div>

                        {{-- RIGHT --}}
                        <div class="col-md-6">

                            <div class="form-group mb-3">
                                <label>Deskripsi</label>
                                <textarea name="desc" class="form-control" rows="4">{{ $peta['desc'] ?? '' }}</textarea>
                            </div>

                            <div class="form-group mt-3">
                                <label>Pilih Lokasi di Peta</label>
                                <div id="map" style="height: 420px; border-radius: 12px;"></div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </form>

    </div>
</div>

{{-- LEAFLET JS --}}
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
    // default posisi (Kediri)
    let defaultLat = {{ $peta['lat'] ?? -7.8166 }};
    let defaultLng = {{ $peta['lng'] ?? 112.0119 }};

    let map = L.map('map').setView([defaultLat, defaultLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    let marker = L.marker([defaultLat, defaultLng], {
        draggable: true
    }).addTo(map);

    // set awal input
    document.getElementById('lat').value = defaultLat;
    document.getElementById('lng').value = defaultLng;

    // klik map
    map.on('click', function(e) {
        let lat = e.latlng.lat;
        let lng = e.latlng.lng;

        marker.setLatLng([lat, lng]);

        document.getElementById('lat').value = lat;
        document.getElementById('lng').value = lng;
    });

    // drag marker
    marker.on('dragend', function() {
        let pos = marker.getLatLng();

        document.getElementById('lat').value = pos.lat;
        document.getElementById('lng').value = pos.lng;
    });
</script>

@endsection