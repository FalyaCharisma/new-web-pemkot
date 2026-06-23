@extends('admin.layouts.app')

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">{{ $titlepage }}</h3>
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
                <a href="#">Galeri</a>
            </li>
            <li class="separator">
                <i class="icon-arrow-right"></i>
            </li>
            <li class="nav-item">
                <a href="#">Form Galeri</a>
            </li>
           
            </ul>
        </div>
        
        <div class="row">
            <div class="col-lg-12 my-3">
                <button type="button" class="btn btn-danger" onclick="window.history.back();">
                    <i class="fa fa-arrow-left me-2"></i> Kembali
                </button> 
                <button type="submit" id="simpan" class="btn btn-secondary"  onclick="location.href='/form-galeri/view'"><i class="fa fa-paper-plane me-2"></i> Simpan</button>
            </div>
            @include('admin.validation')
            <div class="col-lg-12">
                <div class="card" style="margin-top:20px;">
                    <div class="card-body" style="margin-top:20px;">
                        <label for="album">Judul Album :</label>
                        @if ($album == '')
                        <input class="form-control mb-2" id="album" name="album" required/>
                        <input class="form-control" type="hidden" id="id" name="id">
                        @else
                        <input class="form-control mb-2" id="album" name="album" value="{{ $album['judul'] }}" required readonly/>
                        <input class="form-control" type="hidden" id="id" name="id" value="{{ $album['id'] }}">
                        @endif
                        <p id="error-message" class="logowarning" style="color:red; margin-top:10px; font-style:italic;display:block;"></p>
                        @if ($album != '')
                        <button type="button" class="btn btn-warning" style="float:left; margin-right:20px; margin-bottom:20px;" onclick="editAlbum()"><i class="bi bi-pencil"></i> Edit Judul Album</button>
                        @endif
                        <button type="button" class="btn btn-primary mb-3"onclick="uploadGambar()"><i class="fas fa-arrow-up"></i> Upload Gambar</button>
                        <form action="{{ route('dropzone.store') }}" method="post" enctype="multipart/form-data" id="image-upload" class="dropzone" style="display:none;">
                            @csrf
                            <input class="form-control" type="hidden" id="id_album" name="id_album" value="">
                            <input class="form-control" type="hidden" id="judul_album" name="judul_album" value="">
                        </form>
                        <p id="logowarning" class="logowarning" style="color:red; margin-top:10px; display:none;"><i>* tipe file berupa .jpg .png .jpeg .webp .svg dengan size max 2mb<br>* upload gambar bisa lebih dari 1 sekaligus</i></p>
                    </div>
                </div>
            </div>
            @if ($table == 'on')
            <div class="col-lg-12">
                <div class="card" style="margin-top:20px;">
                    <div class="card-body" style="margin-top:20px;">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center">No.</th>
                                    <th class="text-center">Foto</th>
                                    <th class="text-center">Hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            @endif
        </div>
    </div>
</div>

@if ($album != '')
<!-- Modal Add -->
<div class="modal fade" id="addalbum" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Judul Album</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/update-album" method="POST" enctype="multipart/form-data" id="formlayananutama">
                @csrf
                <input class="form-control" type="hidden" id="id" name="id" value="{{ $album['id'] }}">
                <div class="modal-body">
                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <input type="text" class="form-control" name="judul_album" id="nama" value="{{ $album['judul'] }}" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary"><i class="bi bi-save2"></i> Simpan</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endif

<script>
    // Modal Add Misi
    function editAlbum(){
        new bootstrap.Modal($("#addalbum")).show();
        $('#id').val('');
        $('#misi').val('');
    }
</script>

<script>
    function uploadGambar() {
        var x = document.getElementById("image-upload");
        var y = document.getElementById("logowarning");
        var simpan = document.getElementById("simpan");
        var id_album = document.getElementById("id").value;
        var album = document.getElementById("album").value;

        if (album == ''){
            document.getElementById('error-message').innerText = '* Judul album harus diisi !!';
            return; 
        }else{
            document.getElementById('error-message').innerText = '';
        }

        if (getComputedStyle(x).display === "none") {
            x.style.display = "block";
            y.style.display = "block";
            simpan.style.display = "block";

        }

        document.getElementById("id_album").value = id_album;
        document.getElementById("judul_album").value = album;
    }
</script>

@push('foto-dropzone')
<script>
    Dropzone.autoDiscover = false;
  
    var dropzone = new Dropzone('#image-upload', {
            thumbnailWidth: 200,
            maxFilesize: 2,
            acceptedFiles: ".jpeg,.jpg,.png,.webp,.svg",
            headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    });
</script>
@endpush

<!-- DATATABLE -->
@push('datatable')         
<script type="text/javascript">
    $(function () {
        var id_album = document.getElementById("id").value;
        $("#file-upload").val("");
        var table = $('.table-bordered').DataTable({
            responsive: true,
            "scrollX": true, // Enable horizontal scrolling for small screens
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: "{{ url('/data-foto') }}/" + id_album,
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex'},
                {data: 'foto', name: 'foto'},
                {data: 'hapus', name: 'hapus', orderable: false, searchable: false},
            ],
            columnDefs: [
                {
                    targets:[0,1,2],
                    className: "text-center"
                }
            ],
            initComplete: function() {
                $('.table-bordered').css('width', '100%'); // Ensure full-width table
            }
        });   
    });
</script>
@endpush

<!-- MODAL DELETE FOTO -->
<script>
    function deletefotoConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus foto ini?',
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
                    url:  "{{ url('/hapus-foto') }}/" + id,
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
