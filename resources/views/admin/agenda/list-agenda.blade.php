@extends('admin.layouts.app')

@section('title', 'List Agenda')

@section('content')

    <div class="container">
        <div class="page-inner">

            <div class="page-header">
                <h3 class="fw-bold mb-3">Agenda</h3>

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
                        <a href="#">Agenda</a>
                    </li>

                    <li class="separator">
                        <i class="icon-arrow-right"></i>
                    </li>

                    <li class="nav-item">
                        <a href="#">List Agenda</a>
                    </li>

                </ul>
            </div>


            <div class="row">

                <div class="col-md-12">

                    <div class="card">

                        <div class="card-header">

                            <h4 class="card-title">
                                List Agenda
                            </h4>


                            <div class="d-flex justify-content-end mt-3">

                                <button type="button" class="btn btn-secondary" onclick="location.href='/form-agenda/add'">

                                    <span class="btn-label">

                                        <i class="fa fa-plus"></i>

                                    </span>

                                    Tambah Data

                                </button>

                            </div>

                        </div>



                        <div class="card-body">

                            <div class="table-responsive">

                                <table class="table table-bordered">

                                    <thead>

                                        <tr>

                                            <th>No.</th>

                                            <th>Judul Acara</th>

                                            <th>Tanggal</th>

                                            <th>Lokasi</th>

                                            <th width="15%">Action</th>

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

@endsection


@push('datatable')
    <script>
        $(function() {

            $('.table-bordered').DataTable({

                responsive: true,

                scrollX: true,

                processing: true,

                serverSide: true,

                autoWidth: false,

                ajax: "{{ route('list_agenda') }}",

                columns: [

                    {
                        data: 'DT_RowIndex',
                        name: 'DT_RowIndex',
                        className: 'text-center'
                    },

                    {
                        data: 'judul',
                        name: 'judul',
                        className: 'text-center'
                    },

                    {
                        data: 'tanggal',
                        name: 'tanggal',
                        className: 'text-center'
                    },

                    {
                        data: 'lokasi',
                        name: 'lokasi',
                        className: 'text-center'
                    },

                    {
                        data: 'action',
                        name: 'action',
                        className: 'text-center'
                    }

                ],

                initComplete: function() {

                    $('.table-bordered')
                        .css('width', '100%');

                }

            });

        });
    </script>




    <script>
        function deleteagendaConfirmation(id) {

            Swal.fire({

                title: 'Yakin ingin menghapus agenda ini?',

                icon: 'warning',

                showCancelButton: true,

                confirmButtonText: 'Ya, Hapus',

                cancelButtonText: 'Batal',

                confirmButtonColor: '#3085d6',

                cancelButtonColor: '#d33'


            }).then((result) => {


                if (result.isConfirmed) {



                    $.ajax({


                        type: 'POST',


                        url: "{{ url('/hapus-agenda') }}/" + id,


                        data: {

                            _token: $('meta[name="csrf-token"]')
                                .attr('content')

                        },


                        success: function(results) {


                            if (results.success) {


                                Swal.fire(

                                    'Berhasil',

                                    results.message,

                                    'success'

                                );


                                setTimeout(() => {

                                    location.reload();

                                }, 1000);

                            } else {


                                Swal.fire(

                                    'Error',

                                    results.message,

                                    'error'

                                );

                            }


                        }


                    });


                }



            });


        }
    </script>
@endpush
