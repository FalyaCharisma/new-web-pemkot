@extends('admin.layouts.app')

@section('title', 'List Featured Video')

@section('content')

    <div class="container">
        <div class="page-inner">

            <div class="page-header">

                <h3 class="fw-bold mb-3">
                    Featured Video
                </h3>

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
                        <a href="#">
                            Featured Video
                        </a>
                    </li>

                    <li class="separator">
                        <i class="icon-arrow-right"></i>
                    </li>

                    <li class="nav-item">
                        <a href="#">
                            List Video
                        </a>
                    </li>

                </ul>

            </div>



            <div class="row">

                <div class="col-md-12">


                    <div class="card">


                        <div class="card-header">


                            <h4 class="card-title">

                                List Featured Video

                            </h4>



                            <div class="d-flex justify-content-end mt-3">

                                <button type="button" class="btn btn-secondary" onclick="location.href='/form-video/add'">

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

                                            <th>Judul Video</th>

                                            <th>Link Video</th>

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
        <script>
            $(function() {


                $('.table-bordered').DataTable({


                    responsive: true,

                    scrollX: true,

                    processing: true,

                    serverSide: true,

                    autoWidth: false,


                    ajax: "{{ route('list_video') }}",


                    columns: [


                        {

                            data: 'DT_RowIndex',

                            name: 'DT_RowIndex',

                            className: 'text-center'

                        },

                        {

                            data: 'title',

                            name: 'title',

                            className: 'text-center'

                        },

                        {

                            data: 'video_url',

                            name: 'video_url',

                            className: 'text-center'

                        },


                        {

                            data: 'action',

                            name: 'action',

                            className: 'text-center'

                        },


                    ]


                });



            });
        </script>




        <script>
            function deleteVideoConfirmation(id) {


                Swal.fire({
                    title: 'Yakin ingin menghapus video ini?',
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
                            url: "{{ url('/hapus-video') }}/" + id,
                            data: {
                                _token: $('meta[name="csrf-token"]').attr('content')
                            },
                            success: function(res) {
                                if (res.success) {
                                    Swal.fire(
                                        'Berhasil',
                                        res.message,
                                        'success'
                                    );
                                    setTimeout(() => {
                                        location.reload();
                                    }, 1000);
                                }
                            }

                        });
                    }
                });
            }
        </script>
    @endpush
@endsection
