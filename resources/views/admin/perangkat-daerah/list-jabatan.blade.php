@extends('admin.layouts.app')

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Jabatan</h3>
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
                <a href="#">Jabatan</a>
            </li>
            <li class="separator">
                <i class="icon-arrow-right"></i>
            </li>
            <li class="nav-item">
                <a href="#">List Jabatan</a>
            </li>
           
            </ul>
        </div>
        
        <div class="row">
            <div class="col-lg-12">
                <div class="card" style="margin-top:20px;">
                    <div class="card-body" style="margin-top:20px;">
                        <!-- Modal Add -->
                        <div class="modal fade" id="addjabatan" tabindex="-1">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Tambah Jabatan</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form action="/update-jabatan" method="POST" enctype="multipart/form-data" id="formaddjabatan">
                                    @csrf
                                        <div class="modal-body">
                                            <input type="hidden" class="form-control" name="id" id="id">
                                            <div class="row mb-3">
                                                <label for="kategori" class="col-sm-3 col-form-label">Jabatan</label>
                                                <div class="col-sm-9 mt-2">
                                                    <input type="text" class="form-control" name="nama_jabatan" id="nama_jabatan" required>
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
                        <h5 class="card-title" style="margin-bottom:50px;">
                            <button type="button" class="btn btn-primary" style="float:left;" onclick="addjabatan()"><i class="fas fa-plus-square"></i> Tambah Jabatan</button>
                        </h5>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center">No.</th>
                                    <th class="text-center">Nama Jabatan</th>
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
            responsive: true,
            "scrollX": true, // Enable horizontal scrolling for small screens
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: "{{ route('list_jabatan') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center', width:'10%'},
                {data: 'jabatan', name: 'jabatan'},
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
    // Modal Add Jabatan
    function addjabatan() {
        new bootstrap.Modal($("#addjabatan")).show();
        $('#id').val('');
        $('#nama_jabatan').val('');
    }

    // Modal Edit Bidang
    function editjabatan(id) {
        $.ajax({
            type: 'GET',
            url: "{{ url('/value-jabatan') }}/" + id,
            dataType: 'json',
            success: function(response){
                // console.log(response)
                new bootstrap.Modal($("#addjabatan")).show();
                $('#addjabatan .modal-title').html("Edit Jabatan");
                $('#id').val(response.id);
                $('#nama_jabatan').val(response.nama_jabatan);
            }
        })
    }

    // Modal Delete Jabatan
    function deleteConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus jabatan ini?',
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
                    url:  "{{ url('/hapus-jabatan') }}/" + id,
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
