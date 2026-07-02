<?php

namespace App\Services;

use Google\Analytics\Data\V1beta\Client\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Metric;
use Google\Analytics\Data\V1beta\RunRealtimeReportRequest;
use Google\Analytics\Data\V1beta\RunReportRequest;
use Illuminate\Support\Facades\Cache;

class GoogleAnalyticsService
{
    protected BetaAnalyticsDataClient $client;

    public function __construct()
    {
        $this->client = new BetaAnalyticsDataClient([
            'credentials' => base_path(
                config('services.google_analytics.credentials')
            ),
        ]);
    }

    protected function property(): string
    {
        return 'properties/' . config('services.google_analytics.property_id');
    }

    public function statistics(): array
    {
        return Cache::remember('ga_statistics', now()->addMinutes(10), function () {

            /*
             |-------------------------------
             | Realtime
             |-------------------------------
             */

            $realtime = $this->client->runRealtimeReport(
                (new RunRealtimeReportRequest())
                    ->setProperty($this->property())
                    ->setMetrics([
                        new Metric([
                            'name' => 'activeUsers'
                        ])
                    ])
            );

            $online = 0;

            if ($realtime->getRows()->count()) {
                $online = (int) $realtime
                    ->getRows()[0]
                    ->getMetricValues()[0]
                    ->getValue();
            }

            /*
             |-------------------------------
             | Total Visitors
             |-------------------------------
             */

            $report = $this->client->runReport(
                (new RunReportRequest())
                    ->setProperty($this->property())
                    ->setDateRanges([
                        new DateRange([
                            'start_date' => '2025-01-01',
                            'end_date' => 'today',
                        ])
                    ])
                    ->setMetrics([
                        new Metric([
                            'name' => 'totalUsers'
                        ])
                    ])
            );

            $total = 0;

            if ($report->getRows()->count()) {
                $total = (int) $report
                    ->getRows()[0]
                    ->getMetricValues()[0]
                    ->getValue();
            }

            return [
                'online' => $online,
                'totalVisitors' => $total,
                'updated_at' => now()->toDateTimeString(),
            ];
        });
    }
}