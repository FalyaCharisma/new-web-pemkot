<?php

namespace App\Services;

use Google\Analytics\Data\V1beta\Client\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Metric;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\RunRealtimeReportRequest;
use Google\Analytics\Data\V1beta\RunReportRequest;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GoogleAnalyticsService
{
    protected ?BetaAnalyticsDataClient $client = null;

    public function __construct()
    {
        try {
            $this->client = new BetaAnalyticsDataClient([
                'credentials' => base_path(
                    config('services.google_analytics.credentials')
                ),
            ]);
        } catch (\Throwable $e) {
            Log::error('Gagal menginisialisasi Google Analytics', [
                'message' => $e->getMessage(),
            ]);
        }
    }

    protected function property(): string
    {
        return 'properties/' . config('services.google_analytics.property_id');
    }

    /**
     * Statistik untuk footer website
     */
    public function statistics(): array
    {
        return Cache::remember(
            'ga_statistics',
            now()->addMinutes(10),
            function () {
                try {
                    if (!$this->client) {
                        return $this->fallbackStatistics();
                    }

                    $realtime = $this->client->runRealtimeReport(
                        (new RunRealtimeReportRequest())
                            ->setProperty($this->property())
                            ->setMetrics([
                                new Metric([
                                    'name' => 'activeUsers',
                                ]),
                            ])
                    );

                    $online = 0;

                    if ($realtime->getRows()->count() > 0) {
                        $online = (int) $realtime
                            ->getRows()[0]
                            ->getMetricValues()[0]
                            ->getValue();
                    }

                    $report = $this->client->runReport(
                        (new RunReportRequest())
                            ->setProperty($this->property())
                            ->setDateRanges([
                                new DateRange([
                                    'start_date' => '2025-01-01',
                                    'end_date' => 'today',
                                ]),
                            ])
                            ->setMetrics([
                                new Metric([
                                    'name' => 'totalUsers',
                                ]),
                            ])
                    );

                    $total = 0;

                    if ($report->getRows()->count() > 0) {
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
                } catch (\Throwable $e) {
                    Log::error('Google Analytics statistics gagal diakses', [
                        'message' => $e->getMessage(),
                    ]);

                    return $this->fallbackStatistics();
                }
            }
        );
    }

    /**
     * Statistik Dashboard
     */
    public function getDashboardStatistics(): array
    {
        return Cache::remember(
            'ga_dashboard_statistics',
            now()->addMinutes(10),
            function () {
                try {
                    if (!$this->client) {
                        return $this->fallbackDashboardStatistics();
                    }

                    $today = $this->client->runReport(
                        (new RunReportRequest())
                            ->setProperty($this->property())
                            ->setDateRanges([
                                new DateRange([
                                    'start_date' => 'today',
                                    'end_date' => 'today',
                                ]),
                            ])
                            ->setMetrics([
                                new Metric([
                                    'name' => 'activeUsers',
                                ]),
                                new Metric([
                                    'name' => 'screenPageViews',
                                ]),
                                new Metric([
                                    'name' => 'sessions',
                                ]),
                            ])
                    );

                    $todayUsers = 0;
                    $pageViews = 0;
                    $sessions = 0;

                    if ($today->getRows()->count() > 0) {
                        $metrics = $today->getRows()[0]->getMetricValues();

                        $todayUsers = (int) ($metrics[0]->getValue() ?? 0);
                        $pageViews = (int) ($metrics[1]->getValue() ?? 0);
                        $sessions = (int) ($metrics[2]->getValue() ?? 0);
                    }

                    $totalReport = $this->client->runReport(
                        (new RunReportRequest())
                            ->setProperty($this->property())
                            ->setDateRanges([
                                new DateRange([
                                    'start_date' => '2025-01-01',
                                    'end_date' => 'today',
                                ]),
                            ])
                            ->setMetrics([
                                new Metric([
                                    'name' => 'totalUsers',
                                ]),
                            ])
                    );

                    $totalUsers = 0;

                    if ($totalReport->getRows()->count() > 0) {
                        $totalUsers = (int) $totalReport
                            ->getRows()[0]
                            ->getMetricValues()[0]
                            ->getValue();
                    }

                    $realtime = $this->client->runRealtimeReport(
                        (new RunRealtimeReportRequest())
                            ->setProperty($this->property())
                            ->setMetrics([
                                new Metric([
                                    'name' => 'activeUsers',
                                ]),
                            ])
                    );

                    $onlineUsers = 0;

                    if ($realtime->getRows()->count() > 0) {
                        $onlineUsers = (int) $realtime
                            ->getRows()[0]
                            ->getMetricValues()[0]
                            ->getValue();
                    }

                    return [
                        'todayUsers' => $todayUsers,
                        'pageViews' => $pageViews,
                        'sessions' => $sessions,
                        'totalUsers' => $totalUsers,
                        'onlineUsers' => $onlineUsers,
                    ];
                } catch (\Throwable $e) {
                    Log::error('Google Analytics dashboard gagal diakses', [
                        'message' => $e->getMessage(),
                    ]);

                    return $this->fallbackDashboardStatistics();
                }
            }
        );
    }

    /**
     * Grafik Visitor 30 Hari
     */
    public function getVisitorsChart(): array
    {
        return Cache::remember(
            'ga_visitors_chart',
            now()->addMinutes(30),
            function () {
                try {
                    if (!$this->client) {
                        return $this->fallbackVisitorsChart();
                    }

                    $report = $this->client->runReport(
                        (new RunReportRequest())
                            ->setProperty($this->property())
                            ->setDateRanges([
                                new DateRange([
                                    'start_date' => '30daysAgo',
                                    'end_date' => 'today',
                                ]),
                            ])
                            ->setDimensions([
                                new Dimension([
                                    'name' => 'date',
                                ]),
                            ])
                            ->setMetrics([
                                new Metric([
                                    'name' => 'activeUsers',
                                ]),
                            ])
                    );

                    $labels = [];
                    $values = [];

                    foreach ($report->getRows() as $row) {
                        $labels[] = $row
                            ->getDimensionValues()[0]
                            ->getValue();

                        $values[] = (int) $row
                            ->getMetricValues()[0]
                            ->getValue();
                    }

                    return [
                        'labels' => $labels,
                        'values' => $values,
                    ];
                } catch (\Throwable $e) {
                    Log::error('Google Analytics grafik gagal diakses', [
                        'message' => $e->getMessage(),
                    ]);

                    return $this->fallbackVisitorsChart();
                }
            }
        );
    }

    /**
     * Fallback statistik footer
     */
    protected function fallbackStatistics(): array
    {
        return [
            'online' => 0,
            'totalVisitors' => 0,
            'updated_at' => now()->toDateTimeString(),
        ];
    }

    /**
     * Fallback statistik dashboard
     */
    protected function fallbackDashboardStatistics(): array
    {
        return [
            'todayUsers' => 0,
            'pageViews' => 0,
            'sessions' => 0,
            'totalUsers' => 0,
            'onlineUsers' => 0,
        ];
    }

    /**
     * Fallback grafik visitor
     */
    protected function fallbackVisitorsChart(): array
    {
        return [
            'labels' => [],
            'values' => [],
        ];
    }
}