@extends('admin.layouts.app')

@section('title', empty($titlepage) ? '' : $titlepage)

@section('content')

<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">{{ empty($titlepage) ? '' : $titlepage }}</h3>
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
                    <a href="#">{{ empty($titlepage) ? '' : $titlepage }}</a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Data Fasilitas & Produk</div>
                        <div class="d-flex justify-content-between align-items-center mt-3 gap-3">
                            <button type="button" class="btn btn-secondary" onclick="location.href='/form-ada-apa/add'">
                                <span class="btn-label">
                                    <i class="fa fa-plus"></i>
                                </span>
                                Tambah Data
                            </button>
                            <div class="me-4">
                                <select class="form-select form-control-lg" id="kategori" name="kategori" required>
                                    <option disabled selected>Pilih Kategori</option>
                                    <option value="">Tampilkan Semua</option>
                                    @foreach ($kategori as $item)
                                        <option value="{{ $item['id'] }}">
                                            {{ $item['nama_kategori'] }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Nama Fasilitas / Produk</th>
                                        <th>Kategori</th>
                                        <th>Gambar</th>
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
            ajax: {
                url: "{{ route('ada_apa_kediri') }}",
                data: function(d) {
                    d.kategori_id = $('#kategori').val();
                }
            },
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center'},
                {data: 'nama', name: 'nama', width: '20%'},
                {data: 'kategori', name: 'kategori', width: '20%', className: 'text-center'},
                {data: 'gambar', name: 'gambar', width: '20%', className: 'text-center'},
                {data: 'action', name: 'action', className: 'text-center'},
            ],
            initComplete: function() {
                $('.table-bordered').css('width', '100%');
            }
        });

        // Trigger DataTable reload when dropdown changes
        $('#kategori').on('change', function() {
            table.ajax.reload(); // Reload the table with the new filter
        });
    });
</script>
@endpush

<!-- MODAL DELETE -->
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
                    url:  "{{ url('/hapus-aset') }}/" + id,
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