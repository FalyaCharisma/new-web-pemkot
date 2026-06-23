@extends('admin.layouts.app')

@section('title', empty($data) ? '' : $data['menu'])

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">{{ empty($data) ? '' : $data['menu'] }}</h3>
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
                    <a href="#">{{ empty($data) ? '' : $data['menu'] }}</a>
                </li>
                <li class="separator">
                <i class="icon-arrow-right"></i>
                </li>
                <li class="nav-item">
                    <a href="#">List Banner Layanan Terpadu</a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header ps-5 pe-5">
                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-warning me-4" onclick="location.href='/list-arsip-banner-layanan'">
                                <span class="btn-label">
                                    <i class="fa fa-archive"></i>
                                </span>
                                Arsip Banner
                            </button>
                            <button type="submit" class="btn btn-secondary" onclick="upload()">
                                <span class="btn-label">
                                    <i class="fa fa-upload"></i>
                                </span>
                                Upload Banner Baru
                            </button>
                        </div>
                    </div>
                    <div class="card-body ps-5 pe-5">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center">No.</th>
                                    <th class="text-center">Banner</th>
                                    <th class="text-center">Nomor Order</th>
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

<!-- Form Add -->
<div class="modal fade" id="upload" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Upload Banner Baru</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="{{ route('banner_layanan') }}" method="POST" enctype="multipart/form-data" id="form-upload">
            @csrf
                <div class="modal-body">
                    <input type="hidden" class="form-control" name="id" id="id" required>
                    <div id="foto-preview" class="text-center"></div>
                    <div class="form-group" style="display:block;" id="div-banner">
                        <label for="kategori"><b>Banner</b></label>
                        <input type="file" class="form-control" name="banner" id="banner" required>
                        <p class="logowarning" style="color:red;"><i>* tipe file berupa .jpg .png .jpeg .webp .svg dengan size max 2mb </i></p>
                    </div>
                    <div class="form-group">
                        <label for="kategori"><b>Nomor Order</b></label>
                        <input type="text" class="form-control" name="no_order" id="no_order" required>
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
    // Edit No Order
    function edit(id){
        $.ajax({
            type: 'GET',
            url: "{{ url('/value-banner-layanan') }}/" + id,
            dataType: 'json',
            success: function(response) {
                new bootstrap.Modal($("#upload")).show()
                $('#upload .modal-title').html("Edit Nomor Order");
                $('#id').val(response.id);
                $('#no_order').val(response.no_order);
                $('#div-banner').hide();
                $('#banner').prop('required', false);
            }
        })
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
    $(function () {
        var table = $('.table-bordered').DataTable({
            responsive: true,
            "scrollX": true,
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: "{{ route('layanan_terpadu') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center'},
                {data: 'banner', name: 'banner', orderable: false, searchable: false, className: 'text-center', width: '40%'},
                {data: 'no_order', name: 'no_order', className: 'text-center'},
                {data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-center'},
            ],
            initComplete: function() {
                $('.table-bordered').css('width', '100%'); // Ensure full-width table
            }
        })
    })
</script>
@endpush

<!-- Modal Arsip -->
<script>
    function arsipConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin mengarsip banner ini?',
            confirmButtonText: 'Ya, Arsipkan',
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
                    url:  "{{ url('/arsip-banner-layanan') }}/" + id,
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