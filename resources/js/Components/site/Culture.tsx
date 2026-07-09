import { SectionLabel } from "./SectionLabel";
import dance from "@/assets/culture-dance.jpg";
import festival from "@/assets/agenda-festival.jpg";
import umkm from "@/assets/culture-umkm.jpg";
import food from "@/assets/culture-food.jpg";
import { Link } from "@inertiajs/react";

const cards = [
    {
        id_kategori: 20,
        tag: "Seni Pertunjukan",
        title: "Kesenian Tradisional",
        desc: "Jaranan, wayang, dan tari klasik khas Kediri.",
        img: dance,
    },
    {
        id_kategori: 9,
        tag: "Event Tahunan",
        title: "Festival Daerah",
        desc: "Kediri Nite Carnival, Grebeg Pancasila, dan lainnya.",
        img: festival,
    },
    {
        id_kategori: 16,
        tag: "Karya Lokal",
        title: "Ekonomi Kreatif",
        desc: "Batik Kediren, kerajinan, dan industri kreatif warga.",
        img: umkm,
    },
    {
        id_kategori: 19,
        title: "Kuliner Khas",
        desc: "Tahu Takwa, Stik Tahu, Soto Kediri, dan Pecel Tumpang.",
        img: food,
    },
];

export function Culture() {
    return (
        <section id="budaya" className="relative overflow-hidden py-28">
            <div className="container-page">
                <div className="max-w-2xl">
                    <SectionLabel>Budaya &amp; Warisan</SectionLabel>
                    <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                        Denyut budaya yang hidup{" "}
                        <span className="font-serif italic text-gold">
                            setiap hari
                        </span>
                    </h2>
                    <p className="mt-5 text-muted-foreground">
                        Seni, festival, dan kuliner yang menjadi identitas Kota
                        Kediri.
                    </p>
                </div>
            </div>

            <div className="container-page mt-8">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {cards.map((c) => (
                        <Link
                            key={c.title}
                            href={route("pesona-unggulan.index", {
                                kategori: c.id_kategori,
                            })}
                            className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl border border-border shadow-elegant transition-all duration-500 hover:-translate-y-2 hover:shadow-glow block"
                        >
                            <img
                                src={c.img}
                                alt={c.title}
                                loading="lazy"
                                width={900}
                                height={1200}
                                className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7">
                                <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.15em] text-gold">
                                    {c.tag}
                                </span>
                                <h3 className="mt-2 font-serif text-lg sm:text-2xl text-white leading-tight">
                                    {c.title}
                                </h3>
                                <p className="mt-1 text-xs sm:text-sm text-white/70 line-clamp-2">
                                    {c.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
