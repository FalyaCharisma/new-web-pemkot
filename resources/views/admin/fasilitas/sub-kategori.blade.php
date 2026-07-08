@extends('admin.layouts.app')

@section('title', 'Sub Kategori Fasilitas')

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Fasilitas Kota</h3>
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
                    <a href="#">Kategori</a>
                </li>
                <li class="separator">
                    <i class="icon-arrow-right"></i>
                </li>
                <li class="nav-item">
                    <a href="#">List Sub Kategori</a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">List Sub Kategori Fasilitas</h4>
                        <div class="d-flex justify-content-end mt-3">
                            <div>
                                <button type="button" class="btn btn-secondary" onclick="addSubKategori()">
                                    <span class="btn-label">
                                        <i class="fa fa-plus"></i>
                                    </span>
                                    Tambah Data
                                </button> 
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <!-- Modal Add -->
                        <div class="modal fade" id="addSubKategori" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h5 class="modal-title">Tambah Sub Kategori</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>

                                    <form action="/update-sub-kategori-fasilitas" method="POST" id="formSubKategori">
                                        @csrf

                                        <div class="modal-body">

                                            <input type="hidden" name="id" id="id">

                                            <input
                                                type="hidden"
                                                name="kategori_id"
                                                value="{{ $kategori->id }}">

                                            <div class="mb-3">
                                                <label class="form-label">Nama Sub Kategori</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    name="nama_sub"
                                                    id="nama_sub"
                                                    required>
                                            </div>
                                        </div>

                                        <div class="modal-footer">
                                            <button class="btn btn-primary" type="submit">
                                                Simpan
                                            </button>

                                            <button
                                                type="button"
                                                class="btn btn-secondary"
                                                data-bs-dismiss="modal">
                                                Tutup
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="5%" class="text-center">No.</th>
                                        <th>Nama Sub Kategori</th>
                                        <th width="15%" class="text-center">Status</th>
                                        <th width="18%" class="text-center">Aksi</th>
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

<script>
    function addSubKategori() {
        $('#formSubKategori')[0].reset();
        $('#id').val('');
        $('#addSubKategori .modal-title').html('Tambah Sub Kategori');
        new bootstrap.Modal(
            document.getElementById('addSubKategori')
        ).show();
    }

    function editSubKategori(id) {
        $.get('/value-sub-kategori-fasilitas/' + id, function(response) {
            $('#addSubKategori .modal-title').html('Edit Sub Kategori');
            $('#id').val(response.id);
            $('#nama_sub').val(response.nama_sub);
            new bootstrap.Modal(
                document.getElementById('addSubKategori')
            ).show();
        });
    }

    
    // Modal Delete Bidang
    function deleteConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus sub kategori ini?',
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
                    url:  "{{ url('/hapus-sub-kategori-fasilitas') }}/" + id,
                    data: {
                            _token: CSRF_TOKEN
                        },
                    dataType: 'JSON',
                    success: function (results) {
                        // console.log(results);
                        // return;
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

@push('datatable')
<script type="text/javascript">
    $(function () {
        var table = $('.table-bordered').DataTable({
            responsive: true,
            "scrollX": true, // Enable horizontal scrolling for small screens
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: "{{ route('sub_kategori_fasilitas', $kategori->id) }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center', width:'5%'},
                {data: 'nama_sub', name: 'nama_sub'},
                {data: 'status', name: 'status_enabled', className: 'text-center'},
                {data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-center'},
            ],
            columnDefs: [
                {
                    targets:[0,2],
                    className: "text-center"
                }
            ]
        });     
    });                                                                                                                                                                                                                                                         
</script>
@endpush

@endsection