@extends('admin.layouts.app')

@section('title', 'Budaya & Warisan')

@section('content')

<div class="container">

    <div class="page-inner">

        <!-- PAGE HEADER -->
        <div class="page-header">

            <h3 class="fw-bold mb-3">
                Budaya & Warisan
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
                        Budaya & Warisan
                    </a>
                </li>

            </ul>

        </div>


        <!-- CARD -->
        <div class="row">

            <div class="col-md-12">

                <div class="card">

                    <!-- CARD HEADER -->
                    <div class="card-header ps-5 pe-5">

                        <div class="d-flex justify-content-end">

                            <button type="button"
                                class="btn btn-secondary"
                                onclick="tambahBudayaWarisan()">

                                <span class="btn-label">
                                    <i class="fa fa-plus"></i>
                                </span>

                                Tambah Budaya & Warisan

                            </button>

                        </div>

                    </div>


                    <!-- CARD BODY -->
                    <div class="card-body">

                        <div class="table-responsive">

                            <table class="table table-bordered">

                                <thead>

                                    <tr>

                                        <th>No.</th>

                                        <th>Gambar</th>

                                        <th>Tag</th>

                                        <th>Judul</th>

                                        <th>Kategori</th>

                                        <th>Urutan</th>

                                        <th>Status</th>

                                        <th>Action</th>

                                    </tr>

                                </thead>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>


<!-- ========================================================= -->
<!-- MODAL TAMBAH / EDIT -->
<!-- ========================================================= -->

<div class="modal fade"
    id="modalBudayaWarisan"
    tabindex="-1"
    aria-hidden="true">

    <div class="modal-dialog modal-lg">

        <div class="modal-content">


            <!-- MODAL HEADER -->
            <div class="modal-header">

                <h5 class="modal-title"
                    id="modalBudayaWarisanTitle">

                    Tambah Budaya & Warisan

                </h5>

                <button type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close">
                </button>

            </div>


            <!-- FORM -->
            <form action="{{ route('update_budaya_warisan') }}"
                method="POST"
                enctype="multipart/form-data"
                id="formBudayaWarisan">

                @csrf

                <input type="hidden"
                    name="id"
                    id="id">


                <div class="modal-body">


                    <!-- PREVIEW GAMBAR -->
                    <div class="text-center mb-4">

                        <div id="gambar-preview"></div>

                    </div>


                    <!-- GAMBAR -->
                    <div class="form-group mb-3">

                        <label class="form-label">
                            Gambar
                        </label>

                        <input type="file"
                            class="form-control"
                            name="gambar"
                            id="gambar"
                            accept=".jpg,.jpeg,.png,.webp">

                        <p class="text-danger mt-1">

                            <i>
                                * Tipe file .jpg .jpeg .png .webp
                                dengan ukuran maksimal 8MB
                            </i>

                        </p>

                    </div>


                    <!-- KATEGORI -->
                    <div class="form-group mb-3">

                        <label class="form-label">
                            Kategori
                        </label>

                        <select class="form-control"
                            name="kategori_id"
                            id="kategori_id"
                            required>

                            <option value=""
                                selected
                                disabled>

                                Pilih Kategori

                            </option>

                            @foreach ($kategori as $item)

                                <option value="{{ $item->id }}">

                                    {{ $item->nama_kategori }}

                                </option>

                            @endforeach

                        </select>

                    </div>


                    <!-- TAG -->
                    <div class="form-group mb-3">

                        <label class="form-label">
                            Tag
                        </label>

                        <input type="text"
                            class="form-control"
                            name="tag"
                            id="tag"
                            placeholder="Contoh: Seni Pertunjukan">

                    </div>


                    <!-- JUDUL -->
                    <div class="form-group mb-3">

                        <label class="form-label">
                            Judul
                        </label>

                        <input type="text"
                            class="form-control"
                            name="judul"
                            id="judul"
                            placeholder="Contoh: Kesenian Tradisional"
                            required>

                    </div>


                    <!-- DESKRIPSI -->
                    <div class="form-group mb-3">

                        <label class="form-label">
                            Deskripsi
                        </label>

                        <textarea class="form-control"
                            name="deskripsi"
                            id="deskripsi"
                            rows="4"
                            placeholder="Masukkan deskripsi..."></textarea>

                    </div>


                    <!-- URUTAN & STATUS -->
                    <div class="row">


                        <!-- URUTAN -->
                        <div class="col-md-6">

                            <div class="form-group mb-3">

                                <label class="form-label">
                                    Urutan
                                </label>

                                <input type="number"
                                    class="form-control"
                                    name="urutan"
                                    id="urutan"
                                    value="0"
                                    min="0">

                            </div>

                        </div>


                        <!-- STATUS -->
                        <div class="col-md-6">

                            <div class="form-group mb-3">

                                <label class="form-label">
                                    Status
                                </label>

                                <select class="form-control"
                                    name="status"
                                    id="status">

                                    <option value="1">
                                        Aktif
                                    </option>

                                    <option value="0">
                                        Nonaktif
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>


                </div>


                <!-- MODAL FOOTER -->
                <div class="modal-footer">

                    <button type="submit"
                        class="btn btn-secondary">

                        <i class="fa fa-paper-plane"></i>

                        Simpan

                    </button>

                    <button type="button"
                        class="btn btn-danger"
                        data-bs-dismiss="modal">

                        Tutup

                    </button>

                </div>

            </form>

        </div>

    </div>

