@extends('admin.layouts.app')

@section('title', 'List Kategori Fasilitas')

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
                <a href="#">List Kategori</a>
            </li>
           
            </ul>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">List Kategori Fasilitas</h4>
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
                                    <form action="/update-kategori-fasilitas" method="POST" enctype="multipart/form-data" id="formaddkategori">
                                    @csrf
                                        <div class="modal-body">
                                            <input type="hidden" name="id" id="id">

                                            <div class="mb-3">
                                                <label class="form-label">Nama Kategori</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    name="nama_kategori"
                                                    id="nama_kategori"
                                                    required>
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label">Icon Lucide</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    name="icon"
                                                    id="icon"
                                                    placeholder="Building2, Hotel, Bus, Landmark">
                                                <small class="text-muted">
                                                    Pilih nama icon dari
                                                    <a
                                                        href="https://lucide.dev/icons/"
                                                        target="_blank">
                                                        Lucide Icons
                                                    </a>.
                                                    Contoh: <b>Barrel</b>, <b>Sparkles</b>, <b>UtensilsCrossed</b>, <b>MapPin</b>, <b>Camera</b>.
                                                </small>
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
                                        <th class="text-center">Icon</th>
                                        <th class="text-center">Jumlah Sub Kategori</th>
                                        <th class="text-center">Status</th>
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
            ajax: "{{ route('list_kategori_fasilitas') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center', width:'5%'},
                {data: 'nama_kategori', name: 'nama_kategori'},
                {data: 'icon', name: 'icon', className: 'text-center', orderable: false, searchable: false},
                {data: 'sub_count', name: 'sub_count', className: 'text-center', orderable: false, searchable: false},
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

<script>
    function addkategori(){
        $('#formaddkategori')[0].reset();
        $('#id').val('');
        $('#addkategori .modal-title').html('Tambah Kategori');
        new bootstrap.Modal(document.getElementById('addkategori')).show();
    }

    function editkategori(id){
        $.get("/value-kategori-fasilitas/" + id, function(response){
            $('#addkategori .modal-title').html("Edit Kategori");
            $('#id').val(response.id);
            $('#nama_kategori').val(response.nama_kategori);
            $('#icon').val(response.icon);
            $('#status_enabled').val(response.status_enabled);
            new bootstrap.Modal(document.getElementById('addkategori')).show();
        });
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
                    url:  "{{ url('/hapus-kategori-fasilitas') }}/" + id,
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