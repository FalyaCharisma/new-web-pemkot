@extends('admin.layouts.app')

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

        <form action="{{ route('update_highlight_pesona') }}" method="POST">

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

                                <label>Badge / Kategori</label>

                                <input
                                    type="text"
                                    class="form-control"
                                    name="kategori_label"
                                    placeholder="Contoh : KULINER KHAS"
                                    value="{{ $highlight->kategori_label ?? '' }}">

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

                                <label>Icon</label>

                                <select
                                    class="form-control"
                                    name="highlight1_icon">

                                    <option value="barrel" {{ ($highlight->highlight1_icon ?? '')=='barrel' ? 'selected':'' }}>Barrel</option>

                                    <option value="sparkles" {{ ($highlight->highlight1_icon ?? '')=='sparkles' ? 'selected':'' }}>Sparkles</option>

                                    <option value="utensils" {{ ($highlight->highlight1_icon ?? '')=='utensils' ? 'selected':'' }}>Utensils</option>

                                </select>

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

                                <label>Icon</label>

                                <select
                                    class="form-control"
                                    name="highlight2_icon">

                                    <option value="barrel" {{ ($highlight->highlight2_icon ?? '')=='barrel' ? 'selected':'' }}>Barrel</option>

                                    <option value="sparkles" {{ ($highlight->highlight2_icon ?? '')=='sparkles' ? 'selected':'' }}>Sparkles</option>

                                    <option value="utensils" {{ ($highlight->highlight2_icon ?? '')=='utensils' ? 'selected':'' }}>Utensils</option>

                                </select>

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

                                <label>Icon</label>

                                <select
                                    class="form-control"
                                    name="highlight3_icon">

                                    <option value="barrel" {{ ($highlight->highlight3_icon ?? '')=='barrel' ? 'selected':'' }}>Barrel</option>

                                    <option value="sparkles" {{ ($highlight->highlight3_icon ?? '')=='sparkles' ? 'selected':'' }}>Sparkles</option>

                                    <option value="utensils" {{ ($highlight->highlight3_icon ?? '')=='utensils' ? 'selected':'' }}>Utensils</option>

                                </select>

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

                                <label>Kategori Fasilitas</label>

                                <select
                                    class="form-control"
                                    name="cta_kategori">

                                    <option value="1" {{ ($highlight->cta_kategori ?? '')==1 ? 'selected':'' }}>Wisata</option>

                                    <option value="2" {{ ($highlight->cta_kategori ?? '')==2 ? 'selected':'' }}>Hotel</option>

                                    <option value="3" {{ ($highlight->cta_kategori ?? '')==3 ? 'selected':'' }}>Transportasi</option>

                                    <option value="4" {{ ($highlight->cta_kategori ?? '')==4 ? 'selected':'' }}>Kuliner</option>

                                </select>

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

@endsection