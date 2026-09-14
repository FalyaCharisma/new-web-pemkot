import { useEffect, useState } from "react";
import {
    Activity,
    AlertTriangle,
    Clock,
    ExternalLink,
    Gauge,
    MapPin,
    Waves,
} from "lucide-react";

type GempaItem = {
    date?: string;
    time?: string;
    magnitude?: string;
    depth?: string;
    area?: string;
    latitude?: string;
    longitude?: string;
    potential?: string;
    headline?: string;
};

type GempaResponse = {
    success: boolean;
    data: {
        terkini?: {
            info?: GempaItem;
        };
        m5?: {
            info?: GempaItem[];
        };
        dirasakan?: {
            info?: GempaItem[];
        };
        tsunami?: {
            info?: GempaItem[];
        };
    };
};

type GempaCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    data: GempaItem[];
    link: string;
};

const BMKG_LINK = "https://www.bmkg.go.id/gempabumi";

function normalizeData(
    data: GempaItem | GempaItem[] | undefined
): GempaItem[] {
    if (!data) {
        return [];
    }

    return Array.isArray(data) ? data : [data];
}

function formatTanggal(date?: string, time?: string) {
    if (!date) {
        return "-";
    }

    const tanggal = new Date(`${date} ${time ?? ""}`);

    if (Number.isNaN(tanggal.getTime())) {
        return `${date} ${time ?? ""}`;
    }

    return tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function GempaCard({
    title,
    description,
    icon,
    color,
    data,
    link,
}: GempaCardProps) {
    return (
        <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4 d-flex flex-column">
                <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                        className={`rounded-3 d-flex align-items-center justify-content-center ${color}`}
                        style={{
                            width: 48,
                            height: 48,
                        }}
                    >
                        {icon}
                    </div>

                    <div>
                        <h5 className="fw-bold mb-1">{title}</h5>
                        <p className="small text-muted mb-0">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="d-flex flex-column gap-3 mb-4">
                    {data.slice(0, 3).map((item, index) => (
                        <div
                            key={`${item.date}-${item.time}-${index}`}
                            className="border-bottom pb-3"
                        >
                            <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                                <span className="badge text-bg-danger">
                                    M {item.magnitude ?? "-"}
                                </span>

                                <span className="small text-muted">
                                    {formatTanggal(
                                        item.date,
                                        item.time
                                    )}
                                </span>
                            </div>

                            <div className="d-flex gap-2 mb-1">
                                <MapPin
                                    size={16}
                                    className="text-muted flex-shrink-0"
                                />

                                <span className="small fw-semibold">
                                    {item.area ?? "Lokasi tidak tersedia"}
                                </span>
                            </div>

                            <div className="d-flex gap-3 flex-wrap">
                                <span className="small text-muted d-flex align-items-center gap-1">
                                    <Clock size={14} />
                                    {item.time ?? "-"}
                                </span>

                                <span className="small text-muted d-flex align-items-center gap-1">
                                    <Gauge size={14} />
                                    {item.depth ?? "-"}
                                </span>
                            </div>
                        </div>
                    ))}

                    {data.length === 0 && (
                        <div className="text-muted small">
                            Belum ada data gempa.
                        </div>
                    )}
                </div>

                <div className="mt-auto">
                    <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    >
                        Selengkapnya
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function GempaSection() {
    const [gempa, setGempa] = useState<GempaResponse["data"] | null>(
        null
    );

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGempa = async () => {
            try {
                const response = await fetch("/api/gempa", {
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Gagal mengambil data gempa.");
                }

                const result: GempaResponse = await response.json();

                if (!result.success) {
                    throw new Error("Data gempa tidak tersedia.");
                }

                setGempa(result.data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Terjadi kesalahan."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchGempa();
    }, []);

    if (loading) {
        return (
            <section className="py-5">
                <div className="container text-center">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />

                    <p className="text-muted mt-3 mb-0">
                        Memuat informasi gempa...
                    </p>
                </div>
            </section>
        );
    }

    if (error || !gempa) {
        return (
            <section className="py-5">
                <div className="container">
                    <div className="alert alert-warning mb-0">
                        {error ?? "Informasi gempa belum tersedia."}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="text-center mb-5">
                    <span className="badge text-bg-danger mb-3">
                        Informasi Kebencanaan
                    </span>

                    <h2 className="fw-bold mb-2">
                        Informasi Gempa Bumi
                    </h2>

                    <p className="text-muted mb-0">
                        Pantau informasi gempa bumi terkini di Indonesia
                        melalui data BMKG.
                    </p>
                </div>

                <div className="row g-4">
                    <div className="col-md-6 col-xl-3">
                        <GempaCard
                            title="Gempa Terkini"
                            description="Informasi gempa terbaru"
                            icon={
                                <Activity
                                    size={24}
                                    className="text-primary"
                                />
                            }
                            color="bg-primary-subtle"
                            data={normalizeData(gempa.terkini?.info)}
                            link={BMKG_LINK}
                        />
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <GempaCard
                            title="Magnitudo ≥ 5.0"
                            description="Gempa dengan magnitudo besar"
                            icon={
                                <Gauge
                                    size={24}
                                    className="text-danger"
                                />
                            }
                            color="bg-danger-subtle"
                            data={normalizeData(gempa.m5?.info)}
                            link={BMKG_LINK}
                        />
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <GempaCard
                            title="Gempa Dirasakan"
                            description="Gempa yang dirasakan masyarakat"
                            icon={
                                <AlertTriangle
                                    size={24}
                                    className="text-warning"
                                />
                            }
                            color="bg-warning-subtle"
                            data={normalizeData(gempa.dirasakan?.info)}
                            link={BMKG_LINK}
                        />
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <GempaCard
                            title="Potensi Tsunami"
                            description="Informasi potensi tsunami"
                            icon={
                                <Waves
                                    size={24}
                                    className="text-info"
                                />
                            }
                            color="bg-info-subtle"
                            data={normalizeData(gempa.tsunami?.info)}
                            link={BMKG_LINK}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}