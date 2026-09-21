import { useEffect, useState } from "react";
import {
    Activity,
    AlertCircle,
    ArrowUpRight,
    ArrowRight,
    Compass,
    MapPin,
    Waves,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import { SectionLabel } from "./SectionLabel";

interface GempaItem {
    identifier?: string;
    sender?: string;
    sent?: string;
    status?: string;
    msgType?: string;
    scope?: string;
    code?: string;

    event?: string;
    date?: string;
    time?: string;
    latitude?: string | null;
    longitude?: string | null;
    magnitude?: string | null;
    depth?: string | null;
    area?: string | null;
    eventid?: string;
    potential?: string | null;
    subject?: string;
    headline?: string;
    description?: string;
    instruction?: string;
    shakemap?: string;
    felt?: string | null;

    point?: {
        coordinates?: string | null;
    } | null;
}

type GempaApiData<T> = {
    identifier?: string;
    info?: T;
};

type GempaResponse = {
    success: boolean;
    message?: string;
    data?: {
        terkini?: GempaApiData<GempaItem>;
        m5?: GempaApiData<GempaItem[]>;
        dirasakan?: GempaApiData<GempaItem[]>;
        tsunami?: GempaApiData<GempaItem[]>;
    };
};

type GempaCardType = "m5" | "dirasakan" | "tsunami";

function normalizeData(
    data: GempaItem | GempaItem[] | undefined
): GempaItem[] {
    if (!data) {
        return [];
    }

    return Array.isArray(data) ? data : [data];
}

function getMagnitude(
    item?: GempaItem | null
): string {
    if (!item?.magnitude) {
        return "-";
    }

    return String(item.magnitude).replace(/^M\s*/i, "");
}

function getDateTime(
    item?: GempaItem | null
): string {
    if (!item) {
        return "-";
    }

    const date = item.date ?? "-";
    const time = item.time ?? "-";

    return `${date} • ${time}`;
}

function getLocation(
    item?: GempaItem | null
): string {
    if (!item) {
        return "Lokasi gempa belum tersedia";
    }

    return (
        item.area ??
        item.headline ??
        "Lokasi gempa belum tersedia"
    );
}

function getDepth(
    item?: GempaItem | null
): string {
    if (!item?.depth) {
        return "-";
    }

    const depth = String(item.depth);

    return depth.toLowerCase().includes("km")
        ? depth
        : `${depth} Km`;
}

function getCoordinate(
    item?: GempaItem | null
): string {
    if (!item) {
        return "-";
    }

    if (!item.latitude && !item.longitude) {
        return "-";
    }

    return `${item.latitude ?? "-"} ${
        item.longitude ?? ""
    }`;
}

function getPotential(
    item?: GempaItem | null
): string {
    if (!item?.potential) {
        return "Belum tersedia";
    }

    return item.potential;
}

function parseCoordinate(value?: string | null): number | null {
    if (!value) {
        return null;
    }

    const number = parseFloat(value.replace(",", "."));

    if (Number.isNaN(number)) {
        return null;
    }

    const upperValue = value.toUpperCase();

    // LS = Lintang Selatan
    // BB = Bujur Barat
    if (upperValue.includes("LS") || upperValue.includes("BB")) {
        return -Math.abs(number);
    }

    return Math.abs(number);
}

function getMapUrl(item?: GempaItem | null): string | null {
    if (!item) return null;

    let latitude: number | null = null;
    let longitude: number | null = null;

    // Format BMKG: longitude,latitude
    if (item.point?.coordinates) {
        const coordinates = item.point.coordinates
            .split(",")
            .map((value) => Number(value.trim()));

        if (
            coordinates.length >= 2 &&
            Number.isFinite(coordinates[0]) &&
            Number.isFinite(coordinates[1])
        ) {
            longitude = coordinates[0];
            latitude = coordinates[1];
        }
    }

    // Fallback jika latitude dan longitude tersedia terpisah
    if (latitude === null && longitude === null) {
        latitude = parseCoordinate(item.latitude);
        longitude = parseCoordinate(item.longitude);
    }

    if (latitude === null || longitude === null) {
        return null;
    }

    // z=5 menampilkan wilayah Indonesia dan sekitarnya
    return `https://www.google.com/maps?q=${latitude},${longitude}&z=5&output=embed`;
}

function SmallGempaRow({
    item,
    index,
}: {
    item: GempaItem;
    index: number;
}) {
    return (
        <div className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                {index + 1}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900">
                    M {getMagnitude(item)}
                </p>

                <p className="mt-0.5 truncate text-[11px] leading-relaxed text-slate-500">
                    {getDateTime(item)}
                </p>
            </div>
        </div>
    );
}

function GempaListCard({
    title,
    description,
    type,
    url,
}: {
    title: string;
    description: string;
    type: "m5" | "dirasakan" | "tsunami";
    url: string;
}) {
    const config = {
        m5: {
            icon: Activity,
            wrapper: "border-orange-200 bg-orange-50",
            iconColor: "text-orange-600",
            buttonColor: "text-orange-700",
        },
        dirasakan: {
            icon: Waves,
            wrapper: "border-blue-200 bg-blue-50",
            iconColor: "text-blue-600",
            buttonColor: "text-blue-700",
        },
        tsunami: {
            icon: AlertCircle,
            wrapper: "border-red-200 bg-red-50",
            iconColor: "text-red-600",
            buttonColor: "text-red-700",
        },
    }[type];

    const Icon = config.icon;

    return (
        <article
            className={`rounded-xl border p-3.5 ${config.wrapper}`}
        >
            <div className="flex items-start gap-2.5">
                <Icon
                    size={18}
                    className={`mt-0.5 shrink-0 ${config.iconColor}`}
                />

                <h3 className="text-sm font-bold leading-snug text-slate-800">
                    {title}
                </h3>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {description}
            </p>

            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:underline ${config.buttonColor}`}
            >
                Lihat informasi BMKG
                <ArrowUpRight size={13} />
            </a>
        </article>
    );
}

function Gempa() {
    const [gempaTerkini, setGempaTerkini] =
        useState<GempaItem | null>(null);

    const [gempaM5, setGempaM5] = useState<GempaItem[]>([]);
    const [gempaDirasakan, setGempaDirasakan] =
        useState<GempaItem[]>([]);
    const [gempaTsunami, setGempaTsunami] =
        useState<GempaItem[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const fetchGempa = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch("/api/gempa", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        `Gagal mengambil data gempa. Status: ${response.status}`
                    );
                }

                const result: GempaResponse =
                    await response.json();

                console.log("Response API Gempa:", result);

                if (!result.success) {
                    throw new Error(
                        result.message ??
                            "Data gempa tidak tersedia."
                    );
                }

                if (!mounted) {
                    return;
                }

                setGempaTerkini(
                    result.data?.terkini?.info ?? null
                );

                setGempaM5(
                    normalizeData(result.data?.m5?.info)
                );

                setGempaDirasakan(
                    normalizeData(result.data?.dirasakan?.info)
                );

                setGempaTsunami(
                    normalizeData(result.data?.tsunami?.info)
                );
            } catch (err) {
                console.error("Error fetch gempa:", err);

                if (!mounted) {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : "Terjadi kesalahan saat mengambil data gempa."
                );
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchGempa();

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) {
        return (
            <section
                id="gempa"
                className="bg-slate-50/70 py-12 md:py-16"
            >
                <div className="container-page">
                    <div className="mx-auto max-w-3xl text-center">
                        <SectionLabel>
                            <Activity className="mr-2 inline-block size-4" />
                            Informasi Terkini dari BMKG
                        </SectionLabel>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                            Informasi{" "}
                            <span className="font-serif italic text-gold">
                                Gempabumi
                            </span>{" "}
                            Indonesia
                        </h2>

                        <p className="mt-4 text-sm text-muted-foreground md:text-lg">
                            Memuat informasi gempabumi terkini...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section
                id="gempa"
                className="bg-slate-50/70 py-12 md:py-16"
            >
                <div className="container-page">
                    <div className="rounded-3xl border border-red-100 bg-red-50 px-6 py-10 text-center">
                        <AlertCircle className="mx-auto size-10 text-red-500" />

                        <h2 className="mt-4 text-lg font-bold text-red-700">
                            Gagal mengambil data gempa
                        </h2>

                        <p className="mt-2 text-sm text-red-600">
                            {error}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            id="gempa"
            className="relative overflow-hidden bg-slate-50/70 py-12 md:py-16"
        >
            {/* BACKGROUND DECORATION */}
            <div className="pointer-events-none absolute -left-40 top-10 size-[420px] rounded-full border-[70px] border-blue-100/50" />

            <div className="pointer-events-none absolute right-0 top-8 hidden opacity-40 lg:block">
                <svg
                    width="300"
                    height="150"
                    viewBox="0 0 300 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 80H45L58 70L68 88L82 50L96 112L110 20L125 132L140 60L154 85L166 75L180 80H220L232 70L245 88L258 55L270 80H300"
                        stroke="#C6DFEC"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <div className="container-page relative">
                {/* HEADER */}
                <div className="mx-auto max-w-3xl text-center">
                    <SectionLabel>
                        <Activity className="mr-2 inline-block size-4" />
                        Informasi Terkini dari BMKG
                    </SectionLabel>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        Informasi{" "}
                        <span className="font-serif italic text-gold">
                            Gempabumi
                        </span>{" "}
                        Indonesia
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-lg">
                        Pantau aktivitas gempabumi terkini di seluruh
                        wilayah Indonesia.
                    </p>
                </div>

                {/* MAIN CONTENT */}
                <div className="mt-10 flex flex-col gap-5">
                    {/* CARD INFORMASI + PETA */}
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="grid items-stretch gap-6 xl:grid-cols-[1.1fr_1fr]">
                            {/* DESKRIPSI GEMPA */}
                            <div className="flex flex-col">
                                {/* HEADER */}
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <div>
                                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-bold text-red-600">
                                            <span className="mr-1.5 size-1.5 rounded-full bg-red-500" />
                                            Gempa Terkini BMKG
                                        </span>
                                    </div>
                                </div>

                                {/* MAGNITUDE HIGHLIGHT */}
                                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 p-3">
                                    <div className="flex min-w-0 items-center gap-2.5">
                                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                                            <Activity
                                                className="size-5"
                                                strokeWidth={2.2}
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[10px] font-semibold uppercase tracking-wide text-red-500">
                                                Magnitudo
                                            </p>

                                            <div className="mt-0.5 flex items-baseline gap-1">
                                                <span className="text-base font-bold text-slate-700">
                                                    M
                                                </span>

                                                <span className="text-3xl font-black leading-none tracking-tight text-red-600 sm:text-4xl">
                                                    {getMagnitude(gempaTerkini)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-[10px] font-semibold text-slate-400">
                                            Waktu Kejadian
                                        </p>

                                        <p className="mt-0.5 max-w-[165px] text-[11px] font-bold leading-relaxed text-slate-700 sm:text-xs">
                                            {getDateTime(gempaTerkini)}
                                        </p>
                                    </div>
                                </div>

                                {/* INFORMASI UTAMA */}
                                <div className="mt-4 space-y-2">
                                    {/* LOKASI */}
                                    <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3">
                                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                                            <MapPin className="size-4" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                                Lokasi Pusat Gempa
                                            </p>

                                            <p className="mt-0.5 text-xs font-extrabold leading-relaxed text-slate-800">
                                                {getLocation(gempaTerkini)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* KEDALAMAN DAN KOORDINAT */}
                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        {/* KEDALAMAN */}
                                        <div className="rounded-xl border border-slate-200 p-3">
                                            <div className="flex items-center gap-1.5">
                                                <div className="flex size-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                                                    <Compass className="size-3.5" />
                                                </div>

                                                <p className="text-[11px] font-bold text-slate-400">
                                                    Kedalaman
                                                </p>
                                            </div>

                                            <p className="mt-2 text-sm font-extrabold text-slate-800">
                                                {getDepth(gempaTerkini)}
                                            </p>
                                        </div>

                                        {/* KOORDINAT */}
                                        <div className="rounded-xl border border-slate-200 p-3">
                                            <div className="flex items-center gap-1.5">
                                                <div className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                    <MapPin className="size-3.5" />
                                                </div>

                                                <p className="text-[11px] font-bold text-slate-400">
                                                    Koordinat
                                                </p>
                                            </div>

                                            <p className="mt-2 whitespace-pre-line break-words text-xs font-extrabold leading-relaxed text-slate-800">
                                                {getCoordinate(gempaTerkini)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* STATUS */}
                                    <div className="flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                                            <Waves className="size-4" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600/70">
                                                Status Gempabumi
                                            </p>

                                            <p className="mt-0.5 text-xs font-extrabold leading-relaxed text-emerald-700">
                                                {getPotential(gempaTerkini)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* FOOTER BUTTON */}
                                <div className="mt-4 border-t border-slate-100 pt-3">
                                    <a
                                        href="https://www.bmkg.go.id/gempabumi"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-red-600"
                                    >
                                        Lihat Selengkapnya
                                        <ArrowRight className="size-3.5" />
                                    </a>
                                </div>
                            </div>

                            {/* PETA */}
                            {getMapUrl(gempaTerkini) && (
                                <div className="min-h-[360px] overflow-hidden rounded-2xl border border-slate-200">
                                    <iframe
                                        title="Peta lokasi gempabumi terkini"
                                        src={getMapUrl(gempaTerkini) ?? ""}
                                        className="h-[420px] w-full border-0 xl:h-full"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            )}
                        </div>
                    </article>

                    {/* 3 CARD DI BAWAH */}
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                        <GempaListCard
                            title="Gempabumi Magnitudo ≥ 5.0"
                            description="Daftar gempabumi dengan magnitudo 5.0 atau lebih di wilayah Indonesia."
                            type="m5"
                            url="https://www.bmkg.go.id/gempabumi/gempabumi-m5"
                        />

                        <GempaListCard
                            title="Gempabumi Dirasakan"
                            description="Daftar gempabumi yang dirasakan oleh masyarakat di berbagai wilayah Indonesia."
                            type="dirasakan"
                            url="https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan"
                        />

                        <GempaListCard
                            title="Gempabumi Berpotensi Tsunami"
                            description="Informasi gempabumi yang berpotensi tsunami dan peringatan dini BMKG."
                            type="tsunami"
                            url="https://www.bmkg.go.id/gempabumi/berpotensi-tsunami"
                        />

                    </div>
                </div>

            </div>
        </section>
    );
}

export default Gempa;