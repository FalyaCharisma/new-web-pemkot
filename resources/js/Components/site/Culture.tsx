import { SectionLabel } from "./SectionLabel";
import { Link } from "@inertiajs/react";

interface BudayaWarisan {
    id: number;
    kategori_id: number | null;
    tag: string | null;
    judul: string;
    deskripsi: string | null;
    gambar: string | null;
    urutan: number;
    status: boolean;
}

interface CultureProps {
    budayaWarisan: BudayaWarisan[];
}

export function Culture({ budayaWarisan }: CultureProps) {
    return (
        <section
            id="budaya"
            className="relative overflow-hidden py-28"
        >
            <div className="container-page">
                <div className="max-w-2xl">
                    <SectionLabel>
                        Budaya &amp; Warisan
                    </SectionLabel>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                        Denyut budaya yang hidup{" "}
                        <span className="font-serif italic text-gold">
                            setiap hari
                        </span>
                    </h2>

                    <p className="mt-5 text-muted-foreground">
                        Seni, festival, dan kuliner yang menjadi identitas
                        Kota Kediri.
                    </p>
                </div>
            </div>

            <div className="container-page mt-8">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-4">

                    {budayaWarisan.map((c) => (
                        <Link
                            key={c.id}
                            href={route(
                                "pesona-unggulan.index",
                                {
                                    kategori: c.kategori_id,
                                }
                            )}
                            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-elegant transition-all duration-500 hover:-translate-y-2 hover:shadow-glow sm:aspect-[3/4] sm:rounded-3xl"
                        >
                            <img
                                src={
                                    c.gambar
                                        ? `/storage/${c.gambar}`
                                        : "/assets/images/noimage.png"
                                }
                                alt={c.judul}
                                loading="lazy"
                                width={900}
                                height={1200}
                                className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7">

                                {c.tag && (
                                    <span className="text-[9px] uppercase tracking-[0.15em] text-gold sm:text-[11px]">
                                        {c.tag}
                                    </span>
                                )}

                                <h3 className="mt-2 font-serif text-lg leading-tight text-white sm:text-2xl">
                                    {c.judul}
                                </h3>

                                <p className="mt-1 line-clamp-2 text-xs text-white/70 sm:text-sm">
                                    {c.deskripsi}
                                </p>

                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </section>
    );
}