import { usePage, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    Search,
    ArrowRight,
    LayoutGrid,
    Hotel,
    Bus,
    HeartPulse,
    UtensilsCrossed,
    ShoppingBag,
    Trees,
    Activity,
    ChevronDown,
} from "lucide-react";

import QuickMenu from "../QuickMenu";
import MobileMenu from "../MobileMenu";

interface Kecamatan {
    kd_kecamatan: string;
    nm_kecamatan: string;
}

interface Kelurahan {
    kd_kelurahan: string;
    nm_kelurahan: string;
}

interface CuacaData {
    lokasi: {
        provinsi: string;
        kotkab: string;
        kecamatan: string;
        desa: string;
    };
    cuaca: {
        weather: number;
        weather_desc: string;
        weather_desc_en: string;
        image: string;
        local_datetime: string;
        t: number;
        hu: number;
        ws: number;
        wd: string;
        vs_text: string;
    };
}

type Props = {
    hero: string | null;
};

export function Hero({ hero }: Props) {
    const [query, setQuery] = useState("");

    // Data cuaca
    const [kecamatan, setKecamatan] = useState<Kecamatan[]>([]);
    const [kelurahan, setKelurahan] = useState<Kelurahan[]>([]);
    const [selectedKecamatan, setSelectedKecamatan] = useState("35.71.02");
    const [selectedKelurahan, setSelectedKelurahan] = useState("35.71.02.1016");
    const [cuaca, setCuaca] = useState<CuacaData | null>(null);
    const [loadingCuaca, setLoadingCuaca] = useState(false);

    // Search
    const handleSearch = () => {
        if (!query.trim()) return;

        router.get(route("search"), {
            search: query,
        });
    };

    // Ambil data kecamatan
    useEffect(() => {
        const getKecamatan = async () => {
            try {
                const response = await fetch("/api/cuaca/kecamatan");

                if (!response.ok) {
                    throw new Error("Gagal mengambil kecamatan");
                }

                const data: Kecamatan[] = await response.json();

                setKecamatan(data);
            } catch (error) {
                console.error("Gagal mengambil kecamatan:", error);
            }
        };

        getKecamatan();
    }, []);

    // Ambil data kelurahan
    useEffect(() => {
        if (!selectedKecamatan) {
            setKelurahan([]);
            return;
        }

        const getKelurahan = async () => {
            try {
                const response = await fetch(
                    `/api/cuaca/kelurahan/${selectedKecamatan}`,
                );

                if (!response.ok) {
                    throw new Error("Gagal mengambil kelurahan");
                }

                const data: Kelurahan[] = await response.json();

                setKelurahan(data);

                const currentKelurahanExists = data.some(
                    (item) => item.kd_kelurahan === selectedKelurahan,
                );

                if (!currentKelurahanExists && data.length > 0) {
                    setSelectedKelurahan(data[0].kd_kelurahan);
                }
            } catch (error) {
                console.error("Gagal mengambil kelurahan:", error);
            }
        };

        getKelurahan();
    }, [selectedKecamatan]);

    // Ambil data cuaca
    useEffect(() => {
        if (!selectedKelurahan) return;

        const getCuaca = async () => {
            try {
                setLoadingCuaca(true);

                const response = await fetch(
                    `/api/cuaca?kd_kelurahan=${selectedKelurahan}`,
                );

                if (!response.ok) {
                    throw new Error("Gagal mengambil data cuaca");
                }

                const result = await response.json();

                setCuaca(result.data);
            } catch (error) {
                console.error("Gagal mengambil data cuaca:", error);
            } finally {
                setLoadingCuaca(false);
            }
        };

        getCuaca();
    }, [selectedKelurahan]);

    // Tentukan overlay berdasarkan kondisi cuaca
    const getWeatherOverlay = () => {
        if (!cuaca) {
            return "from-black/60 via-black/20 to-black/40";
        }

        const weather = cuaca.cuaca.weather_desc.toLowerCase();

        if (weather.includes("hujan") || weather.includes("rain")) {
            return "from-slate-900/60 via-blue-900/20 to-slate-900/50";
        }

        if (weather.includes("berawan") || weather.includes("cloud")) {
            return "from-slate-800/50 via-black/10 to-slate-800/40";
        }

        if (weather.includes("petir") || weather.includes("thunder")) {
            return "from-slate-950/70 via-purple-900/20 to-slate-950/60";
        }

        return "from-blue-900/30 via-transparent to-blue-900/20";
    };

    const getWeatherType = () => {
        if (!cuaca) return "normal";

        const weather = cuaca.cuaca.weather_desc.toLowerCase();

        if (
            weather.includes("petir") ||
            weather.includes("thunder") ||
            weather.includes("badai")
        ) {
            return "petir";
        }

        if (weather.includes("hujan lebat") || weather.includes("heavy rain")) {
            return "hujan-lebat";
        }

        if (weather.includes("hujan") || weather.includes("rain")) {
            return "hujan";
        }

        if (weather.includes("berawan") || weather.includes("cloud")) {
            return "berawan";
        }

        return "normal";
    };
    return (
        <header className="relative h-screen overflow-visible">
            <div className="absolute inset-x-0 top-0 h-[85vh] overflow-hidden">
                {/* FOTO HERO */}
                <img
                    src={hero ?? ""}
                    alt="Kota Kediri"
                    className="h-full w-full object-cover"
                />

                {/* OVERLAY CUACA */}
                <div
                    className={`
            absolute
            inset-0
            bg-gradient-to-b
            transition-all
            duration-1000
            ${getWeatherOverlay()}
        `}
                />

                {/* =====================================================
        EFEK HUJAN
    ===================================================== */}

                {(getWeatherType() === "hujan" ||
                    getWeatherType() === "hujan-lebat" ||
                    getWeatherType() === "petir") && (
                    <>
                        {/* HUJAN LAYER 1 */}
                        <div
                            className={`
                    weather-rain
                    absolute
                    inset-[-100px]
                    pointer-events-none
                    ${
                        getWeatherType() === "hujan-lebat" ||
                        getWeatherType() === "petir"
                            ? "weather-rain-heavy"
                            : ""
                    }
                `}
                        />

                        {/* HUJAN LAYER 2 */}
                        <div
                            className="
                    weather-rain weather-rain-second
                    absolute
                    inset-[-100px]
                    pointer-events-none
                "
                        />
                    </>
                )}
            </div>

            <div className="relative z-10 flex h-[85vh] items-center">
                <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">
                    <div className="max-w-4xl">
                        {/* Weather dan filter */}
                        {/* Weather dan filter */}
                        {cuaca && (
                            <div
                                className={`
        mb-4 w-full
        rounded-2xl border border-white/20
        bg-white/10 p-2.5
        text-white shadow-lg backdrop-blur-xl
        transition-opacity duration-300
        sm:flex sm:w-fit sm:max-w-none sm:items-center sm:gap-3
        sm:rounded-2xl sm:p-2.5
        ${loadingCuaca ? "opacity-70" : "opacity-100"}
    `}
                            >
                                {/* INFO CUACA */}
                                <div className="flex min-w-0 shrink-0 items-center gap-2 px-2 py-0.5 sm:px-0">
                                    <img
                                        src={cuaca.cuaca.image}
                                        alt={cuaca.cuaca.weather_desc}
                                        className="h-9 w-9 shrink-0 sm:h-9 sm:w-9"
                                    />

                                    <div className="min-w-0 flex-1 leading-tight">
                                        <div className="flex items-center gap-2">
                                            <span className="text-base font-bold sm:text-base">
                                                {cuaca.cuaca.t}°C
                                            </span>

                                            <span className="truncate text-xs font-medium text-white/80">
                                                {loadingCuaca
                                                    ? "Memperbarui..."
                                                    : cuaca.cuaca.weather_desc}
                                            </span>
                                        </div>

                                        <div className="truncate text-[10px] text-white/60">
                                            {cuaca.lokasi.desa},{" "}
                                            {cuaca.lokasi.kecamatan}
                                        </div>
                                    </div>
                                </div>

                                {/* FILTER */}
                                <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-0 sm:flex sm:shrink-0 sm:items-center sm:gap-2">
                                    {/* Kecamatan */}
                                    <div className="relative min-w-0">
                                        <select
                                            value={selectedKecamatan}
                                            onChange={(e) =>
                                                setSelectedKecamatan(
                                                    e.target.value,
                                                )
                                            }
                                            className="
                        h-9 w-full
                        cursor-pointer appearance-none
                        rounded-full
                        border border-white/15
                        bg-white/10
                        px-3 pr-8
                        text-xs font-semibold text-white
                        outline-none
                        transition
                        hover:bg-white/20
                        focus:bg-white/20
                        sm:min-w-[120px]
                        sm:px-4
                    "
                                        >
                                            {kecamatan.map((item) => (
                                                <option
                                                    key={item.kd_kecamatan}
                                                    value={item.kd_kecamatan}
                                                    className="bg-slate-800 text-white"
                                                >
                                                    {item.nm_kecamatan}
                                                </option>
                                            ))}
                                        </select>

                                        <ChevronDown
                                            size={13}
                                            className="
                        pointer-events-none
                        absolute right-3 top-1/2
                        -translate-y-1/2
                        text-white/70
                    "
                                        />
                                    </div>

                                    {/* Kelurahan */}
                                    <div className="relative min-w-0">
                                        <select
                                            value={selectedKelurahan}
                                            disabled={!selectedKecamatan}
                                            onChange={(e) =>
                                                setSelectedKelurahan(
                                                    e.target.value,
                                                )
                                            }
                                            className="
                        h-10 w-full
                        cursor-pointer appearance-none
                        rounded-full
                        border border-white/15
                        bg-white/10
                        px-3 pr-8
                        text-xs font-semibold text-white
                        outline-none
                        transition
                        hover:bg-white/20
                        focus:bg-white/20
                        disabled:opacity-50
                        sm:min-w-[165px]
                        sm:px-4
                    "
                                        >
                                            {kelurahan.map((item) => (
                                                <option
                                                    key={item.kd_kelurahan}
                                                    value={item.kd_kelurahan}
                                                    className="bg-slate-800 text-white"
                                                >
                                                    {item.nm_kelurahan}
                                                </option>
                                            ))}
                                        </select>

                                        <ChevronDown
                                            size={13}
                                            className="
                        pointer-events-none
                        absolute right-3 top-1/2
                        -translate-y-1/2
                        text-white/70
                    "
                                        />
                                    </div>

                                    {/* Info Gempa */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            document
                                                .getElementById("gempa")
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                })
                                        }
                                        className="
                    col-span-2
                    flex h-9
                    items-center justify-center
                    gap-1.5
                    rounded-full
                    bg-white/10
                    px-4
                    text-xs font-semibold
                    text-white
                    transition
                    hover:bg-white/20
                    sm:col-span-1
                "
                                    >
                                        <Activity size={14} />
                                        <span>Info Gempa</span>
                                        <ArrowRight size={13} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Badge */}
                        <div className="inline-flex max-w-full flex-wrap items-center justify-center rounded-full bg-white/20 px-3 py-1.5 text-center text-[10px] leading-tight text-white backdrop-blur-md sm:px-5 sm:py-2 sm:text-xs">
                            <span>MAJU</span>
                            <span className="mx-1 text-yellow-400 sm:mx-2">
                                •
                            </span>
                            <span>AGAMIS</span>
                            <span className="mx-1 text-yellow-400 sm:mx-2">
                                •
                            </span>
                            <span>PRODUKTIF</span>
                            <span className="mx-1 text-yellow-400 sm:mx-2">
                                •
                            </span>
                            <span>AMAN</span>
                            <span className="mx-1 text-yellow-400 sm:mx-2">
                                •
                            </span>
                            <span>NGANGENI</span>
                        </div>

                        {/* Judul */}
                        <h1 className="mt-3 text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-7xl">
                            Kota Kediri{" "}
                            <span className="text-gold font-serif italic">
                                Mapan
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <h5 className="mt-3 max-w-full text-sm font-medium uppercase leading-relaxed tracking-[0.08em] text-white/80 sm:mt-4 sm:text-lg sm:tracking-[0.18em]">
                            Ngangeni dalam Kenangan, Maju dalam Perubahan
                        </h5>

                        {/* Search */}
                        <div className="mt-4 flex w-full max-w-4xl overflow-hidden rounded-full bg-white shadow-2xl">
                            <input
                                type="text"
                                placeholder="Cari Fasilitas, berita, wisata atau informasi lainnya..."
                                className="min-w-0 flex-1 px-4 py-3 text-sm text-gray-700 outline-none sm:px-7 sm:py-3.5 sm:text-base"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSearch();
                                    }
                                }}
                            />

                            <button
                                onClick={handleSearch}
                                className="m-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-white sm:h-11 sm:w-11"
                            >
                                <Search size={18} className="sm:h-5 sm:w-5" />
                            </button>
                        </div>

                        {/* CTA */}
                        <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                            <a
                                href="https://pecut.kedirikota.go.id/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
                            >
                                Akses Layanan Publik
                                <ArrowRight
                                    size={15}
                                    className="sm:h-[17px] sm:w-[17px]"
                                />
                            </a>

                            <button
                                onClick={() =>
                                    document
                                        .getElementById("budaya")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                                className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20 sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
                            >
                                Jelajahi Kota Kediri
                                <ArrowRight
                                    size={15}
                                    className="sm:h-[17px] sm:w-[17px]"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kediri Hub */}
            <div className="absolute bottom-10 left-1/2 z-30 hidden w-full max-w-7xl -translate-x-1/2 -translate-y-8 px-6 lg:block">
                <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9">
                        {/* Judul Kediri Hub */}
                        <div className="flex flex-col justify-center border-r border-slate-200 p-6 lg:col-span-2 lg:p-8">
                            <h3 className="font-bold text-slate-900">
                                Kediri Hub
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Temukan berbagai fasilitas untuk aktivitas Anda.
                            </p>
                        </div>

                        <QuickMenu
                            icon={<Hotel size={28} />}
                            title="Akomodasi"
                            href={route("fasilitas-kota.index", {
                                kategori: 1,
                            })}
                        />

                        <QuickMenu
                            icon={<Bus size={28} />}
                            title="Transportasi"
                            href={route("fasilitas-kota.index", {
                                kategori: 7,
                            })}
                        />

                        <QuickMenu
                            icon={<HeartPulse size={28} />}
                            title="Kesehatan"
                            href={route("fasilitas-kota.index", {
                                kategori: 9,
                            })}
                        />

                        <QuickMenu
                            icon={<UtensilsCrossed size={28} />}
                            title="Kuliner"
                            href={route("fasilitas-kota.index", {
                                kategori: 5,
                            })}
                        />

                        <QuickMenu
                            icon={<ShoppingBag size={28} />}
                            title="Perbelanjaan"
                            href={route("fasilitas-kota.index", {
                                kategori: 8,
                            })}
                        />

                        <QuickMenu
                            icon={<Trees size={28} />}
                            title="Ruang Publik"
                            href={route("fasilitas-kota.index", {
                                kategori: 4,
                            })}
                        />

                        <Link
                            href={route("fasilitas-kota.index")}
                            className="flex flex-col items-center justify-center gap-2 bg-primary p-6 text-white transition hover:opacity-90"
                        >
                            <LayoutGrid size={28} />
                            <span className="text-center text-sm font-medium">
                                Semua Fasilitas
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Quick Access */}
            <div className="absolute bottom-6 left-0 right-0 z-30 lg:hidden">
                <div className="flex gap-3 overflow-x-auto px-4 pb-2">
                    <MobileMenu
                        icon={<Hotel size={22} />}
                        title="Akomodasi"
                        href={route("fasilitas-kota.index", { kategori: 1 })}
                    />
                    <MobileMenu
                        icon={<Bus size={22} />}
                        title="Transportasi"
                        href={route("fasilitas-kota.index", { kategori: 2 })}
                    />
                    <MobileMenu
                        icon={<HeartPulse size={22} />}
                        title="Kesehatan"
                        href={route("fasilitas-kota.index", { kategori: 3 })}
                    />
                    <MobileMenu
                        icon={<UtensilsCrossed size={22} />}
                        title="Kuliner"
                        href={route("fasilitas-kota.index", { kategori: 4 })}
                    />
                    <MobileMenu
                        icon={<ShoppingBag size={22} />}
                        title="Perbelanjaan"
                        href={route("fasilitas-kota.index", { kategori: 5 })}
                    />
                    <MobileMenu
                        icon={<Trees size={22} />}
                        title="Ruang Publik"
                        href={route("fasilitas-kota.index", { kategori: 6 })}
                    />
                    <MobileMenu
                        icon={<LayoutGrid size={22} />}
                        title="Semua"
                        href={route("fasilitas-kota.index")}
                    />
                </div>
            </div>
        </header>
    );
}
