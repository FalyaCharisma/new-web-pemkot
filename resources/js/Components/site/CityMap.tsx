import { useEffect, useState } from "react";
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

export function CityMap({ peta }: Props) {
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
        <section id="budaya" className="relative overflow-hidden mb-28">
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
                    <div className="relative h-[480px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-lg z-[1]">
                        {MapComps ? (
                            <MapComps.MapContainer
                                center={
                                    selected
                                        ? [
                                              Number(selected.lat),
                                              Number(selected.lng),
                                          ]
                                        : DEFAULT_CENTER
                                }
                                zoom={11}
                                scrollWheelZoom={false}
                                style={{ height: "100%", width: "100%" }}
                                key={selected?.id ?? "default"}
                            >
                                <MapComps.TileLayer
                                    attribution="&copy; OpenStreetMap contributors"
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {filteredPeta.map((l) => (
                                    <MapComps.Marker
                                        key={l.id}
                                        position={[
                                            Number(l.lat),
                                            Number(l.lng),
                                        ]}
                                        icon={MapComps.createMarker(
                                            l.icon,
                                            l.id === selected?.id,
                                        )}
                                        eventHandlers={{
                                            click: () => setSelected(l),
                                        }}
                                    >
                                        <MapComps.Popup
                                            minWidth={270}
                                            maxWidth={270}
                                        >
                                            <div className="w-full px-1 py-2">
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
                                                    <h3 className="text-xl font-bold leading-tight text-slate-800">
                                                        {l.name}
                                                    </h3>

                                                    <div className="mt-2">
                                                        <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                                                            {l.category}
                                                        </span>
                                                    </div>

                                                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">
                                                        {l.desc}
                                                    </p>

                                                    {l.jam_buka &&
                                                        l.jam_tutup && (
                                                            <p className="mt-2 text-xs text-slate-600">
                                                                🕘 {l.jam_buka}{" "}
                                                                - {l.jam_tutup}
                                                            </p>
                                                        )}

                                                    <div className="mt-4 space-y-1">
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

                    <div className="flex flex-col gap-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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

                        <div className="flex-1 overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                            {/* Semua */}
                            <button
                                onClick={() => {
                                    setSelectedCategory(null);
                                    setSelected(null);
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
                                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
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
                                        className={`text-xs ${
                                            selectedCategory === null
                                                ? "text-white/70"
                                                : "text-slate-400"
                                        }`}
                                    >
                                        {peta.length}
                                    </span>
                                </div>
                            </button>

                            {/* Kategori */}
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
                                            setSelectedCategory(category.id);
                                            setSelected(null);
                                        }}
                                        className={`mb-1 w-full rounded-xl px-4 py-3 text-left transition ${
                                            active
                                                ? "bg-primary text-white"
                                                : "text-slate-700 hover:bg-slate-100"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                                        active
                                                            ? "bg-white/15"
                                                            : "bg-slate-100 text-emerald-600"
                                                    }`}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <span className="font-medium">
                                                    {category.name}
                                                </span>
                                            </div>

                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs ${
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