</div>


<!-- ========================================================= -->
<!-- TAMBAH -->
<!-- ========================================================= -->

<script>

    function tambahBudayaWarisan()
    {
        /*
        |--------------------------------------------------------------------------
        | Reset Form
        |--------------------------------------------------------------------------
        */

        $('#formBudayaWarisan')[0].reset();

        $('#id').val('');

        $('#status').val('1');

        $('#urutan').val('0');

        $('#gambar-preview').html('');

        $('#modalBudayaWarisanTitle').text(
            'Tambah Budaya & Warisan'
        );


        /*
        |--------------------------------------------------------------------------
        | Tampilkan Modal
        |--------------------------------------------------------------------------
        */

        var modal =
            new bootstrap.Modal(
                document.getElementById(
                    'modalBudayaWarisan'
                )
            );

        modal.show();
    }

</script>


<!-- ========================================================= -->
<!-- EDIT -->
<!-- ========================================================= -->

<script>

    function editBudayaWarisan(id)
    {

        $.ajax({

            type: 'GET',

            url:
                "{{ url('/value-budaya-warisan') }}/" +
                id,

            dataType: 'JSON',

            success: function(results)
            {

                if (results.success === true)
                {

                    var data =
                        results.data;


                    /*
                    |--------------------------------------------------------------------------
                    | Isi Form
                    |--------------------------------------------------------------------------
                    */

                    $('#id').val(
                        data.id
                    );

                    $('#kategori_id').val(
                        data.kategori_id
                    );

                    $('#tag').val(
                        data.tag
                    );

                    $('#judul').val(
                        data.judul
                    );

                    $('#deskripsi').val(
                        data.deskripsi
                    );

                    $('#urutan').val(
                        data.urutan
                    );

                    $('#status').val(
                        data.status ? '1' : '0'
                    );


                    /*
                    |--------------------------------------------------------------------------
                    | Preview Gambar
                    |--------------------------------------------------------------------------
                    */

                    if (data.gambar)
                    {

                        $('#gambar-preview').html(

                            '<img src="{{ asset("storage") }}/' +
                            data.gambar +
                            '" ' +
                            'class="img-thumbnail" ' +
                            'style="width:40%;">'

                        );

                    }
                    else
                    {

                        $('#gambar-preview').html('');

                    }


                    /*
                    |--------------------------------------------------------------------------
                    | Reset Input File
                    |--------------------------------------------------------------------------
                    */

                    $('#gambar').val('');


                    /*
                    |--------------------------------------------------------------------------
                    | Ubah Judul Modal
                    |--------------------------------------------------------------------------
                    */

                    $('#modalBudayaWarisanTitle').text(
                        'Edit Budaya & Warisan'
                    );


                    /*
                    |--------------------------------------------------------------------------
                    | Tampilkan Modal
                    |--------------------------------------------------------------------------
                    */

                    var modal =
                        new bootstrap.Modal(
                            document.getElementById(
                                'modalBudayaWarisan'
                            )
                        );

                    modal.show();

                }
                else
                {

                    Swal.fire(
                        'Error!',
                        results.message,
                        'error'
                    );

                }

            },

            error: function()
            {

                Swal.fire(
                    'Error!',
                    'Data gagal dimuat.',
                    'error'
                );

            }

        });

    }

