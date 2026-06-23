@extends('admin.layouts.app')

@section('title', empty($data) ? '' : $data['menu'])

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Sejarah Kota Kediri</h3>
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
                <a href="#">Sejarah Kota Kediri</a>
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
                        <h4 class="card-title">List Sejarah Kota</h4>
                        <div class="d-flex justify-content-end mt-3">
                            <button type="button" class="btn btn-secondary" onclick="add()">
                                <span class="btn-label">
                                    <i class="fa fa-plus"></i>
                                </span>
                                Tambah Data
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Tahun</th>
                                        <th>Keterangan</th>
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
                <h5 class="modal-title">Tambah Sejarah</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/update-sejarah" method="POST" enctype="multipart/form-data" id="formadd">
            @csrf
                <div class="modal-body">
                    <input type="hidden" class="form-control" name="id" id="id">
                    <div class="form-group">
                        <label for="tahun" class="form-label">Tahun</label>
                        <input type="text" class="form-control" name="tahun" id="tahun">
                    </div>
                    <div class="form-group">
                        <label for="my-editor" class="mb-2 form-label">Detail:</label>
                        <textarea class="my-editor" id="my-editor" name="keterangan"></textarea>
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
    $(function () {
        var table = $('.table-bordered').DataTable({
            responsive: true,
            "scrollX": true, // Enable horizontal scrolling for small screens
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: "{{ route('list_sejarah') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center'},
                {data: 'tahun', name: 'tahun', width: '20%'},
                {data: 'keterangan', name: 'keterangan'},
                {data: 'action', name: 'action', className: 'text-center'},
            ],
            initComplete: function() {
                $('.table-bordered').css('width', '100%'); // Ensure full-width table
            }
        });     
    });                                                                                                                                                                                                                                                         
</script>
@endpush

<script>
    function add() {
        new bootstrap.Modal($("#add")).show();
        $('#id').val('');
        $('#keterangan').val('');

        // Reset form
        $('#add .modal-title').html("Tambah Sejarah");
        $('#formadd')[0].reset(); // Reset semua input

        // Reset editor
        if (tinymce.get('my-editor')) {
            tinymce.get('my-editor').setContent('');
        }
    }
</script> 

 <!-- MODAL DELETE SEJARAH -->
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
                    url:  "{{ url('/hapus-sejarah') }}/" + id,
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

<script>
    function edit(id) {
    $.ajax({
        type: 'GET',
        url: "{{ url('/form-sejarah') }}/" + id, 
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                // Tampilkan modal
                let modal = new bootstrap.Modal($("#add"));
                modal.show();

                $('#add .modal-title').html("Edit Sejarah"); // Ubah judul modal
                
                // Isi form dengan data yang diterima
                $('#id').val(response.data.id);
                $('#tahun').val(response.data.tahun);

                // Jika menggunakan TinyMCE
                if (tinymce.get('my-editor')) {
                    tinymce.get('my-editor').setContent(response.data.keterangan);
                } else {
                    $('#my-editor').val(response.data.keterangan); // Jika plain textarea
                }
            } else {
                Swal.fire('Error', 'Data tidak ditemukan', 'error');
            }
        },
        error: function() {
            Swal.fire('Error', 'Terjadi kesalahan saat memuat data', 'error');
        }
    });
}

</script>

@endsection