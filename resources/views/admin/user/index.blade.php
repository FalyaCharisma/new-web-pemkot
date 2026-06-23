@extends('admin.layouts.app')

@section('content')

<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">User</h3>
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
                <a href="#">User</a>
            </li>
            <li class="separator">
                <i class="icon-arrow-right"></i>
            </li>
            <li class="nav-item">
                <a href="#">List User</a>
            </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card" style="margin-top:20px;">
                    <div class="card-body" style="margin-top:20px;">
                        <!-- Modal Add -->
                        <div class="modal fade" id="adduser" tabindex="-1">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Tambah User</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form action="/update-user" method="POST" enctype="multipart/form-data" id="formuser">
                                    @csrf
                                        <div class="modal-body">
                                            <input type="hidden" class="form-control" name="id" id="id">
                                            <div class="row mb-3">
                                                <label for="Nama" class="col-sm-3 col-form-label">Nama</label>
                                                <div class="col-sm-9 mt-2">
                                                    <input type="text" class="form-control" name="name" id="name">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label for="Username" class="col-sm-3 col-form-label">Username</label>
                                                <div class="col-sm-9 mt-2">
                                                    <input type="text" class="form-control" name="username" id="username">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label for="Email" class="col-sm-3 col-form-label">Email</label>
                                                <div class="col-sm-9 mt-2">
                                                    <input type="text" class="form-control" name="email" id="email">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label for="Password" class="col-sm-3 col-form-label">Password</label>
                                                <div class="col-sm-9 mt-2">
                                                    <div class="input-group">
                                                        <input type="password" class="form-control" name="password" id="password" placeholder="Masukkan Password">
                                                        <span class="input-group-text" id="togglePassword" style="cursor: pointer;">
                                                            <i class="fa fa-eye"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="submit" class="btn btn-primary">Simpan</button>
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <h5 class="card-title" style="margin-bottom:70px;">
                            <button type="button" class="btn btn-primary" style="float:left;" onclick="addUser()"><i class="fas fa-plus-square"></i> Tambah User</button>
                        </h5>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center">No.</th>
                                    <th class="text-center">Username</th>
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

@push('datatable')
<script>
    $(function () {
        var table = $('.table-bordered').DataTable({
            responsive: true,
            "scrollX": true,
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: "{{ route('list_user') }}",
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center', width:'10%'},
                {data: 'username', name: 'username'},
                {data: 'action', name: 'action', orderable: false, searchable: false, className: 'text-center'},
            ],
            columnDefs: [
                {
                    targets:[0,2],
                    className: "text-center"
                }
            ]
        });
    })
</script>
@endpush

<script>
    // Modal Add
    function addUser() {
        new bootstrap.Modal($("#adduser")).show();
        $('#id').val('');
        $('#name').val('');
        $('#username').val('');
        $('#email').val('');
        $('#password').val('');
    }

    // Modal Edit
    function edituser(id){
        $.ajax({
            type: 'GET',
            url: "{{ url('/value-user') }}/" + id,
            dataType: 'json',
            success: function(response) {
                console.log(response)
                new bootstrap.Modal($("#adduser")).show();
                $("#adduser .modal-title").html("Edit User");
                $('id').val(response.id);
                $('#name').val(response.name);
                $('#username').val(response.username);
                $('#email').val(response.email);
                $('#password').val(response.password);
            }
        })
    }
</script>

<script>
    document.getElementById('togglePassword').addEventListener('click', function () {
        const passwordInput = document.getElementById('password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Toggle ikon mata dan mata tertutup
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
</script>
@endsection