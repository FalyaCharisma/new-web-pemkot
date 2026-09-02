import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { icon } from "leaflet";
import { Peta } from "@/types/peta";
import {
    Building2,
    Bus,
    HeartPulse,
    UtensilsCrossed,
    ShoppingBag,
    Trees,
    GraduationCap,
    Landmark,
} from "lucide-react";
import ReactDOMServer from "react-dom/server";

interface Props {
    peta: Peta[];
}
function MapController({
    selected,
    filteredPeta,
    selectedCategory,
    useMap,
}: {
    selected: Peta | null;
    filteredPeta: Peta[];
    selectedCategory: number | null;
    useMap: any;
}) {
    const map = useMap();

    // Ketika marker diklik
    useEffect(() => {
        if (!selected) return;

        map.flyTo([Number(selected.lat), Number(selected.lng)], 15, {
            duration: 1,
        });
    }, [selected, map]);

    // Ketika kategori berubah
    useEffect(() => {
        // Jangan jalankan kalau sedang memilih marker
        if (selected) return;

        // Tutup popup yang sedang terbuka
        map.closePopup();

        if (filteredPeta.length === 0) {
            return;
        }

        // Kalau hanya ada 1 titik
        if (filteredPeta.length === 1) {
            map.flyTo(
                [Number(filteredPeta[0].lat), Number(filteredPeta[0].lng)],
                15,
                {
                    duration: 1.2,
                },
            );

            return;
        }

        // Kalau ada banyak titik, tampilkan semuanya
        const bounds = filteredPeta.map((item) => [
            Number(item.lat),
            Number(item.lng),
        ]);

        map.flyToBounds(bounds, {
            padding: [50, 50],
            maxZoom: 15,
            duration: 1.2,
        });
    }, [selectedCategory, filteredPeta, selected, map]);

    return null;
}

