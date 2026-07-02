<?php

namespace App\Http\Controllers;

use App\Services\GoogleAnalyticsService;

class AnalyticsController extends Controller
{
  public function statistics(GoogleAnalyticsService $analytics)
{
    return response()->json(
        $analytics->statistics()
    );
}
}