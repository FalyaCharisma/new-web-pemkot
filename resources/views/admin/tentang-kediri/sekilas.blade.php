@extends('admin.layouts.app')

@section('title', $titlepage)

@section('content')

    <div class="container">
        <div class="page-inner">

            <div class="page-header">

                <h3 class="fw-bold mb-3">
                    {{ $titlepage }}
                </h3>

            </div>


            <div class="card">

                <form method="POST" action="{{ route('update_sekilas_kota') }}" enctype="multipart/form-data">


                    @csrf


                    <div class="card-header">

                        <button type="submit" class="btn btn-secondary">

                            <i class="fa fa-paper-plane"></i>

                            Simpan

                        </button>

                    </div>



                    @include('admin.validation')


                    <div class="card-body">

                        <div class="card-body">

                            <div class="row">

                                <div class="col-md-4">

                                    <div class="form-group">

                                        <label class="form-label mb-2">Gambar Sekilas Kota</label>

                                        <div id="preview" class="mb-3 text-center">

                                            <img src="{{ $sekilas->gambar ? asset('storage/sekilas/' . $sekilas->gambar) : asset('assets/images/noimage.png') }}"
                                                class="img-fluid rounded shadow-sm" style="max-height:300px;">

                                        </div>

                                        <input type="file" class="form-control" name="gambar" id="gambar">

                                        <small class="text-danger">
                                            jpg, jpeg, png, webp maksimal 2 MB
                                        </small>

                                    </div>

                                </div>


                                <div class="col-md-8">

                                    <div class="form-group">

                                        <label class="form-label mb-2">
                                            Deskripsi Sekilas Kota Kediri
                                        </label>

                                        <textarea class="my-editor" id="my-editor" name="deskripsi">
{!! $sekilas->deskripsi !!}
</textarea>

                                    </div>

                                </div>


                            </div>

                        </div>


                    </div>

                </form>

            </div>


        </div>
    </div>
    <script>
        const input = document.getElementById('gambar');
        const preview = document.getElementById('preview');

        input.addEventListener('change', function() {

            const file = this.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = function() {

                preview.innerHTML = `
            <img
                src="${this.result}"
                class="img-fluid rounded shadow-sm"
                style="max-height:300px;"
            >
        `;

            }

            reader.readAsDataURL(file);

        });
    </script>
@endsection
