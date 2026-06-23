@extends('admin.layouts.app')

@section('title', empty($data) ? '' : $data['menu'])

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Daftar Pimpinan</h3>
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
                <a href="#">Daftar Pimpinan</a>
            </li>
            <li class="separator">
                <i class="icon-arrow-right"></i>
            </li>
            <li class="nav-item">
                <a href="#">{{ empty($data) ? '' : $data['menu'] }}</a>
            </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">List Pimpinan</h4>
                        <div class="d-flex justify-content-end mt-3">
                            <a href="/form-pimpinan/new" class="btn btn-secondary"> 
                                <span class="btn-label">
                                    <i class="fa fa-plus"></i>
                                </span>Tambah Data
                            </a>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Nama Pimpinan</th>
                                        <th>Jabatan</th>
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

<!-- DATATABLE -->
@push('datatable')
<script type="text/javascript">
    $(function () {
        var table = $('.table-bordered').DataTable({
            responsive: true,
            "scrollX": true, // Enable horizontal scrolling for small screens
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: "{{ route('list_pimpinan') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center'},
                {data: 'nama_pimpinan', name: 'nama_pimpinan', width: '20%'},
                {data: 'jabatan', name: 'jabatan'},
                {data: 'action', name: 'action', className: 'text-center'},
            ],
            initComplete: function() {
                $('.table-bordered').css('width', '100%'); // Ensure full-width table
            }
        });     
    });                                                                                                                                                                                                                                                         
</script>
@endpush

<!-- MODAL DELETE PROGRAM UNGGULAN -->
<script>
    function deleteConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus data ini?',
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
                // var url = "{{url('/imgslider-status')}}/" + id
                $.ajax({
                    type: 'POST',
                    url:  "{{ url('/hapus-pimpinan') }}/" + id,
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