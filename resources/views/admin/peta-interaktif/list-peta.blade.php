@extends('admin.layouts.app')

@section('title', empty($titlepage) ? '' : $titlepage)

@section('content')

<div class="container">
    <div class="page-inner">

        <div class="page-header">
            <h3 class="fw-bold mb-3">{{ empty($titlepage) ? '' : $titlepage }}</h3>

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
                    <a href="#">{{ empty($titlepage) ? '' : $titlepage }}</a>
                </li>
            </ul>
        </div>

        <div class="row">
            <div class="col-md-12">

                <div class="card">

                    <div class="card-header">
                        <div class="d-flex justify-content-start mt-3">

                            <div>
                                <button type="button"
                                    class="btn btn-secondary"
                                    onclick="location.href='/form-peta-interaktif/add'">

                                    <span class="btn-label">
                                        <i class="fa fa-plus"></i>
                                    </span>

                                    Tambah Lokasi
                                </button>
                            </div>

                        </div>
                    </div>

                    <div class="card-body">

                        <div class="table-responsive">

                            <table class="table table-bordered">
                                <thead>
                                    <th>No.</th>
                                    <th>Nama</th>
                                    <th>Kategori</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Menu</th>
                                    <th>Action</th>
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


{{-- DATATABLE --}}
@push('datatable')
<script type="text/javascript">

$(function() {

    var table = $('.table-bordered').DataTable({

        responsive: true,
        scrollX: true,
        processing: true,
        serverSide: true,
        autoWidth: false,

        ajax: "{{ route('list_peta_interaktif') }}",

        columns: [

            {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center'},

            {data: 'name', name: 'name'},

            {data: 'category', name: 'category', className: 'text-center'},

            {data: 'lat', name: 'lat', className: 'text-center'},

            {data: 'lng', name: 'lng', className: 'text-center'},

            {data: 'menu', name: 'menu', className: 'text-center'},

            {data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-center'},

        ],

        initComplete: function() {
            $('.table-bordered').css('width', '100%');
        }

    });

});

</script>
@endpush


{{-- DELETE --}}
<script>

function deleteConfirmation(id) {

    Swal.fire({

        title: 'Yakin ingin menghapus lokasi ini?',
        text: "",
        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",

        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal'

    }).then((result) => {

        if (result.isConfirmed) {

            var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

            $.ajax({

                type: 'POST',
                url: "{{ url('/hapus-peta-interaktif') }}/" + id,
                data: {
                    _token: CSRF_TOKEN
                },
                dataType: 'JSON',

                success: function (results) {

                    if (results.success === true) {

                        swal.fire("Done!", results.message, "success");

                        setTimeout(function () {
                            location.reload();
                        }, 1500);

                    } else {

                        swal.fire("Error!", results.message, "error");

                    }

                }

            });

        }

    });

}

</script>