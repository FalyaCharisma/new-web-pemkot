@extends('admin.layouts.app')

@section('title', empty($data) ? '' : $data['menu'])

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Kelurahan</h3>
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
                <a href="#">Mengenal Kediri</a>
            </li>
            <li class="separator">
                <i class="icon-arrow-right"></i>
            </li>
            <li class="nav-item">
                <a href="#">List Kelurahan</a>
            </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">List Kelurahan</h4>
                        <div class="d-flex justify-content-end mt-3">
                            <a href="{{ route('sync_kelurahan') }}" class="btn btn-secondary me-3">Sync Kelurahan</a>
                            <a href="{{ route('sync_kecamatan') }}" class="btn btn-primary">Sync Kecamatan</a>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Kelurahan</th>
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

<!-- Form Add -->
<div class="modal fade" id="add" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Tambah Data</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{ route('update_kelurahan') }}" method="POST" enctype="multipart/form-data" id="formadd">
            @csrf
                <div class="modal-body">
                    <input type="hidden" class="form-control" name="id" id="id">
                    <div class="form-group">
                        <label for="judul" class="form-label">Jumlah Penduduk</label>
                        <input type="number" class="form-control" name="jumlah_penduduk" id="jumlah_penduduk">
                    </div>
                    <div class="form-group">
                        <label for="judul" class="form-label">Link Website</label>
                        <input type="text" class="form-control" name="link" id="link">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-secondary"><i class="fa fa-paper-plane"></i> Simpan</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Tutup</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>

    function edit(id) {
        $.ajax({
            type: 'GET',
            url: "{{ url('/value-kelurahan') }}/" + id,
            dataType: 'json',
            success: function(response){
                // console.log(response)
                new bootstrap.Modal($("#add")).show();
                $('#add .modal-title').html("Edit Kelurahan " + response.nm_kelurahan);
                $('#id').val(response.id);
                $('#jumlah_penduduk').val(response.jml_penduduk);
                $('#link').val(response.link);
            }
        })
    }

</script>

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
            ajax: "{{ route('list_kelurahan') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center'},
                {data: 'kelurahan', name: 'kelurahan', className: 'text-center'},
                {data: 'action', name: 'action', className: 'text-center'},
            ],
            initComplete: function() {
                $('.table-bordered').css('width', '100%'); // Ensure full-width table
            }
        });     
    });                                                                                                                                                                                                                                                         
</script>
@endpush

@endsection