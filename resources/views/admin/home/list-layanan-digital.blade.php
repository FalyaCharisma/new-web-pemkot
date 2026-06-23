@extends('admin.layouts.app')

@section('title', 'Layanan Digital')

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Home</h3>
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
                <a href="#">Layanan Digital</a>
            </li>
            <li class="separator">
                <i class="icon-arrow-right"></i>
            </li>
            <li class="nav-item">
                <a href="#">List Layanan Digital</a>
            </li>
           
            </ul>
        </div>
        
        <div class="row">
            <div class="col-lg-12">
                <div class="card" style="margin-top:20px;">
                    <div class="card-body" style="margin-top:20px;">
                        <!-- Modal Add -->
                        <div class="modal fade" id="addlayanan" tabindex="-1">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Tambah Layanan Digital</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form action="/update-layanan-digital" method="POST" enctype="multipart/form-data" id="formaddlayanan">
                                    @csrf
                                        <div class="modal-body">
                                            <input type="hidden" class="form-control" name="id" id="id">
                                            <div class="row mb-3">
                                                <label for="kategori" class="col-sm-3 col-form-label">Layanan Digital</label>
                                                <div class="col-sm-9 mt-2">
                                                    <input type="text" class="form-control" name="nama_layanan" id="nama_layanan" required>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label for="kategori" class="col-sm-3 col-form-label">URL</label>
                                                <div class="col-sm-9 mt-2">
                                                    <input type="text" class="form-control" name="url" id="url" required>
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
                        <h5 class="card-title" style="margin-bottom:70px;">
                            <button type="button" class="btn btn-primary" style="float:left;" onclick="addlayanan()"><i class="fas fa-plus-square"></i> Tambah Layanan Digital</button>
                        </h5>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center">No.</th>
                                    <th class="text-center">Nama Layanan</th>
                                    <th class="text-center">URL</th>
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

@push('datatable')

<script type="text/javascript">
    $(function () {
        var table = $('.table-bordered').DataTable({
    ajax: {
        url: "{{ route('list_layanan_digital') }}",
        type: "GET",
        dataSrc: function (json) {
            console.log(json); // Debug respons di konsol
            return json.data; // Pastikan ini sesuai dengan struktur respons JSON
        }
    },
    columns: [
        {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center', width:'10%'},
        {data: 'layanan', name: 'layanan'},
        {data: 'url', name: 'url'},
        {data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-center'},
    ]
});
    
    });                                                                                                                                                                                                                                                         
</script>
@endpush

<script>
    // Modal Add Layanan Digital
    function addlayanan() {
        new bootstrap.Modal($("#addlayanan")).show();
        $('#id').val('');
        $('#nama_layanan').val('');
        $('#url').val('');
    }

    // Modal Edit Layanan Digital
    function editlayanan(id) {
        $.ajax({
            type: 'GET',
            url: "{{ url('/value-layanan-digital') }}/" + id,
            dataType: 'json',
            success: function(response){
                // console.log(response)
                new bootstrap.Modal($("#addlayanan")).show();
                $('#addlayanan .modal-title').html("Edit Layanan Digital");
                $('#id').val(response.id);
                $('#nama_layanan').val(response.nama_layanan);
                $('#url').val(response.url);
            }
        })
    }

    // Modal Delete Bidang
    function deleteConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus Layanan Digital ini?',
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
                    url:  "{{ url('/hapus-layanan-digital') }}/" + id,
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
