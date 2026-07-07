<?php

namespace App\Http\Controllers;
use App\Services\GoogleAnalyticsService;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(GoogleAnalyticsService $ga) 
    {
        $analytics = $ga->getDashboardStatistics();
        $chart = $ga->getVisitorsChart();
        return view('admin.dashboard.index', compact('analytics', 'chart'));
    }
}
