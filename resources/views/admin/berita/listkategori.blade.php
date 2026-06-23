@extends('admin.layouts.app')

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Berita</h3>
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
                <a href="#">List Kategori</a>
            </li>
           
            </ul>
        </div>
        
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">List Kategori Berita</h4>
                        <div class="d-flex justify-content-end mt-3">
                            <div>
                                <button type="button" class="btn btn-secondary" onclick="addkategori()">
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
                        <div class="modal fade" id="addkategori" tabindex="-1">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Tambah Kategori</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form action="/update-kategori" method="POST" enctype="multipart/form-data" id="formaddkategori">
                                    @csrf
                                        <div class="modal-body">
                                            <input type="hidden" class="form-control" name="id" id="id">
                                            <div class="row mb-3">
                                                <label for="kategori" class="col-sm-3 col-form-label">Kategori</label>
                                                <div class="col-sm-9 mt-2">
                                                    <input type="text" class="form-control" name="kategori" id="kategori" required>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="submit" class="btn btn-primary">Simpan</button>
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th class="text-center">No.</th>
                                        <th class="text-center">Nama Kategori</th>
                                        <th class="text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
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
        var table = $('.table-bordered').DataTable({
            responsive: true,
            "scrollX": true, // Enable horizontal scrolling for small screens
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: "{{ route('list_kategori') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center', width:'10%'},
                {data: 'kategori', name: 'kategori'},
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

<script>
    // Modal Add Kategori
    function addkategori() {
        new bootstrap.Modal($("#addkategori")).show();
        $('#id').val('');
        $('#kategori').val('');
    }

    // Modal Edit Bidang
    function editkategori(id) {
        $.ajax({
            type: 'GET',
            url: "{{ url('/valuekategori') }}/" + id,
            dataType: 'json',
            success: function(response){
                // console.log(response)
                new bootstrap.Modal($("#addkategori")).show();
                $('#addkategori .modal-title').html("Edit Kategori");
                $('#id').val(response.id);
                $('#kategori').val(response.nama_kategori);
            }
        })
    }

    // Modal Delete Bidang
    function deleteConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus kategori ini?',
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
                    url:  "{{ url('/hapus-kategori') }}/" + id,
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
@endsection
