import { Head, Link } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { Home, ChevronRight } from "lucide-react";
import { ContentCTA } from "@/Components/ContentCTA";
import type { PesonaUnggulan } from "@/types/unggulan";
import type { Berita } from "@/types/berita";
import type { Kategori } from "@/types/kategori";
import { ShareButtons } from "@/Components/ShareButtons";
import SidebarKategoriBerita from "@/Components/site/SidebarKategoriBerita";
import { getYoutubeEmbedUrl } from "@/helpers/youtube";
import * as LucideIcons from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

interface Props {
    pesona: PesonaUnggulan;
    related: Berita[];
    kategori_berita: Kategori[];
}

export default function DetailPesona({ pesona, related, kategori_berita }: Props) {
    const embedUrl = getYoutubeEmbedUrl(pesona.url_video);
    
  return (
    <>
    <Head title="Detail Berita" />

    <div className="min-h-screen bg-slate-50 text-foreground">
        <HeaderSolid />

        <main className="pt-15">
            <div className="container relative z-10 mx-auto px-4 py-3">
                <div className="mt-13 flex items-center gap-2 text-sm text-slate-500">
                    <Home size={14} />
                    <span>Beranda</span>

                    <ChevronRight size={14} />
                    <span>
                        Pesona Unggulan Kota Kediri
                    </span>

                    <ChevronRight size={14} />

                    <span className="font-medium text-slate-700">
                        Detail
                    </span>
                </div>
            </div>

            {/* CONTENT */}
            <section className="container mx-auto px-4 py-10">
                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <article className="rounded-3xl border bg-white p-6">
                        <div className="flex items-center justify-between gap-4">
                            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                { pesona.kategori?.nama_kategori }
                            </span>
                            <button
                                onClick={() => window.history.back()}
                                className="
                                    inline-flex items-center gap-2
                                    rounded-lg border
                                    px-3 py-1.5
                                    text-xs font-medium text-slate-600
                                    transition-all
                                    hover:border-primary
                                    hover:text-primary
                                "
                            >
                                <LucideIcons.ArrowLeft size={14} />
                                Kembali
                            </button>
                        </div>

                        {/* Title */}
                        <h1 className="mt-4 text-4xl font-bold text-slate-900">
                            {pesona.judul}
                        </h1>

                        {/* Meta */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                <LucideIcons.CalendarDays size={14} />
                                <span>{ pesona.created_at_formatted }</span>
                                </div>

                                <div className="flex items-center gap-2">
                                <LucideIcons.Building2 size={14} />
                                <span>Pemerintah Kota Kediri</span>
                                </div>

                                <div className="flex items-center gap-2">
                                <LucideIcons.Eye size={14} />
                                <span>{ pesona.view } kali dibaca</span>
                                </div>
                            </div>
                            <ShareButtons
                                url={window.location.href}
                                title={ pesona.judul }
                            />
                        </div>

                        {/* Cover */}
                        <img
                            src={
                                pesona.cover && pesona.cover.trim() !== ""
                                    ? `/storage/pesona/${pesona.cover}`
                                    : "https://placehold.co/1200x700"
                            }
                            alt={pesona.judul}
                            className="mt-6 h-[420px] w-full rounded-2xl object-cover"
                        />

                        {/* Article */}

                        <div className="prose prose-slate mt-8 max-w-none">
                            <div
                                dangerouslySetInnerHTML={{ __html: pesona.deskripsi }}
                            />
                        </div>

                        {/* Highlight */}
                        <div className="mt-8 rounded-2xl bg-cyan-50 p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm text-primary">
                                    <LucideIcons.Sparkles size={18} />
                                </div>

                                <div>
                                    <h3 className="font-bold text-primary">
                                        Tahukah Anda?
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                        { pesona.fyi }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Video */}
                        <div className="mt-8 rounded-2xl border bg-slate-50 p-4">
                            <div className="grid gap-4 md:grid-cols-[250px_1fr]">

                                {embedUrl && (
                                    <iframe
                                        src={embedUrl}
                                        title={pesona.judul_video}
                                        className="aspect-video w-full rounded-xl"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                )}

                                <div>
                                    <span className="text-xs font-semibold uppercase text-primary">
                                        Tonton Video
                                    </span>

                                    <h3 className="mt-2 text-xl font-bold">
                                        { pesona.judul_video }
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-600">
                                        { pesona.deskripsi_video}
                                    </p>

                                    <a
                                        href={ pesona.url_video }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            mt-4 inline-flex items-center gap-2
                                            rounded-lg bg-primary
                                            px-3 py-2
                                            text-sm font-medium text-white
                                            shadow-sm transition
                                            hover:bg-primary/90
                                        "
                                    >
                                        <FaYoutube size={16} />
                                        Tonton di YouTube
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                    {/* SIDEBAR */}
                    <aside className="space-y-6">

                        {/* Related News */}
                        <div className="rounded-3xl border bg-white p-5">
                            <h3 className="font-bold">Berita Terkait</h3>

                            <div className="mt-5 space-y-4">
                                {related.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route("berita.show", item.slug)}
                                        className="flex gap-3"
                                    >
                                        <img
                                            src={
                                                item.images
                                                    ? item.images.startsWith("http")
                                                        ? item.images
                                                        : `/storage/berita/${item.images}`
                                                    : "https://placehold.co/120x90"
                                            }
                                            alt={item.judul}
                                            className="h-20 w-24 rounded-lg object-cover"
                                        />
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-slate-500">
                                                    { item.created_at_formatted }
                                                </span>

                                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                                                    { item.kategori?.nama_kategori  || "Berita"}
                                                </span>
                                            </div>

                                            <h4 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug">
                                                {item.judul}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <SidebarKategoriBerita kategoriBerita={kategori_berita} />
                    </aside>
                </div>
                {/* CTA */}
                <ContentCTA
                    icon={<FaInstagram size={24} />}
                    title="Ikuti Informasi Terkini Kota Kediri"
                    description="Dapatkan update kegiatan, program pemerintah, pengumuman, dan berbagai informasi terbaru melalui Instagram resmi Pemerintah Kota Kediri."
                    buttonText="Kunjungi Instagram"
                    href="https://instagram.com/pemkotkediri"
                    external
                />
            </section>
        </main>
        <Footer />
    </div>
    </>
  )
}