</script>


<!-- ========================================================= -->
<!-- PREVIEW GAMBAR -->
<!-- ========================================================= -->

<script>

    const gambarPreview =
        document.getElementById(
            'gambar-preview'
        );

    const gambarFile =
        document.getElementById(
            'gambar'
        );


    gambarFile.addEventListener(
        'change',
        function()
        {

            const file =
                gambarFile.files[0];


            if (file)
            {

                const fileReader =
                    new FileReader();


                fileReader.readAsDataURL(
                    file
                );


                fileReader.addEventListener(
                    'load',
                    function()
                    {

                        gambarPreview.style.display =
                            'block';


                        gambarPreview.innerHTML =

                            '<img src="' +
                            this.result +
                            '" ' +
                            'style="width:40%;" ' +
                            'class="img-thumbnail">';

                    }
                );

            }

        }
    );

</script>


<!-- ========================================================= -->
<!-- DATATABLE -->
<!-- ========================================================= -->

@push('datatable')

    <script type="text/javascript">

        $(function()
        {

            var table =
                $('.table-bordered').DataTable({

                    responsive: true,

                    scrollX: true,

                    processing: true,

                    serverSide: true,

                    autoWidth: false,


                    ajax:
                        "{{ route('list_budaya_warisan') }}",


                    columns:
                    [

                        {
                            data:
                                'DT_RowIndex',

                            name:
                                'DT_RowIndex',

                            className:
                                'text-center'
                        },


                        {
                            data:
                                'gambar',

                            name:
                                'gambar',

                            className:
                                'text-center'
                        },


                        {
                            data:
                                'tag',

                            name:
                                'tag',

                            className:
                                'text-center'
                        },


                        {
                            data:
                                'judul',

                            name:
                                'judul',

                            className:
                                'text-center'
                        },


                        {
                            data:
                                'kategori',

                            name:
                                'kategori',

                            className:
                                'text-center'
                        },


                        {
                            data:
                                'urutan',

                            name:
                                'urutan',

                            className:
                                'text-center'
                        },


                        {
                            data:
                                'status',

                            name:
                                'status',

                            className:
                                'text-center'
                        },


                        {
                            data:
                                'action',

                            name:
                                'action',

                            orderable:
                                false,

                            searchable:
                                false,

                            className:
                                'text-center'
                        }

                    ],


                    initComplete:
                        function()
                        {

                            $('.table-bordered').css(
                                'width',
                                '100%'
                            );

                        }

                });

        });

    </script>

@endpush


<!-- ========================================================= -->
<!-- DELETE -->
<!-- ========================================================= -->

<script>

    function deleteBudayaWarisanConfirmation(id)
    {

        Swal.fire({

            title:
                'Yakin ingin menghapus data ini?',

            confirmButtonText:
                'Ya, Hapus',

            text:
                '',

            icon:
                'warning',

            showCancelButton:
                true,

            confirmButtonColor:
                '#3085d6',

            cancelButtonColor:
                '#d33',

            cancelButtonText:
                'Batal'

        }).then((result) =>
        {

            if (result.isConfirmed)
            {

                var CSRF_TOKEN =
                    $('meta[name="csrf-token"]')
                    .attr('content');


                $.ajax({

                    type:
                        'POST',

                    url:
                        "{{ url('/hapus-budaya-warisan') }}/" +
                        id,

                    data:
                    {
                        _token:
                            CSRF_TOKEN
                    },

                    dataType:
                        'JSON',


                    success:
                        function(results)
                        {

                            if (
                                results.success === true
                            )
                            {

                                Swal.fire(
                                    'Done!',
                                    results.message,
                                    'success'
                                );


                                setTimeout(
                                    function()
                                    {

                                        location.reload();

                                    },
                                    1500
                                );

                            }
                            else
                            {

                                Swal.fire(
                                    'Error!',
                                    results.message,
                                    'error'
                                );

                            }

                        },


                    error:
                        function()
                        {

                            Swal.fire(
                                'Error!',
                                'Terjadi kesalahan saat menghapus data.',
                                'error'
                            );

                        }

                });

            }

        });

    }

</script>

@endsection
