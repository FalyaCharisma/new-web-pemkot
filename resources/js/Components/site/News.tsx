import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Berita } from "@/types/berita";
import { formatDate } from "../ui/date";
import { Link } from "@inertiajs/react";

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
                            Kota Kediri{" "}
                            <span className="font-serif italic text-gold">
                                hari ini
                            </span>
                        </h2>
                        <p className="mt-4 max-w-4xl text-muted-foreground md:text-lg">
                            Ikuti perkembangan terkini dan informasi resmi dari
                            Pemerintah Kota Kediri.
                        </p>
                    </div>
                    <a
                        href="/berita"
                        className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
                    >
                        Lihat semua berita
                        <ArrowUpRight className="size-4" />
                    </a>
                </div>

                <div className="mt-10">
                    {/* Berita Pemkot */}
                    <div className="space-y-6">
                        {berita.map((item) => (
                            <article
                                key={item.id}
                                className="group flex gap-3 rounded-2xl border bg-white p-3 transition hover:shadow-md md:gap-5 md:p-4"
                            >
                                <img
                                    src={item.images}
                                    alt={item.judul}
                                    className="h-20 w-20 shrink-0 rounded-xl object-cover md:h-36 md:w-56"
                                />

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary md:text-xs">
                                            {item.kategori?.nama_kategori}
                                        </span>

                                        <span className="text-[10px] text-muted-foreground md:text-xs">
                                            {formatDate(item.tanggal)}
                                        </span>
                                    </div>

                                    <h3 className="mt-2 line-clamp-2 text-base font-semibold transition-colors group-hover:text-primary md:mt-3 md:text-xl">
                                        {item.judul}
                                    </h3>

                                    <p className="mt-2 hidden line-clamp-2 text-sm text-muted-foreground md:block">
                                        {item.deskripsi}
                                    </p>

                                    <Link
                                        href={route("berita.show", item.slug)}
                                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary md:mt-3 md:text-sm"
                                    >
                                        Baca selengkapnya
                                        <ArrowUpRight size={15} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
