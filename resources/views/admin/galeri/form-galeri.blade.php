@extends('admin.layouts.app')

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">{{ $titlepage }}</h3>
            <ul class="breadcrumbs mb-3">
                <li class="nav-home">
                    <a href="#"><i class="icon-home"></i></a>
                </li>
                <li class="separator"><i class="icon-arrow-right"></i></li>
                <li class="nav-item"><a href="#">Galeri</a></li>
                <li class="separator"><i class="icon-arrow-right"></i></li>
                <li class="nav-item"><a href="#">Form Galeri</a></li>
            </ul>
        </div>

        <div class="row">
            <div class="col-lg-12 my-3">
                <button type="button" class="btn btn-danger" onclick="window.location.href='/list-galeri';">
                    <i class="fa fa-arrow-left me-2"></i> Kembali
                </button>
            </div>

            @include('admin.validation')

            @if (session('success'))
                <div class="col-lg-12">
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        {{ session('success') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
            @endif

            <div class="col-lg-12">
                <div class="card" style="margin-top:20px;">
                    <div class="card-header">
                        <h4 class="card-title mb-0">Data Album</h4>
                    </div>
                    <div class="card-body" style="margin-top:20px;">
                        <form action="{{ route('update_album') }}" method="POST">
                            @csrf
                            <input type="hidden" name="id" value="{{ $album->id ?? '' }}">

                            <div class="mb-3">
                                <label for="judul_album" class="form-label">Judul Album</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="judul_album"
                                    name="judul_album"
                                    value="{{ old('judul_album', $album->judul ?? '') }}"
                                    placeholder="Masukkan judul album"
                                    required
                                >
                            </div>

                            <button type="submit" class="btn btn-secondary">
                                <i class="fa fa-save me-2"></i>
                                {{ $album ? 'Update Album' : 'Simpan Album' }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            @if ($album)
                <div class="col-lg-12">
                    <div class="card" style="margin-top:20px;">
                        <div class="card-header">
                            <h4 class="card-title mb-0">Tambah Foto</h4>
                        </div>
                        <div class="card-body" style="margin-top:20px;">
                            <form action="{{ route('store_foto_galeri') }}" method="POST">
                                @csrf
                                <input type="hidden" name="id_album" value="{{ $album->id }}">

                                <div class="row">
                                    <div class="col-md-4 mb-3">
                                        <label for="nama_foto" class="form-label">Nama Foto</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="nama_foto"
                                            name="nama_foto"
                                            value="{{ old('nama_foto') }}"
                                            placeholder="Contoh: Alun-alun Kota Kediri"
                                            required
                                        >
                                    </div>

                                    <div class="col-md-8 mb-3">
                                        <label for="foto" class="form-label">Link Foto</label>
                                        <input
                                            type="url"
                                            class="form-control"
                                            id="foto"
                                            name="foto"
                                            value="{{ old('foto') }}"
                                            placeholder="https://contoh.com/foto.jpg"
                                            required
                                        >
                                        <small class="text-muted">Masukkan URL contoh https://domain.com/foto.jpg</small>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary">
                                    <i class="fa fa-plus me-2"></i> Tambah Foto
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-lg-12">
                    <div class="card" style="margin-top:20px;">
                        <div class="card-header">
                            <h4 class="card-title mb-0">Daftar Foto Album</h4>
                        </div>
                        <div class="card-body" style="margin-top:20px;">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="foto-table">
                                    <thead>
                                        <tr>
                                            <th class="text-center">No.</th>
                                            <th class="text-center">Nama Foto</th>
                                            <th class="text-center">Preview</th>
                                            <th class="text-center">Link Foto</th>
                                            <th class="text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            @else
            @endif
        </div>
    </div>
</div>

@if ($album)
<div class="modal fade" id="editFotoModal" tabindex="-1" aria-labelledby="editFotoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editFotoModalLabel">Edit Foto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="editFotoForm" method="POST">
                @csrf
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="edit_nama_foto" class="form-label">Nama Foto</label>
                        <input type="text" class="form-control" id="edit_nama_foto" name="nama_foto" required>
                    </div>

                    <div class="mb-3">
                        <label for="edit_foto" class="form-label">Link Foto</label>
                        <input type="url" class="form-control" id="edit_foto" name="foto" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary"><i class="bi bi-save2"></i> Simpan Perubahan</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endif

@if ($album)
@push('datatable')
<script type="text/javascript">
    $(function () {
        $('#foto-table').DataTable({
            responsive: true,
            scrollX: true,
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: "{{ url('/data-foto') }}/{{ $album->id }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex'},
                {data: 'nama_foto', name: 'nama_foto'},
                {data: 'foto', name: 'foto', orderable: false, searchable: false},
                {data: 'link_foto', name: 'link_foto'},
                {data: 'action', name: 'action', orderable: false, searchable: false},
            ],
            columnDefs: [
                {
                    targets: [0, 1, 2, 3, 4],
                    className: 'text-center'
                }
            ],
            initComplete: function() {
                $('#foto-table').css('width', '100%');
            }
        });
    });

    function editFoto(id, namaFoto, fotoUrl) {
        $('#edit_nama_foto').val(namaFoto || '');
        $('#edit_foto').val(fotoUrl || '');
        $('#editFotoForm').attr('action', '/update-foto-galeri/' + id);
        new bootstrap.Modal(document.getElementById('editFotoModal')).show();
    }

    function deletefotoConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus foto ini?',
            confirmButtonText: 'Ya, Hapus',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

                $.ajax({
                    type: 'POST',
                    url: "{{ url('/hapus-foto') }}/" + id,
                    data: {
                        _token: CSRF_TOKEN
                    },
                    dataType: 'JSON',
                    success: function (results) {
                        if (results.success === true) {
                            Swal.fire('Berhasil!', results.message, 'success');
                            $('#foto-table').DataTable().ajax.reload(null, false);
                        } else {
                            Swal.fire('Error!', results.message, 'error');
                        }
                    },
                    error: function () {
                        Swal.fire('Error!', 'Terjadi kesalahan saat menghapus foto.', 'error');
                    }
                });
            }
        });
    }
</script>
@endpush
@endif

@endsection
