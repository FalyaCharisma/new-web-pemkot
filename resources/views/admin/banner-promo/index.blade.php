@extends('admin.layouts.app')

@section('title', 'Banner Beranda')

@section('content')

<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Banner Promo</h3>
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
                <a href="#">{{ $titlepage }}</a>
            </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header ps-5 pe-5">
                        <div class="d-flex justify-content-end">
                            <!-- <button type="submit" class="btn btn-primary me-4" onclick="location.href='/arsip-banner'">
                                <span class="btn-label">
                                    <i class="fa fa-archive"></i>
                                </span>
                                Arsip Banner
                            </button> -->
                            <button type="submit" class="btn btn-secondary" onclick="upload()">
                                <span class="btn-label">
                                    <i class="fa fa-plus"></i>
                                </span>
                                Tambah Banner Promo
                            </button>
                        </div>
                    </div>
                    <!-- <div class="card-body ps-5 pe-5">
                        @include('admin.validation')
                        <div class="col-lg-12 d-flex justify-content-center mt-5 mb-5">
                            <img src="{{ empty($banner) ? asset('assets/images/noimage.png') : asset('storage/banner-promo/' . $banner['gambar']) }}" class="img-fluid">
                        </div>
                    </div> -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <th>No.</th>
                                    <th>Judul</th>
                                    <th>Banner</th>
                                    <th>Action</th>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

 <!-- Modal Add -->
 <div class="modal fade" id="addbanner" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Tambah Banner Promo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/update-banner-promo" method="POST" enctype="multipart/form-data" id="formaddbanner">
            @csrf
                <div class="modal-body">
                    <input type="hidden" class="form-control" name="id" id="id">
                    <div class="row mb-3">
                        <label for="judul" class="col-sm-3 col-form-label">Judul</label>
                        <div class="col-sm-9 mt-2">
                            <input type="text" class="form-control" name="judul" id="judul" required>
                        </div>
                    </div>
            
                    <div class="row mb-3">
                        <div id="foto-preview" class="text-center">
                            <img src="{{ empty($banner) ? asset('assets/images/noimage.png') : asset('storage/banner-promo/' . $banner['gambar']) }}" width="25%">
                        </div>
                        <label for="gambar" class="col-sm-3 col-form-label">Gambar</label>
                        <div class="col-sm-9 mt-2">
                            <input type="hidden" class="form-control" name="gambarlama" id="gambarlama" value="{{ empty($banner) ? null : $banner['gambar'] }}" />
                            <input type="file" class="form-control" name="gambar" id="gambar" />                            
                            <p id="logowarning" class="logowarning text-danger">
                                <i>* Tipe file harus berupa .jpg, .png, .jpeg, .webp, .svg dengan size max 2MB</i><br>
                            </p>
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



<script>
    // Banner Preview
    const fotoPreview = document.getElementById("foto-preview");
    const fotoFile = document.getElementById("gambar");

    fotoFile.addEventListener("change", function () {
        getImgData();
    });

    function getImgData() {
        const foto = fotoFile.files[0];
        if (foto) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(foto);
            fileReader.addEventListener("load", function () {
                fotoPreview.style.display = "block";
                fotoPreview.innerHTML = '<img src="' + this.result + '" style="width:40%;"/>';
            }); 
        }
    }
</script>


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
            ajax: "{{ route('list_banner_promo') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center'},
                {data: 'judul', name: 'judul'},
                {data: 'gambar', name: 'gambar', className: 'text-center'},
                {data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-center'},
            ],
            initComplete: function() {
                $('.table-bordered').css('width', '100%'); // Ensure full-width table
            }
        })
    });

     // Modal Add Banner
     function upload() {
        new bootstrap.Modal($("#addbanner")).show();
        $('#id').val('');
        $('#judul').val('');
        $('#gambarlama').val('');
        $('#gambar').val('');
        
        // Reset preview gambar
        $("#foto-preview").html('<img src="{{ asset("assets/images/noimage.png") }}" style="width:40%;"/>');

        // Tambahkan atribut required saat tambah
        $('#gambar').attr('required', 'required');
    }

    // Modal Edit Banner
    function editbanner(id) {
    $.ajax({
        type: 'GET',
        url: "{{ url('/value-banner-promo') }}/" + id,
        dataType: 'json',
        success: function(response){
            new bootstrap.Modal($("#addbanner")).show();
            $('#addbanner .modal-title').html("Edit Banner Promo");
            $('#id').val(response.id);
            $('#judul').val(response.judul);
            $('#gambarlama').val(response.gambar); // Simpan gambar lama
            $('#gambar').val(''); // Kosongkan input file

            // Tampilkan gambar lama jika ada
            if(response.gambar) {
                $('#foto-preview').html('<img src="/storage/banner-promo/' + response.gambar + '" width="40%"/>');
            } else {
                $('#foto-preview').html('<img src="{{ asset("assets/images/noimage.png") }}" width="40%"/>');
            }

            // Hapus atribut required pada edit
            $('#gambar').removeAttr('required');
        }
    })
}


    // Modal Delete Banner Promo
    function deletebannerConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus Banner Promo ini?',
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
                    url:  "{{ url('/hapus-banner-promo') }}/" + id,
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
 @endpush

@endsection