import { useState } from "react";
import { MapPin } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { FasilitasKota } from "@/types/fasilitas";
import { Link } from "@inertiajs/react";

interface Props {
    wisata: FasilitasKota[];
}

export function Tourism({ wisata }: Props) {
    const filters = [
        "Semua",
        ...Array.from(
            new Set(
                wisata
                    .map((item) => item.kategori?.nama_kategori)
                    .filter(Boolean),
            ),
        ),
    ];

    const [filter, setFilter] = useState<string>("Semua");

    const filtered =
        filter === "Semua"
            ? wisata
            : wisata.filter((item) => item.kategori?.nama_kategori === filter);

    return (
        <section id="wisata" className="relative">
            <div className="container-page">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-5xl">
                        <SectionLabel>Destinasi Wisata</SectionLabel>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                            Setiap sudut menyimpan{" "}
                            <span className="font-serif italic text-gold">
                                cerita
                            </span>
                        </h2>
                    </div>
                </div>

                {/* FILTER */}

                <div className="flex flex-wrap gap-2 mt-8">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f ?? "")}
                            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                                filter === f
                                    ? "border-gold bg-gold text-gold-foreground"
                                    : "border-border bg-surface text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* CARD */}

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((i) => (
                        <Link
                            key={i.id}
                            href={route("fasilitas-kota.show", {
                                fasilitas: i.slug,
                            })}
                            className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-border block"
                        >
                            <img
                                src={i.foto ?? "/placeholder.jpg"}
                                alt={i.nama}
                                loading="lazy"
                                className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-4">
                                <span className="text-[11px] uppercase tracking-[0.22em] text-gold">
                                    {i.kategori?.nama_kategori}
                                </span>

                                <h3 className="mt-2 font-serif text-xl text-white">
                                    {i.nama}
                                </h3>

                                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/70">
                                    <MapPin className="size-3.5" />

                                    {i.alamat}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
