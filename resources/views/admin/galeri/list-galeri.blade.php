@extends('admin.layouts.app')

@section('title', empty($data) ? '' : $data['menu'])

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Galeri</h3>
            <ul class="breadcrumbs mb-3">
                <li class="nav-home">
                    <a href="#"><i class="icon-home"></i></a>
                </li>
                <li class="separator"><i class="icon-arrow-right"></i></li>
                <li class="nav-item"><a href="#">Album</a></li>
                <li class="separator"><i class="icon-arrow-right"></i></li>
                <li class="nav-item"><a href="#">List Album</a></li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">List Album</h4>
                        <div class="d-flex justify-content-end mt-3">
                            <button type="button" class="btn btn-secondary" onclick="location.href='/form-galeri/add'">
                                <span class="btn-label"><i class="fa fa-plus"></i></span>
                                Tambah Data
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="album-table">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Judul Album</th>
                                        <th>Jumlah Foto</th>
                                        <th>Tanggal</th>
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

@push('datatable')
<script type="text/javascript">
    $(function () {
        $('#album-table').DataTable({
            responsive: true,
            scrollX: true,
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: "{{ route('list_galeri') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center'},
                {data: 'judul', name: 'judul', className: 'text-center'},
                {data: 'jumlah_foto', name: 'jumlah_foto', className: 'text-center', orderable: false, searchable: false},
                {data: 'tanggal', name: 'tanggal', className: 'text-center'},
                {data: 'action', name: 'action', className: 'text-center', orderable: false, searchable: false},
            ],
            initComplete: function() {
                $('#album-table').css('width', '100%');
            }
        });
    });

    function deletealbumConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus album ini?',
            confirmButtonText: 'Ya, Hapus',
            text: 'Semua foto pada album ini juga akan dinonaktifkan.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

                $.ajax({
                    type: 'POST',
                    url: "{{ url('/hapus-album') }}/" + id,
                    data: {
                        _token: CSRF_TOKEN
                    },
                    dataType: 'JSON',
                    success: function (results) {
                        if (results.success === true) {
                            Swal.fire('Berhasil!', results.message, 'success');
                            $('#album-table').DataTable().ajax.reload(null, false);
                        } else {
                            Swal.fire('Error!', results.message, 'error');
                        }
                    },
                    error: function () {
                        Swal.fire('Error!', 'Terjadi kesalahan saat menghapus album.', 'error');
                    }
                });
            }
        });
    }
</script>
@endpush

@endsection
