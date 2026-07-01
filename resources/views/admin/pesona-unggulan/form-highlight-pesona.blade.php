@extends('admin.layouts.app')

@section('title', 'Pesona Unggulan')

@section('content')

<div class="container">
    <div class="page-inner">
        <div class="page-header">

            <h3 class="fw-bold mb-3">
                {{ $titlepage }}
            </h3>

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
                    <a href="#">Highlight Pesona</a>
                </li>

            </ul>

        </div>
        <form action="{{ route('update_highlight_pesona') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <input type="hidden" name="id" value="{{ $highlight->id ?? '' }}">
            <div class="row">
                <div class="col-lg-12 mb-3">

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
                <!-- LEFT -->
                <div class="col-md-7">

                    <div class="card">

                        <div class="card-header">
                            <h5>Informasi Highlight</h5>
                        </div>

                        <div class="card-body">
                            
                            <div class="form-group">
                                <label>Kategori</label>
                                <select class="form-control select2" name="kategori_label">
                                    <option value="">Pilih Kategori</option>
                                    @foreach($kategori as $item)
                                        <option
                                            value="{{ $item->id }}"
                                            {{ old('kategori_label', $highlight->kategori_label ?? '') == $item->id ? 'selected' : '' }}>

                                            {{ $item->nama_kategori }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="form-group">

                                <label>Judul</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="judul"
                                    value="{{ $highlight->judul ?? '' }}">

                            </div>

                            <div class="form-group">

                                <label>Deskripsi</label>

                                <textarea
                                    rows="3"
                                    class="form-control"
                                    name="deskripsi">{!! $highlight->deskripsi ?? '' !!}</textarea>

                            </div>

                            <hr>

                            <h5 class="mb-3">Highlight Card 1</h5>

                            <div class="form-group">
                                <label>Icon Lucide</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="highlight1_icon"
                                    placeholder="Contoh: Barrel, Sparkles, UtensilsCrossed"
                                    value="{{ old('highlight1_icon', $highlight->highlight1_icon ?? '') }}">

                                <small class="text-muted">
                                    Pilih nama icon dari
                                    <a
                                        href="https://lucide.dev/icons/"
                                        target="_blank">
                                        Lucide Icons
                                    </a>.
                                    Contoh: <b>Barrel</b>, <b>Sparkles</b>, <b>UtensilsCrossed</b>, <b>MapPin</b>, <b>Camera</b>.
                                </small>

                            </div>

                            <div class="form-group">

                                <label>Judul</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="highlight1_judul"
                                    value="{{ $highlight->highlight1_judul ?? '' }}">

                            </div>

                            <div class="form-group">

                                <label>Deskripsi</label>

                                <textarea
                                    rows="3"
                                    class="form-control"
                                    name="highlight1_deskripsi">{{ $highlight->highlight1_deskripsi ?? '' }}</textarea>

                            </div>

                            <hr>

                            <h5 class="mb-3">Highlight Card 2</h5>

                            <div class="form-group">
                                <label>Icon Lucide</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="highlight2_icon"
                                    placeholder="Contoh: MapPin"
                                    value="{{ old('highlight2_icon', $highlight->highlight2_icon ?? '') }}">
                                
                                <small class="text-muted">
                                    Pilih nama icon dari
                                    <a
                                        href="https://lucide.dev/icons/"
                                        target="_blank">
                                        Lucide Icons
                                    </a>.
                                    Contoh: <b>Barrel</b>, <b>Sparkles</b>, <b>UtensilsCrossed</b>, <b>MapPin</b>, <b>Camera</b>.
                                </small>


                            </div>

                            <div class="form-group">

                                <label>Judul</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="highlight2_judul"
                                    value="{{ $highlight->highlight2_judul ?? '' }}">

                            </div>

                            <div class="form-group">

                                <label>Deskripsi</label>

                                <textarea
                                    rows="3"
                                    class="form-control"
                                    name="highlight2_deskripsi">{{ $highlight->highlight2_deskripsi ?? '' }}</textarea>

                            </div>

                            <hr>

                            <h5 class="mb-3">Highlight Card 3</h5>

                            <div class="form-group">

                                <label>Icon Lucide</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="highlight3_icon"
                                    placeholder="Contoh: Camera"
                                    value="{{ old('highlight3_icon', $highlight->highlight3_icon ?? '') }}">
                                
                                <small class="text-muted">
                                    Pilih nama icon dari
                                    <a
                                        href="https://lucide.dev/icons/"
                                        target="_blank">
                                        Lucide Icons
                                    </a>.
                                    Contoh: <b>Barrel</b>, <b>Sparkles</b>, <b>UtensilsCrossed</b>, <b>MapPin</b>, <b>Camera</b>.
                                </small>


                            </div>

                            <div class="form-group">

                                <label>Judul</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="highlight3_judul"
                                    value="{{ $highlight->highlight3_judul ?? '' }}">

                            </div>

                            <div class="form-group">

                                <label>Deskripsi</label>

                                <textarea
                                    rows="3"
                                    class="form-control"
                                    name="highlight3_deskripsi">{{ $highlight->highlight3_deskripsi ?? '' }}</textarea>

                            </div>

                        </div>

                    </div>

                </div>
                <!-- RIGHT -->
                <div class="col-md-5">

                    <!-- GALERI -->
                    <div class="card mb-3">

                        <div class="card-header">
                            <h5>Galeri Highlight</h5>
                        </div>

                        <div class="card-body">

                            <div
                                id="images-preview"
                                class="row">

                                @if(!empty($highlight) && !empty($highlight->images))

                                    @foreach($highlight->images as $image)

                                        <div class="col-6 mb-3">

                                            <img
                                                src="{{ asset('storage/pesona/'.$image) }}"
                                                class="img-fluid rounded shadow">

                                        </div>

                                    @endforeach

                                @else

                                    <div class="col-12">

                                        <img
                                            src="{{ asset('assets/images/noimage.png') }}"
                                            class="img-fluid rounded">

                                    </div>

                                @endif

                            </div>

                            <div class="form-group mt-3">

                                <label>Upload Gambar</label>

                                <input
                                    type="file"
                                    name="images[]"
                                    id="images"
                                    multiple
                                    class="form-control">

                                <small class="text-danger">

                                    Maksimal 9 gambar (jpg, jpeg, png, webp)

                                </small>

                            </div>

                        </div>

                    </div>

                    <!-- CTA -->
                    <div class="card">

                        <div class="card-header">

                            <h5>Call To Action</h5>

                        </div>

                        <div class="card-body">

                            <div class="form-group">

                                <label>Judul CTA</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="cta_judul"
                                    value="{{ $highlight->cta_judul ?? '' }}">

                            </div>

                            <div class="form-group">

                                <label>Deskripsi CTA</label>

                                <textarea
                                    rows="4"
                                    class="form-control"
                                    name="cta_deskripsi">{{ $highlight->cta_deskripsi ?? '' }}</textarea>

                            </div>

                            <div class="form-group">

                                <label>Teks Tombol</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="cta_button"
                                    value="{{ $highlight->cta_button ?? '' }}">

                            </div>

                            <div class="form-group">

                                <label>Keyword Pencarian</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="cta_keyword"
                                    placeholder="Contoh : Nasi Pecel"
                                    value="{{ $highlight->cta_keyword ?? '' }}">

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </form>
    </div>
</div>

<script>

const input = document.getElementById('images');
const preview = document.getElementById('images-preview');

input.addEventListener('change', function () {

    if(this.files.length > 9){

        Swal.fire({
            icon:'warning',
            title:'Oops...',
            text:'Maksimal hanya boleh upload 9 gambar.'
        });

        this.value = "";
        preview.innerHTML = "";

        return;
    }

    preview.innerHTML = "";

    [...this.files].forEach(file => {

        const reader = new FileReader();

        reader.onload = function(e){

            preview.innerHTML += `
                <div class="col-md-6 mb-3">
                    <img
                        src="${e.target.result}"
                        class="img-fluid rounded shadow"
                        style="height:170px;width:100%;object-fit:cover;">
                </div>
            `;

        }

        reader.readAsDataURL(file);

    });

});

</script>
@endsection