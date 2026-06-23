import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="container">
                <div className="page-inner">
                    <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                        <div>
                            <h3 className="fw-bold mb-3">Dashboard</h3>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-8">
                            <div className="card card-round">
                                <div className="card-header">
                                    <div className="card-head-row">
                                        <div className="card-title">
                                            User Statistics
                                        </div>

                                        <div className="card-tools">
                                            <button className="btn btn-label-success btn-round btn-sm me-2">
                                                <span className="btn-label">
                                                    <i className="fa fa-pencil"></i>
                                                </span>
                                                Export
                                            </button>

                                            <button className="btn btn-label-info btn-round btn-sm">
                                                <span className="btn-label">
                                                    <i className="fa fa-print"></i>
                                                </span>
                                                Print
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div
                                        className="chart-container"
                                        style={{ minHeight: "375px" }}
                                    >
                                        <canvas id="statisticsChart"></canvas>
                                    </div>

                                    <div id="myChartLegend"></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card card-primary card-round">
                                <div className="card-header">
                                    <div className="card-head-row">
                                        <div className="card-title">
                                            Daily Sales
                                        </div>

                                        <div className="card-tools">
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-sm btn-label-light dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    Export
                                                </button>

                                                <div className="dropdown-menu">
                                                    <button className="dropdown-item">
                                                        Action
                                                    </button>
                                                    <button className="dropdown-item">
                                                        Another action
                                                    </button>
                                                    <button className="dropdown-item">
                                                        Something else here
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-category">
                                        March 25 - April 02
                                    </div>
                                </div>

                                <div className="card-body pb-0">
                                    <div className="mb-4 mt-2">
                                        <h1>$4,578.58</h1>
                                    </div>

                                    <div className="pull-in">
                                        <canvas id="dailySalesChart"></canvas>
                                    </div>
                                </div>
                            </div>

                            <div className="card card-round">
                                <div className="card-body pb-0">
                                    <div className="h1 fw-bold float-end text-primary">
                                        +5%
                                    </div>

                                    <h2 className="mb-2">17</h2>

                                    <p className="text-muted">
                                        Users online
                                    </p>

                                    <div className="pull-in sparkline-fix">
                                        <div id="lineChart"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}