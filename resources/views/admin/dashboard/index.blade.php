@extends('admin.layouts.app')

@section('title', 'Dashboard')

@section('content')
<div class="container">
    <div class="page-inner">
        <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
            <div>
            <h3 class="fw-bold mb-3">Dashboard</h3>
            </div>
        </div>
        <!-- <div class="row">
            <div class="col-md-8">
            <div class="card card-round">
                <div class="card-header">
                <div class="card-head-row">
                    <div class="card-title">User Statistics</div>
                    <div class="card-tools">
                    </div>
                </div>
                </div>
                <div class="card-body">
                <div class="chart-container" style="min-height: 375px">
                    <canvas id="statisticsChart"></canvas>
                </div>
                <div id="myChartLegend"></div>
                </div>
            </div>
            </div>
            <div class="col-md-4">

    <div class="card card-round mb-3">
        <div class="card-body text-center">
            <h5>Visitor Online</h5>
            <h2 class="text-success">
                {{ number_format($analytics['onlineUsers']) }}
            </h2>
        </div>
    </div>

    <div class="card card-round mb-3">
        <div class="card-body text-center">
            <h5>Visitor Hari Ini</h5>
            <h2 class="text-primary">
                {{ number_format($analytics['todayUsers']) }}
            </h2>
        </div>
    </div>

    <div class="card card-round mb-3">
        <div class="card-body text-center">
            <h5>Total Visitor (30 Hari)</h5>
            <h2 class="text-warning">
                {{ number_format($analytics['totalUsers']) }}
            </h2>
        </div>
    </div>

    <div class="card card-round">
        <div class="card-body text-center">
            <h5>Page Views Hari Ini</h5>
            <h2 class="text-danger">
                {{ number_format($analytics['pageViews']) }}
            </h2>
        </div>
    </div>

</div> -->
        </div>
    </div>
</div>
@endsection