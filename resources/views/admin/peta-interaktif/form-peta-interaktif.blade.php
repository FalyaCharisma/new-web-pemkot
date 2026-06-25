@extends('admin.layouts.app')

@section('title', $titlepage ?? '')

@section('content')

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

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
                                    <input type="text" name="name" class="form-control"
                                        value="{{ $peta['name'] ?? '' }}" required>
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
                                        <option value="landing" {{ ($peta['menu'] ?? '') == 'landing' ? 'selected' : '' }}>
                                            Landing Page
                                        </option>
                                        <option value="pesona" {{ ($peta['menu'] ?? '') == 'pesona' ? 'selected' : '' }}>
                                            Pesona Kediri
                                        </option>
                                    </select>
                                </div>
                                <div class="row">

                                    <div class="col-md-6">
                                        <div class="form-group mb-3">
                                            <label>Jam Buka</label>
                                            <input type="time" name="jam_buka" class="form-control"
                                                value="{{ $peta['jam_buka'] ?? '' }}">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group mb-3">
                                            <label>Jam Tutup</label>
                                            <input type="time" name="jam_tutup" class="form-control"
                                                value="{{ $peta['jam_tutup'] ?? '' }}">
                                        </div>
                                    </div>

                                </div>

                                <div class="form-group mb-3">
                                    <label>Latitude</label>
                                    <input type="text" id="lat" name="lat" class="form-control"
                                        value="{{ $peta['lat'] ?? '' }}" required>
                                </div>

                                <div class="form-group mb-3">
                                    <label>Longitude</label>
                                    <input type="text" id="lng" name="lng" class="form-control"
                                        value="{{ $peta['lng'] ?? '' }}" required>
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
    <link rel="stylesheet"
href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css"/>
<script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
    <script>

let defaultLat = {{ $peta['lat'] ?? -7.8166 }};
let defaultLng = {{ $peta['lng'] ?? 112.0119 }};



const map = L.map('map')
.setView([defaultLat, defaultLng],13);



L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:'© OpenStreetMap'
}
).addTo(map);




let marker = L.marker(
    [defaultLat,defaultLng],
{
    draggable:true
}
)
.addTo(map);




document.getElementById('lat').value = defaultLat;
document.getElementById('lng').value = defaultLng;



/*
|--------------------------------------------------------------------------
| SEARCH LOCATION
|--------------------------------------------------------------------------
*/

L.Control.geocoder({

    defaultMarkGeocode:false,

    placeholder:'Cari lokasi...'

})

.on('markgeocode',function(e){


    const lat = e.geocode.center.lat;
    const lng = e.geocode.center.lng;



    map.setView([lat,lng],16);



    marker.setLatLng([lat,lng]);



    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;



})

.addTo(map);




/*
|--------------------------------------------------------------------------
| Klik Peta
|--------------------------------------------------------------------------
*/


map.on('click',function(e){


    let lat = e.latlng.lat;
    let lng = e.latlng.lng;


    marker.setLatLng([lat,lng]);


    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;


});




/*
|--------------------------------------------------------------------------
| Drag Marker
|--------------------------------------------------------------------------
*/


marker.on('dragend',function(){


    let pos = marker.getLatLng();


    document.getElementById('lat').value = pos.lat;
    document.getElementById('lng').value = pos.lng;


});


</script>

@endsection
