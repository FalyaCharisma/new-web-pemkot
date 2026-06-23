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
                        <h4 class="card-title">List Kategori OPD</h4>
                        <div class="d-flex justify-content-end mt-3">
                            <div>
                                <button type="button" class="btn btn-secondary" onclick="add()">
                                    <span class="btn-label">
                                        <i class="fa fa-plus"></i>
                                    </span>
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
                                        <th>No.</th>
                                        <th>Kategori</th>
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

<!-- Form Modal -->
<div class="modal fade" id="add" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Tambah Data</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/update-kategori-opd" method="POST" enctype="multipart/form-data" id="formadd">
            @csrf
                <div class="modal-body">
                    <input type="hidden" class="form-control" name="id" id="id">
                    <div class="form-group">
                        <label for="judul" class="form-label">Nama Kategori</label>
                        <input type="text" class="form-control" name="nama" id="nama">
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

<!-- DATATABLE -->
@push('datatable')
<script type="text/javascript">
    $(function() {
        var table = $('.table-bordered').DataTable({
            responsive: true,
            "scrollX": true,
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: "{{ route('list_kategori_opd') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center'},
                {data: 'kategori_opd', name: 'kategori_opd', className: 'text-center'},
                {data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-center'},
            ],
            initComplete: function() {
                $('.table-bordered').css('width', '100%'); // Ensure full-width table
            }
        });
    });
</script>
@endpush

<script>
    // Modal Add
    function add(){
        new bootstrap.Modal($("#add")).show();
        $('#id').val('');
        $('#nama').val('');
    }

    function edit(id) {
        $.ajax({
            type: 'GET',
            url: "{{ url('/value-kategori-opd') }}/" + id,
            dataType: 'json',
            success: function(response){
                new bootstrap.Modal($("#add")).show();
                $('#add .modal-title').html("Edit Kategori");
                $('#id').val(response.id);
                $('#nama').val(response.nama);
            }
        })
    }
</script>

<!-- MODAL DELETE -->
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
                    url:  "{{ url('/hapus-kategori-opd') }}/" + id,
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