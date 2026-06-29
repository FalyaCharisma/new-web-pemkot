@extends('admin.layouts.app')

@section('title', 'Pesona Unggulan')

@section('content')

<div class="container">
    <div class="page-inner">

        <div class="page-header">
            <h3 class="fw-bold mb-3">Pesona Unggulan</h3>

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
                    <a href="#">Pesona Unggulan</a>
                </li>
            </ul>
        </div>

        <div class="row">

            <div class="col-md-12">

                <div class="card">

                    <div class="card-header">

                        <h4 class="card-title">
                            List Pesona Unggulan
                        </h4>

                        <div class="d-flex justify-content-end mt-3">
                            <div class="me-4">
                                <button
                                    type="button"
                                    class="btn btn-warning"
                                    onclick="location.href='/form-highlight-pesona'">

                                    <i class="fa fa-star me-2"></i>
                                    Ubah Highlight

                                </button>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    onclick="location.href='/form-pesona-unggulan/add'">

                                    <i class="fa fa-plus me-2"></i>
                                    Tambah Data

                                </button>
                            </div>

                        </div>

                    </div>

                    <div class="card-body">

                        <div class="table-responsive">

                            <table class="table table-bordered">

                                <thead>

                                    <tr>

                                        <th width="5%">No.</th>

                                        <th width="15%">Cover</th>

                                        <th>Judul</th>

                                        <th width="15%">Kategori</th>

                                        <th width="10%">Views</th>

                                        <th width="15%">Action</th>

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

@endsection


@push('datatable')

<script>

$(function () {

    $('.table-bordered').DataTable({

        responsive: true,

        scrollX: true,

        processing: true,

        serverSide: true,

        autoWidth: false,

        ajax: "{{ route('list_pesona_unggulan') }}",

        columns: [

            {
                data: 'DT_RowIndex',
                name: 'DT_RowIndex',
                className: 'text-center'
            },

            {
                data: 'cover',
                name: 'cover',
                className: 'text-center',
                orderable: false,
                searchable: false
            },

            {
                data: 'judul',
                name: 'judul'
            },

            {
                data: 'kategori',
                name: 'kategori',
                className: 'text-center'
            },

            {
                data: 'views',
                name: 'views',
                className: 'text-center'
            },

            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false,
                className: 'text-center'
            },

        ],

        initComplete: function () {

            $('.table-bordered').css('width', '100%');

        }

    });

});

</script>

@endpush


<script>

function deletePesonaConfirmation(id) {

    Swal.fire({

        title: 'Yakin ingin menghapus data ini?',

        text: "",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Ya, Hapus",

        cancelButtonText: "Batal",

        confirmButtonColor: "#3085d6",

        cancelButtonColor: "#d33"

    }).then((result) => {

        if (result.isConfirmed) {

            var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

            $.ajax({

                type: 'POST',

                url: "{{ url('/hapus-pesona-unggulan') }}/" + id,

                data: {

                    _token: CSRF_TOKEN

                },

                dataType: 'JSON',

                success: function (results) {

                    if (results.success === true) {

                        Swal.fire(

                            "Berhasil!",

                            results.message,

                            "success"

                        );

                        setTimeout(function () {

                            location.reload();

                        }, 1000);

                    } else {

                        Swal.fire(

                            "Error!",

                            results.message,

                            "error"

                        );

                    }

                }

            });

        }

    });

}

</script>