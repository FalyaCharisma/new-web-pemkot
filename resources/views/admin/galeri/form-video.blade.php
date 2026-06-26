@extends('admin.layouts.app')

@section('title', $titlepage)

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
                        <a href="#">
                            Featured Video
                        </a>
                    </li>


                    <li class="separator">
                        <i class="icon-arrow-right"></i>
                    </li>


                    <li class="nav-item">
                        <a href="#">
                            {{ $titlepage }}
                        </a>
                    </li>


                </ul>

            </div>




            <form action="{{ empty($video) ? route('store_video') : route('update_video') }}" method="POST">

                @csrf


                <input type="hidden" name="id" value="{{ $video->id ?? '' }}">



                <div class="row">


                    <div class="col-lg-12 mb-3">


                        <button type="button" class="btn btn-danger" onclick="window.history.back()">

                            <i class="fa fa-arrow-left me-2"></i>

                            Kembali


                        </button>





                        <button type="submit" class="btn btn-secondary">

                            <i class="fa fa-paper-plane me-2"></i>

                            Simpan


                        </button>



                    </div>




                    @include('admin.validation')






                    <div class="col-lg-12">


                        <div class="card">


                            <div class="card-body">




                                <div class="mb-3">


                                    <label>


                                        Judul Video


                                    </label>



                                    <input type="text" name="title" class="form-control"
                                        value="{{ $video->title ?? '' }}" required>


                                </div>





                                <div class="mb-3">


                                    <label>


                                        Deskripsi


                                    </label>




                                    <textarea name="description" rows="5" class="form-control">{{ $video->description ?? '' }}</textarea>



                                </div>





                                <div class="mb-3">


                                    <label>


                                        URL Youtube


                                    </label>




                                    <input type="text" name="video_url" class="form-control"
                                        placeholder="https://www.youtube.com/watch?v=xxxxx"
                                        value="{{ $video->video_url ?? '' }}" required>



                                    <small class="text-muted">


                                        Contoh :


                                        https://www.youtube.com/watch?v=xxxxx


                                    </small>



                                </div>





                                @if (!empty($video))
                                    <div class="mt-4">



                                        <label>


                                            Preview


                                        </label>



                                        <div class="ratio ratio-16x9">


                                            <iframe src="{{ str_replace('watch?v=', 'embed/', $video->video_url) }}"
                                                allowfullscreen>


                                            </iframe>



                                        </div>




                                    </div>
                                @endif




                            </div>


                        </div>


                    </div>



                </div>


            </form>



        </div>

    </div>

@endsection
