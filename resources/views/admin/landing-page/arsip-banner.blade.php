@extends('admin.layouts.app')

@section('title', empty($data) ? '' : $data['menu'])

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">{{ empty($data) ? '' : $data['menu'] }}</h3>
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
                    <a href="#">{{ empty($data) ? '' : $data['menu'] }}</a>
                </li>
                <li class="separator">
                <i class="icon-arrow-right"></i>
                </li>
                <li class="nav-item">
                    <a href="#">List Arsip Banner Layanan Terpadu</a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header ps-5 pe-5">
                        <div class="d-flex justify-content-start">
                            <button type="submit" class="btn btn-danger" onclick="location.href='{{ url('/layanan-terpadu') }}'">
                                <span class="btn-label">
                                    <i class="fa fa-arrow-left"></i>
                                </span>
                                Kembali
                            </button>
                        </div>
                    </div>
                    <div class="card-body ps-5 pe-5">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center">No.</th>
                                    <th class="text-center">Banner</th>
                                    <th class="text-center">Nomor Order</th>
                                    <th class="text-center">Aksi</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- DATATABLE -->
@push('datatable')
<script type="text/javascript">
    $(function () {
        var table = $('.table-bordered').DataTable({
            responsive: true,
            "scrollX": true,
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: "{{ route('list_arsip_banner_layanan') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center'},
                {data: 'banner', name: 'banner', orderable: false, searchable: false, className: 'text-center', width: '40%'},
                {data: 'no_order', name: 'no_order', className: 'text-center'},
                {data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-center'},
            ],
            initComplete: function() {
                $('.table-bordered').css('width', '100%'); // Ensure full-width table
            }
        })
    })
</script>
@endpush

<!-- Modal Arsip -->
<script>
    function arsipConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin mengarsip banner ini?',
            confirmButtonText: 'Ya, Arsipkan',
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Batal"
            }).then((result) => {
            if (result.isConfirmed) {
                var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
                $.ajax({
                    type: 'POST',
                    url:  "{{ url('/arsip-banner-layanan') }}/" + id,
                    data: {
                            _token: CSRF_TOKEN
                        },
                    dataType: 'JSON',
                    success: function (results) {
                        if (results.success === true) {
                            swal.fire("Done!", results.message, "success");
                            // refresh page after 2 seconds
                            setTimeout(function(){
                                location.reload();
                            },2000);
                        } else {
                            swal.fire("Error!", results.message, "error");
                        }
                    }
                });
            }
        });
    }
</script>

<!-- Modal Arsip -->
<script>
    function deleteConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus permanen banner ini?',
            confirmButtonText: 'Ya, Hapus',
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Batal"
            }).then((result) => {
            if (result.isConfirmed) {
                var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
                $.ajax({
                    type: 'POST',
                    url:  "{{ url('/hapus-banner-layanan') }}/" + id,
                    data: {
                            _token: CSRF_TOKEN
                        },
                    dataType: 'JSON',
                    success: function (results) {
                        if (results.success === true) {
                            swal.fire("Done!", results.message, "success");
                            // refresh page after 2 seconds
                            setTimeout(function(){
                                location.reload();
                            },2000);
                        } else {
                            swal.fire("Error!", results.message, "error");
                        }
                    }
                });
            }
        });
    }
</script>
@endsection