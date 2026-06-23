@extends('admin.layouts.app')

@section('title', 'Banner Beranda')

@section('content')

<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Banner Beranda</h3>
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
                <a href="#">Banner Beranda</a>
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
                                Tambah Banner 
                            </button>
                        </div>
                    </div>
                    <!-- <div class="card-body ps-5 pe-5">
                        @include('admin.validation')
                        <div class="col-lg-12 d-flex justify-content-center mt-5 mb-5">
                            <img src="{{ empty($banner) ? asset('assets/images/noimage.png') : asset('storage/banner/' . $banner['gambar']) }}" class="img-fluid">
                        </div>
                    </div> -->
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <th>No.</th>
                                    <th>Banner</th>
                                    <th>Status</th>
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

<!-- Form Add -->
<div class="modal fade" id="upload" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Upload Banner Baru</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{ route('upload_banner') }}" method="POST" enctype="multipart/form-data" id="form-upload">
            @csrf
                <div class="modal-body">
                    <div id="foto-preview" class="text-center"></div>
                    <div class="form-group">
                        <input type="file" class="form-control" name="banner" id="banner" required>
                        <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp .svg dengan size max 8mb </i></p>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-secondary"><i class="fa fa-paper-plane"></i> Simpan</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Tutup</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    // Modal Upload
    function upload() {
        new bootstrap.Modal($("#upload")).show();
        fotoPreview.innerHTML = '';
        $('#banner').val('');
    }
</script>

<script>
    // Banner Preview
    const fotoPreview = document.getElementById("foto-preview");
    const fotoFile = document.getElementById("banner");

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
            ajax: "{{ route('banner_beranda') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center'},
                {data: 'gambar', name: 'gambar', className: 'text-center'},
                {data: 'status', name: 'status', className: 'text-center'},
                {data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-center'},
            ],
            initComplete: function() {
                $('.table-bordered').css('width', '100%'); // Ensure full-width table
            }
        })
    });
 </script>
 @endpush

  <!-- MODAL DELETE Banner -->
<script>
    function deletebannerConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus banner ini?',
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
                    url:  "{{ url('/hapus-banner') }}/" + id,
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