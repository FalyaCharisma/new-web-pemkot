import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { icon } from "leaflet";
import { Peta } from "@/types/peta";

interface Props {
    peta: Peta[];
}

export function CityMap({ peta }: Props) {
    const [selected, setSelected] = useState<Peta>(peta[0]);
    const [MapComps, setMapComps] = useState<any>(null);

    useEffect(() => {
        let mounted = true;
        Promise.all([import("react-leaflet"), import("leaflet")]).then(
            ([rl, L]) => {
                // Fix default marker icons (Vite-friendly CDN paths)
                const defaultIcon = L.default.icon({
                    iconUrl:
                        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                    iconRetinaUrl:
                        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                    shadowUrl:
                        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                });

                const activeIcon = L.default.icon({
                    iconUrl:
                        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
                    iconRetinaUrl:
                        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
                    shadowUrl:
                        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                });
                if (mounted) setMapComps({ ...rl, defaultIcon, activeIcon });
            },
        );
        return () => {
            mounted = false;
        };
    }, []);

    const openGoogleMaps = (lat: number, lng: number) => {
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    };

    return (
        <section id="budaya" className="relative overflow-hidden mb-28">
            <div className="container-page">
                <div className="max-w-2xl">
                    <SectionLabel>Jelajahi Kota</SectionLabel>
                    <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                        Mau kemana {" "}
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
                                center={[selected.lat, selected.lng]}
                                zoom={11}
                                scrollWheelZoom={false}
                                style={{ height: "100%", width: "100%" }}
                                key={selected.id}
                            >
                                <MapComps.TileLayer
                                    attribution="&copy; OpenStreetMap contributors"
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {peta.map((l) => (
                                    <MapComps.Marker
                                        key={l.id}
                                        position={[l.lat, l.lng]}
                                        icon={
                                            l.id === selected.id
                                                ? MapComps.activeIcon
                                                : MapComps.defaultIcon
                                        }
                                        eventHandlers={{
                                            click: () => setSelected(l),
                                        }}
                                    >
                                        <MapComps.Popup>
                                            <div className="min-w-[180px]">
                                                <strong>{l.name}</strong>

                                                <p
                                                    style={{
                                                        fontSize: 12,
                                                        marginTop: 4,
                                                    }}
                                                >
                                                    {l.desc}
                                                </p>

                                                <div className="mt-2 flex justify-center">
                                                    <button
                                                        onClick={() =>
                                                            openGoogleMaps(
                                                                l.lat,
                                                                l.lng,
                                                            )
                                                        }
                                                        className="rounded-lg bg-[#0F5D58] px-3 py-1.5 text-sm text-white hover:opacity-90 text-[11px]"
                                                    >
                                                        Buka di Google Maps
                                                    </button>
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
                                {selected.category}
                            </div>
                            <div className="mt-1 font-serif text-2xl font-semibold text-slate-900">
                                {selected.name}
                            </div>
                            <p className="mt-2 text-sm text-slate-600">
                                {selected.desc}
                            </p>
                            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                                <MapPin className="h-3.5 w-3.5" />
                                {selected.lat.toFixed(4)},{" "}
                                {selected.lng.toFixed(4)}
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                            {peta.map((l) => {
                                const active = l.id === selected.id;
                                return (
                                    <button
                                        key={l.id}
                                        onClick={() => setSelected(l)}
                                        className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                                            active
                                                ? "bg-primary text-white"
                                                : "text-slate-700 hover:bg-slate-100"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-medium">
                                                {l.name}
                                            </span>
                                            <span
                                                className={`text-xs ${active ? "text-amber-300" : "text-slate-400"}`}
                                            >
                                                {l.category}
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
