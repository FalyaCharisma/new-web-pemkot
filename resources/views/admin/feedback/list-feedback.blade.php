@extends('admin.layouts.app')

@section('title', 'Feedback Masyarakat')

@section('content')

<div class="container">
    <div class="page-inner">
        <div class="page-header">
            <h3 class="fw-bold mb-3">Home</h3>
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
                    <a href="#">Feedback</a>
                </li>
                <li class="separator">
                    <i class="icon-arrow-right"></i>
                </li>
                <li class="nav-item">
                    <a href="#">List Feedback</a>
                </li>
            </ul>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="card" style="margin-top:20px;">
                    <div class="card-body" style="margin-top:20px;">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center">No.</th>
                                    <th class="text-center">Email</th>
                                    <th class="text-center">Rating</th>
                                    <th class="text-center">infoEase</th>
                                    <th class="text-center">infoAccuracy</th>
                                    <th class="text-center">infoClarity</th>
                                    <th class="text-center">infoCategory</th>
                                    <th class="text-center">infoSuggestion</th>
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

<script type="text/javascript">
    $(function () {
        var table = $('.table-bordered').DataTable({
    ajax: {
        url: "{{ route('list_feedback') }}",
        type: "GET",
        dataSrc: function (json) {
            console.log(json); // Debug respons di konsol
            return json.data; // Pastikan ini sesuai dengan struktur respons JSON
        }
    },
    columns: [
        {data: 'DT_RowIndex', name: 'DT_RowIndex', className: 'text-center', width:'10%'},
        {data: 'email', name: 'email'},
        {data: 'rating', name: 'rating', className: 'text-center'},
        {data: 'infoEase', name: 'infoEase', className: 'text-center'},
        {data: 'infoAccuracy', name: 'infoAccuracy', className: 'text-center'},
        {data: 'infoClarity', name: 'infoClarity', className: 'text-center'},
        {data: 'infoCategory', name: 'infoCategory', className: 'text-center'},
        {data: 'infoSuggestion', name: 'infoSuggestion', className: 'text-center'},
    ]
});
    
    });                                                                                                                                                                                                                                                         
</script>
@endpush

@endsection