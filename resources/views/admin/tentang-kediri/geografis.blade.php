@extends('admin.layouts.app')

@section('title', $titlepage)

@section('content')

    <div class="container">
        <div class="page-inner">

            <div class="page-header">
                <h3 class="fw-bold mb-3">{{ $titlepage }}</h3>
            </div>
            <div class="row">
               <div class="col-md-4">

    <div class="card">

        <div class="card-header">
            <h5 class="mb-0">
                Statistik Kota
            </h5>
        </div>


        <form action="{{ route('update_statistik_kota') }}" method="POST">

            @csrf

            <div class="card-body">

                <div class="form-group mb-3">
                    <label>Luas Wilayah (km²)</label>

                    <input
                        type="text"
                        name="luas"
                        class="form-control"
                        value="{{ $statistik['luas'] ?? '' }}"
                    >
                </div>

                <div class="form-group mb-3">
                    <label>Laki-laki</label>

                    <input
                        type="text"
                        name="laki"
                        class="form-control"
                        value="{{ $statistik['laki'] ?? '' }}"
                    >
                </div>



                <div class="form-group">

                    <label>Perempuan</label>

                    <input
                        type="text"
                        name="perempuan"
                        class="form-control"
                        value="{{ $statistik['perempuan'] ?? '' }}"
                    >

                </div>



            </div>



            <div class="card-footer">

                <button class="btn btn-secondary w-100">

                    <i class="fa fa-paper-plane"></i>

                    Simpan

                </button>

            </div>


        </form>

    </div>

</div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">
                                Letak Geografis
                            </h5>
                            <button class="btn btn-secondary" onclick="addGeo()">
                                <i class="fas fa-plus"></i>
                                Tambah
                            </button>
                        </div>
                        <div class="card-body">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th width="5%">No</th>
                                        <th>Deskripsi</th>
                                        <th width="15%">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($geografis as $item)
                                        <tr>
                                            <td>
                                                {{ $loop->iteration }}
                                            </td>
                                            <td>
                                                {{ $item->deskripsi }}

                                            </td>
                                            <td>
                                                <button class="btn btn-warning btn-sm"
                                                    onclick="editGeo({{ $item->id }})">

                                                    <i class="fas fa-pen"></i>
                                                </button>
                                                <button class="btn btn-danger btn-sm"
                                                    onclick="deleteGeo({{ $item->id }})">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- MODAL -->

            <div class="modal fade" id="modalGeo">

                <div class="modal-dialog modal-dialog-centered">

                    <div class="modal-content">


                        <form action="{{ route('update_geografis') }}" method="POST">

                            @csrf



                            <input type="hidden" name="id" id="geo_id">



                            <div class="modal-header">

                                <h5 class="modal-title">

                                    Tambah Geografis

                                </h5>


                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>

                            </div>



                            <div class="modal-body">


                                <div class="form-group">

                                    <label>

                                        Deskripsi

                                    </label>


                                    <input type="text" name="deskripsi" id="geo_desc" class="form-control" required>


                                </div>


                            </div>




                            <div class="modal-footer">


                                <button type="submit" class="btn btn-primary">

                                    Simpan

                                </button>



                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">

                                    Tutup

                                </button>



                            </div>


                        </form>


                    </div>

                </div>

            </div>




        </div>
    </div>



    <script>
        function addGeo() {

            $('#geo_id').val('');

            $('#geo_desc').val('');


            $('.modal-title').html(

                'Tambah Letak Geografis'

            );


            new bootstrap.Modal(

                document.getElementById('modalGeo')

            ).show();

        }





        function editGeo(id) {


            $.ajax({

                url: "{{ url('/value-geografis') }}/" + id,


                type: 'GET',


                success: function(res) {


                    $('#geo_id').val(res.id);

                    $('#geo_desc').val(res.deskripsi);



                    $('.modal-title').html(

                        'Edit Letak Geografis'

                    );



                    new bootstrap.Modal(

                        document.getElementById('modalGeo')

                    ).show();


                }


            });


        }





        function deleteGeo(id) {


            Swal.fire({

                title: 'Yakin menghapus data?',


                icon: 'warning',


                showCancelButton: true,


                confirmButtonText: 'Ya',


                cancelButtonText: 'Batal'


            }).then((result) => {


                if (result.isConfirmed) {


                    $.ajax({


                        url: "{{ url('/hapus-geografis') }}/" + id,


                        type: 'POST',


                        data: {


                            _token: $('meta[name="csrf-token"]').attr('content')


                        },


                        success: function(res) {


                            Swal.fire(

                                'Berhasil',

                                res.message,

                                'success'

                            );



                            setTimeout(function() {

                                location.reload();

                            }, 1000);



                        }


                    });


                }


            });


        }
    </script>

@endsection
