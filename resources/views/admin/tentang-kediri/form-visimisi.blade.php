@extends('admin.layouts.app')

@section('title', $titlepage)

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
                <a href="#">Profil</a>
            </li>
            <li class="separator">
                <i class="icon-arrow-right"></i>
            </li>
            <li class="nav-item">
                <a href="#">{{ $titlepage }}</a>
            </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-5 mt-2">
                <div class="card card-stats card-round">
                    <div class="card-body">
                        <form class="row g-3" action="{{ route('update_visimisi') }}" method="POST" enctype="multipart/form-data">
                            @csrf
                                <input type="hidden" name="updatevisi" value="true">
                                <div class="card-body"> 
                                    <h5 for="inputText" class="form-label">Visi</h5>
                                    <textarea id="visi" class="form-control mb-3" name="visi" rows="4">{{ $visi }}</textarea>
                                    <button type="submit" class="btn btn-secondary">
                                        <i class="fa fa-paper-plane"></i> Simpan
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-7 mt-2">
                <div class="card card-stats card-round">
                    <div class="card-body">
                        <form class="row g-3" action="{{ route('update_visimisi') }}" method="POST" enctype="multipart/form-data">
                            @csrf
                                <div class="card-body"> 
                                    <h5 for="inputText" class="form-label" style="margin-bottom:40px;">
                                        Misi
                                        <button type="button" class="btn btn-secondary" style="float:right;" onclick="addmisi()"><i class="fas fa-plus-square"></i> Tambah Misi</button>
                                    </h5>
                                    <!-- Modal Add -->
                                    <div class="modal fade" id="addmisi" tabindex="-1">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Tambah Misi</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <input class="form-control" type="hidden" id="idmisi" name="idmisi">
                                                <div class="modal-body">
                                                    <div class="row mb-3">
                                                        <div class="col-sm-12">
                                                            <textarea name="misi" id="misi" class="form-control" rows="4" required></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" class="btn btn-primary" name="simpanmisi" value="1"><i class="fa fa-paper-plane"></i> Simpan</button>
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- End Large Modal-->
                                    <table class="table table-striped">
                                        <tbody>
                                            <?php $id = 1?>
                                            @foreach ($misi as $misi)
                                            <tr>
                                                <td class="text-center">{{ $id++ }}</td>
                                                <td width="70%">{{ $misi['deskripsi'] }}</td>
                                                <td class="text-center">
                                                    <button type="button" class="btn btn-warning small" onclick="editmisi({{ $misi['id'] }})" title="Edit"><i class="fas fa-pen"></i></button>
                                                    <button type="button" class="btn btn-danger" onclick="misistatusConfirmation({{ $misi['id'] }})" title="Delete"><i class="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // Modal Add Misi
    function addmisi(){
        new bootstrap.Modal($("#addmisi")).show();
        $('#id').val('');
        $('#misi').val('');
    }

    // Modal Edit Misi
    function editmisi(id){
        $.ajax({
            type: 'GET',
            url: "{{ url('/valuemisi') }}/" + id,
            dataType: 'json',
            success: function(response) {
                console.log(response)
                new bootstrap.Modal($("#addmisi")).show();
                $("#addmisi .modal-title").html("Edit Misi");
                $('#idmisi').val(response.id);
                $('#misi').val(response.deskripsi);
            }
        })
    }

    // Hapus Misi
    function misistatusConfirmation(id) {
        Swal.fire({
            title:'Yakin ingin menghapus misi ini?',
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
                $.ajax({
                    type: 'POST',
                    url:  "{{ url('/hapus-misi') }}/" + id,
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