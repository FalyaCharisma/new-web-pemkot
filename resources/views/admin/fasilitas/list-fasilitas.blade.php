@extends('admin.layouts.app')

@section('title', 'Fasilitas & Infrastruktur')

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
                    <a href="#">{{ $titlepage }}</a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">List Fasilitas Kota</h4>
                        <div class="d-flex justify-content-end mt-3">
                            <div class="me-4">
                                <select class="form-control" id="kategori" name="kategori" required>
                                    <option disabled selected>Pilih Kategori Fasilitas</option>
                                    @foreach ($kategori as $item)
                                        <option value="{{ $item['id'] }}">
                                            {{ $item['nama_kategori'] }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div>
                                <button type="button" class="btn btn-secondary" onclick="location.href='/form-fasilitas/add'">
                                    <span class="btn-label">
                                        <i class="fa fa-plus"></i>
                                    </span>
                                    Tambah Data
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead> 
                                    <tr>
                                        <th>No.</th>
                                        <th>Nama</th>
                                        <th>Kategori</th>
                                        <th>Sub Kategori</th>
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
                url: "{{ route('list_fasilitas') }}",
                data: function (d) {
                    d.kategori = $('#kategori').val(); // Kirim nilai kategori yang dipilih
                }
            },
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center', width: '5%'},
                {data: 'nama', name: 'nama'},
                {data: 'kategori', name: 'kategori'},
                {data: 'sub_kategori', name: 'sub_kategori'},
                {data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-center'},
            ],
            columnDefs: [
                {
                    targets: [0, 4],
                    className: "text-center"
                }
            ]
        });

        // Reload tabel saat dropdown kategori diubah
        $('#kategori').change(function () {
            table.ajax.reload();
        });
    });
</script>

@endpush

<script>
    // Modal Delete Fasilitas
    function deleteConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus Fasilitas ini?',
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
                    url:  "{{ url('/hapus-fasilitas') }}/" + id,
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