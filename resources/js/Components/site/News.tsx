import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import festival from "@/assets/agenda-festival.jpg";
import smart from "@/assets/smart-city.jpg";
import hero from "@/assets/hero-kediri.jpg";
import { Berita } from "@/types/berita";

type Props = {
    berita: Berita[];
};

export function News({ berita }: Props) {
    return (
        <section id="berita" className="relative py-28">
            <div className="container-page">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <SectionLabel>Kabar Terbaru</SectionLabel>
                        <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                            Berita{" "}
                            <span className="font-serif italic text-gold">
                                Kota Kediri
                            </span>
                        </h2>
                        <p className="mt-4 max-w-4xl text-muted-foreground md:text-lg">
                            Ikuti perkembangan terkini dan informasi resmi dari Pemerintah Kota Kediri.
                        </p>
                    </div>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
                    >
                        Lihat semua berita
                        <ArrowUpRight className="size-4" />
                    </a>
                </div>

                <div className="mt-8 grid gap-8 md:grid-cols-3">
                    {berita.map((p) => (
                        <article key={p.judul} className="group flex flex-col">
                            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-border">
                                <img
                                    src={p.image_url}
                                    alt={p.judul}
                                    loading="lazy"
                                    width={800}
                                    height={640}
                                    className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                                />
                            </div>
                            <div className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em]">
                                {/* <span className="text-gold">{p.author}</span> */}
                                <span className="size-1 rounded-full bg-muted-foreground" />
                                <span className="text-muted-foreground">
                                    {p.tanggal}
                                </span>
                            </div>
                            <h3 className="mt-3 font-serif text-xl leading-tight">
                                {p.judul}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {p.deskripsi}
                            </p>
                            <a
                                href="#"
                                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-gold"
                            >
                                Baca selengkapnya
                                <ArrowUpRight className="size-3.5" />
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
