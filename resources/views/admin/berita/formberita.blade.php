@extends('admin.layouts.app')

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Berita</h3>
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
                <a href="#">Berita</a>
            </li>
            <li class="separator">
                <i class="icon-arrow-right"></i>
            </li>
            <li class="nav-item">
                <a href="#">Form Berita</a>
            </li>
           
            </ul>
        </div>
        
        <div class="row">
            <form action="{{ route('update_berita') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="col-lg-12 my-3">
                    <button type="button" class="btn btn-danger" onclick="window.history.back();">
                        <i class="fa fa-arrow-left me-2"></i> Kembali
                    </button>
                    <button type="submit" id="simpan" name="status_published" value="0" class="btn btn-warning">
                        <i class="fas fa-save"></i> Draft
                    </button>
                    <button type="submit" id="simpan" name="status_published" value="1" class="btn btn-primary ">
                        <i class="fas fa-arrow-up"></i> Publish
                    </button>
                    <button type="button" class="btn btn-warning" onclick="location.href='/list-kategori-berita'">
                            <span class="btn-label">
                                <i class="fa fa-list me-2"></i>
                            </span>
                            List Kategori
                    </button>

                </div>

                <div class="row">
                    <div class="col-md-6 mt-2">
                        <div class="card card-stats card-round">
                            <div class="card-body">
                                <div class="form-group">
                                    <input type="hidden" id="id" name="id" value="{{ $berita ? $berita->id : '' }}">
                                    <label for="judul" class="form-label">Judul Berita:</label>
                                    <textarea class="form-control" id="judul" name="judul" required>{{ $berita == [] ? '' : $berita['judul'] }}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="id_kategori" class="form-label">Kategori</label>
                                    <select class="form-control select2" id="kategori" name="id_kategori" required>
                                        <option disabled {{ empty($berita['id_kategori']) ? 'selected' : '' }}>Pilih Kategori</option>
                                        @foreach ($kategori as $item)
                                        <option value="{{ $item->id }}" {{ (!empty($berita['id_kategori']) && $berita['id_kategori'] == $item->id) ? 'selected' : '' }}>
                                            {{ $item->nama_kategori }}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="deskripsi" class="mb-2 form-label">Deskripsi:</label>
                                    <textarea class="my-editor" id="my-editor" name="deskripsi">{{ $berita == [] ? '' : $berita['deskripsi'] }}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 mt-2">
                        <div class="card card-stats card-round">
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="tanggal" class="form-label">Tanggal</label>
                                    <input type="date" class="form-control" name="tanggal" value="{{ $berita == [] ? '' : $berita['tanggal'] }}">
                                </div>
                                <div class="form-group">
                                    <div id="fotoberita-preview" class="text-center">
                                        <img src="{{ empty($berita) ? asset('assets/images/noimage.png') : asset('storage/berita/' . $berita['images']) }}" width="50%">
                                    </div>
                                    <label for="images" class="form-label">Upload Gambar:</label>
                                    <input type="hidden" class="form-control" name="gambarlama" id="gambarlama" value="{{ empty($berita) ? null : $berita['images'] }}" required/>
                                    <input type="file" name="images" id="images" class="form-control"  @if(empty($berita)) required @endif />
                                    <p id="logowarning" class="logowarning text-danger">
                                        <i>* Tipe file harus berupa .jpg, .png, .jpeg, .webp, .svg dengan size max 2MB</i><br>
                                    </p>
                                </div>
                                <div class="form-group">
                                    <label for="eksklusif" class="form-label">
                                        <input type="checkbox" name="eksklusif" value="1" {{ isset($berita['eksklusif']) && $berita['eksklusif'] == 1 ? 'checked' : '' }}> Berita Eksklusif
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    // LOGO PREVIEW BERITA
    const fotoberitaPreview = document.getElementById("fotoberita-preview");
    const fotoFile = document.getElementById("images");

    fotoFile.addEventListener("change", function () {
        getImgData();
    });

    function getImgData() {
        const foto = fotoFile.files[0];
        if (foto) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(foto);
            fileReader.addEventListener("load", function () {
                fotoberitaPreview.style.display = "block";
                fotoberitaPreview.innerHTML = '<img src="' + this.result + '" style="width:70%;"/>';
            }); 
        }
    }
</script>

<!-- MODAL DELETE Foto -->
<script>
    function deletefotoConfirmation(id) {
        Swal.fire({
            title: 'Yakin ingin menghapus foto berita ini?',
            confirmButtonText: 'Ya, Hapus',
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Batal"
            }).then((result) => {
            if (result.isConfirmed) {
                console.log("Hapus ID: " + id);
                var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
                // var url = "{{url('/imgslider-status')}}/" + id
                $.ajax({
                    type: 'POST',
                    url:  "{{ url('/hapus-foto-berita') }}/" + id,
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
