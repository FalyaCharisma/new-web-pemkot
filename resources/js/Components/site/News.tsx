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
                                className="group flex gap-5 rounded-2xl border bg-white p-4 transition hover:shadow-md"
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.judul}
                                    className="h-36 w-56 shrink-0 rounded-xl object-cover"
                                />

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                            {item.kategori?.nama_kategori}
                                        </span>

                                        <span className="text-xs text-muted-foreground">
                                            {formatDate(item.tanggal)}
                                        </span>
                                    </div>

                                    <h3 className="mt-3 line-clamp-2 text-xl font-semibold transition-colors group-hover:text-primary">
                                        {item.judul}
                                    </h3>

                                    <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">
                                        {item.deskripsi}
                                    </p>

                                    <Link
                                        href={route("berita.show", item.slug)}
                                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
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
