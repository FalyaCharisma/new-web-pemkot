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
                    <a href="#">List Kalender Acara</a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="coil-lg-12">
                <div class="card">
                    <div class="card-header ps-5 pe-5">
                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary" onclick="location.href='/form-kalender-acara/add'">
                                <span class="btn-label">
                                    <i class="fa fa-plus"></i>
                                </span>
                                Tambah Acara
                            </button>
                        </div>
                    </div>
                    <div class="card-body ps-5 pe-5">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center">No.</th>
                                    <th class="text-center">Tanggal</th>
                                    <th class="text-center">Judul Acara</th>
                                    <th class="text-center">Banner</th>
                                    <th class="text-center">Deskripsi</th>
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
            ajax: "{{ route('kalender_acara') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center'},
                {data: 'tanggal', name: 'tanggal', className: 'text-center'},
                {data: 'judul_acara', name: 'judul_acara', className: 'text-center'},
                {data: 'banner', name: 'banner', orderable: false, searchable: false, className: 'text-center', width: '10%'},
                {data: 'deskripsi', name: 'deskripsi', width: '35%', className: 'text-justify'},
                {data: 'action', name: 'action', className: 'text-center', width: '15%'},
            ]
        })
    })
 </script>
 @endpush

 
<script>
    // DELETE ALERT
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
                $.ajax({
                    type: 'POST',
                    url:  "{{ url('/hapus-kalender-acara') }}/" + id,
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
        })
    }
</script>
@endsection