export function CityMap({ peta }: Props) {
    const markerRefs = useRef<Record<number, any>>({});
    const DEFAULT_CENTER: [number, number] = [-7.8166, 112.0119];
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        null,
    );
    const [selected, setSelected] = useState<Peta | null>(null);
    const categories = Array.from(
        new Map(
            peta
                .filter((item) => item.category_id)
                .map((item) => [
                    item.category_id,
                    {
                        id: item.category_id,
                        name: item.category,
                        icon: item.icon,
                    },
                ]),
        ).values(),
    );

    const filteredPeta =
        selectedCategory === null
            ? peta
            : peta.filter((item) => item.category_id === selectedCategory);
    const [MapComps, setMapComps] = useState<any>(null);
    const iconMap: Record<string, any> = {
        Building2,
        Bus,
        HeartPulse,
        UtensilsCrossed,
        ShoppingBag,
        Trees,
        GraduationCap,
        Landmark,
    };

    useEffect(() => {
        let mounted = true;
        Promise.all([import("react-leaflet"), import("leaflet")]).then(
            ([rl, L]) => {
                // Fix default marker icons (Vite-friendly CDN paths)
                const createMarker = (iconName: string, active = false) => {
                    const Icon = iconMap[iconName] ?? MapPin;

                    return L.default.divIcon({
                        className: "",
                        html: ReactDOMServer.renderToString(
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-lg ${
                                    active
                                        ? "bg-red-600 border-red-700 text-white"
                                        : "bg-emerald-600 border-white text-white"
                                }`}
                            >
                                <Icon size={20} />
                            </div>,
                        ),
                        iconSize: [40, 40],
                        iconAnchor: [20, 40],
                        popupAnchor: [0, -35],
                    });
                };
                if (mounted)
                    setMapComps({
                        ...rl,
                        createMarker,
                    });
            },
        );
        return () => {
            mounted = false;
        };
    }, []);

    const openGoogleMaps = (lat: number, lng: number) => {
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    };

    const openVideo = (url?: string | null) => {
        if (!url) return;

        window.open(url, "_blank");
    };
    const openDetail = (slug: string) => {
        window.location.href = route("fasilitas-kota.show", slug);
    };

    return (
        <section
    id="budaya"
    className="relative overflow-hidden mb-10 md:mb-28"
>
            <div className="container-page">
                <div className="max-w-2xl">
                    <SectionLabel>Jelajahi Kota</SectionLabel>
                    <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                        Mau kemana{" "}
                        <span className="font-serif italic text-gold">
                            hari ini
                        </span>
                    </h2>
                    <p className="mt-5 text-muted-foreground">
                        Temukan landmark, pusat layanan, dan destinasi terbaik
                        Kota Kediri dalam satu peta interaktif.
                    </p>
                </div>
            </div>

            <div className="container-page mt-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                    <div className="relative h-[480px] z-[1]">
                        <div className="h-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-lg">
                            {MapComps ? (
                                <MapComps.MapContainer
                                    center={DEFAULT_CENTER}
                                    zoom={11}
                                    scrollWheelZoom={false}
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                    }}
                                >
                                    <MapComps.TileLayer
                                        attribution="&copy; OpenStreetMap contributors"
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    {/* Gerakkan peta ke marker yang dipilih */}
                                    <MapController
                                        selected={selected}
                                        filteredPeta={filteredPeta}
                                        selectedCategory={selectedCategory}
                                        useMap={MapComps.useMap}
                                    />

                                    {/* Marker */}
                                    {filteredPeta.map((l) => (
                                        <MapComps.Marker
                                            key={l.id}
                                            ref={(ref: any) => {
                                                if (ref) {
                                                    markerRefs.current[l.id] =
                                                        ref;
                                                }
                                            }}
                                            position={[
                                                Number(l.lat),
                                                Number(l.lng),
                                            ]}
                                            icon={MapComps.createMarker(
                                                l.icon,
                                                l.id === selected?.id,
                                            )}
                                            eventHandlers={{
                                                click: () => {
                                                    setSelected(l);

                                                    setTimeout(() => {
                                                        markerRefs.current[
                                                            l.id
                                                        ]?.openPopup();
                                                    }, 1200);
                                                },
                                            }}
                                        >
                                            <MapComps.Popup
                                                minWidth={270}
                                                maxWidth={270}
                                                autoPan={true}
                                                autoPanPadding={[20, 20]}
                                            >
                                                <div className="w-full px-1 py-2">
                                                    {/* FOTO */}
                                                    <img
                                                        src={
                                                            l.foto
                                                                ? `/storage/fasilitas/${l.foto}`
                                                                : "/placeholder.jpg"
                                                        }
                                                        alt={l.name}
                                                        className="h-28 w-full rounded-xl object-cover"
                                                    />

                                                    <div className="mt-3">
                                                        {/* NAMA */}
                                                        <h3 className="text-xl font-bold leading-tight text-slate-800">
                                                            {l.name}
                                                        </h3>

                                                        {/* KATEGORI */}
                                                        <div className="mt-2">
                                                            <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                                                                {l.category}
                                                            </span>
                                                        </div>

                                                        {/* ALAMAT */}
                                                        <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">
                                                            {l.desc}
                                                        </p>

                                                        {/* JAM BUKA */}
                                                        {l.jam_buka &&
                                                            l.jam_tutup && (
                                                                <p className="mt-2 text-xs text-slate-600">
                                                                    🕘{" "}
                                                                    {l.jam_buka}{" "}
                                                                    -{" "}
                                                                    {
                                                                        l.jam_tutup
                                                                    }
                                                                </p>
                                                            )}

                                                        {/* BUTTON */}
                                                        <div className="mt-4 space-y-1">
                                                            {/* DETAIL */}
                                                            <button
                                                                onClick={() =>
                                                                    openDetail(
                                                                        l.slug,
                                                                    )
                                                                }
                                                                className="flex h-9 w-full items-center justify-center rounded-lg bg-primary px-3 text-[13px] font-semibold text-white transition hover:opacity-90"
                                                            >
                                                                Lihat Detail
                                                            </button>

                                                            {/* VIDEO */}
                                                            {l.has_video && (
                                                                <button
                                                                    onClick={() =>
                                                                        openVideo(
                                                                            l.video_url,
                                                                        )
                                                                    }
                                                                    className="flex h-9 w-full items-center justify-center rounded-lg bg-red-600 px-3 text-[13px] font-semibold text-white transition hover:bg-red-700"
                                                                >
                                                                    Lihat Video
                                                                </button>
                                                            )}

                                                            {/* GOOGLE MAPS */}
                                                            <button
                                                                onClick={() =>
                                                                    openGoogleMaps(
                                                                        l.lat,
                                                                        l.lng,
                                                                    )
                                                                }
                                                                className="flex h-9 w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50"
                                                            >
                                                                Petunjuk Arah
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </MapComps.Popup>
                                        </MapComps.Marker>
                                    ))}
                                </MapComps.MapContainer>
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                                    Memuat peta…
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex h-[480px] min-h-0 flex-col gap-3">
                        {/* HEADER FILTER */}
                        <div className="shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="text-xs font-medium uppercase tracking-wider text-amber-600">
                                Filter Peta
                            </div>

                            <h3 className="mt-1 font-serif text-2xl font-semibold text-slate-900">
                                Kategori Fasilitas
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Pilih kategori untuk menampilkan lokasi pada
                                peta.
                            </p>
                        </div>

                        {/* LIST KATEGORI */}
                        <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                            {/* SEMUA LOKASI */}
                            <button
                                onClick={() => {
                                    setSelected(null);
                                    setSelectedCategory(null);
                                }}
                                className={`mb-1 w-full rounded-xl px-4 py-3 text-left transition ${
                                    selectedCategory === null
                                        ? "bg-primary text-white"
                                        : "text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                                selectedCategory === null
                                                    ? "bg-white/15"
                                                    : "bg-slate-100"
                                            }`}
                                        >
                                            <MapPin className="h-5 w-5" />
                                        </div>

                                        <span className="font-medium">
                                            Semua Lokasi
                                        </span>
                                    </div>

                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs ${
                                            selectedCategory === null
                                                ? "bg-white/15 text-white"
                                                : "bg-slate-100 text-slate-500"
                                        }`}
                                    >
                                        {peta.length}
                                    </span>
                                </div>
                            </button>

                            {/* DAFTAR KATEGORI */}
                            {categories.map((category) => {
                                const active = selectedCategory === category.id;

                                const Icon = iconMap[category.icon] ?? MapPin;

                                const total = peta.filter(
                                    (item) => item.category_id === category.id,
                                ).length;

                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            // Hapus marker yang sedang aktif
                                            setSelected(null);

                                            // Ganti kategori
                                            setSelectedCategory(category.id);
                                        }}
                                        className={`mb-1 w-full rounded-xl px-4 py-3 text-left transition ${
                                            active
                                                ? "bg-primary text-white"
                                                : "text-slate-700 hover:bg-slate-100"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div
                                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                                        active
                                                            ? "bg-white/15"
                                                            : "bg-slate-100 text-emerald-600"
                                                    }`}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <span className="truncate font-medium">
                                                    {category.name}
                                                </span>
                                            </div>

                                            <span
                                                className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                                                    active
                                                        ? "bg-white/15 text-white"
                                                        : "bg-slate-100 text-slate-500"
                                                }`}
                                            >
                                                {total}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
