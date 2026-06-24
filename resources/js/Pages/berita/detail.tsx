import { Head, Link } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { Home, ChevronRight } from "lucide-react";
import { ContentCTA } from "@/Components/ContentCTA";
import SidebarKategoriBerita from "@/Components/site/SidebarKategoriBerita";

import {
    FaInstagram,
    FaFacebookF,
    FaXTwitter,
    FaWhatsapp,
} from "react-icons/fa6";

import {
    CalendarDays,
    Building2,
    Link2,
    ArrowLeft,
} from "lucide-react";

import type { Berita } from "@/types/berita";
import type { Kategori } from "@/types/kategori";
import { formatDate } from "@/Components/ui/date";

interface Props {
    berita: Berita;
    beritaTerbaru: Berita[];
    kategoriBerita: Kategori[];
}

const getBeritaImageUrl = (image?: string | null) => {
    if (!image) {
        return "/images/placeholder.jpg";
    }

    if (image.startsWith("http")) {
        return image;
    }

    if (image.startsWith("/storage")) {
        return image;
    }

    return `/storage/berita/${image}`;
};

const getCurrentUrl = () => {
    if (typeof window === "undefined") {
        return "";
    }

    return window.location.href;
};

const shareToFacebook = () => {
    const url = encodeURIComponent(getCurrentUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

const shareToX = (title: string) => {
    const url = encodeURIComponent(getCurrentUrl());
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
};

const shareToWhatsapp = (title: string) => {
    const url = encodeURIComponent(getCurrentUrl());
    const text = encodeURIComponent(`${title} ${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
};

const copyCurrentLink = async () => {
    const url = getCurrentUrl();

    if (navigator?.clipboard) {
        await navigator.clipboard.writeText(url);
        return;
    }

    const input = document.createElement("input");
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
};

export default function DetailBerita({
    berita,
    beritaTerbaru = [],
    kategoriBerita = [],
}: Props) {
    const deskripsiText = berita.deskripsi?.replace(/<[^>]*>/g, "") ?? "";

    return (
        <>
            <Head title={berita.judul || "Detail Berita"} />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />

                <main className="pt-15">
                    <div className="container relative z-10 mx-auto px-4 py-3">
                        <div className="mt-13 flex items-center gap-2 text-sm text-slate-500">
                            <Link href="/" className="inline-flex items-center gap-1 transition hover:text-primary">
                                <Home size={14} />
                                <span>Beranda</span>
                            </Link>

                            <ChevronRight size={14} />

                            <Link href={route("berita")} className="transition hover:text-primary">
                                Berita
                            </Link>

                            <ChevronRight size={14} />

                            <span className="font-medium text-slate-700">
                                Detail Berita
                            </span>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <section className="container mx-auto px-4 py-10">
                        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                            <article className="rounded-3xl border bg-white p-6">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                        {berita.kategori?.nama_kategori || "Berita"}
                                    </span>

                                    <Link
                                        href={route("berita")}
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
                                        <ArrowLeft size={14} />
                                        Kembali
                                    </Link>
                                </div>

                                {/* Title */}
                                <h1 className="mt-4 text-4xl font-bold text-slate-900">
                                    {berita.judul}
                                </h1>

                                {/* Meta */}
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays size={14} />
                                            <span>{formatDate(berita.tanggal)}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Building2 size={14} />
                                            <span>Pemerintah Kota Kediri</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="mr-1 text-sm text-slate-500">
                                            Bagikan:
                                        </span>

                                        <button
                                            type="button"
                                            onClick={shareToFacebook}
                                            className="
                                                flex h-8 w-8 items-center justify-center
                                                rounded-lg border
                                                text-slate-500
                                                transition-all
                                                hover:border-primary
                                                hover:bg-primary
                                                hover:text-white
                                            "
                                            aria-label="Bagikan ke Facebook"
                                        >
                                            <FaFacebookF size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => shareToX(berita.judul)}
                                            className="
                                                flex h-8 w-8 items-center justify-center
                                                rounded-lg border
                                                text-slate-500
                                                transition-all
                                                hover:border-primary
                                                hover:bg-primary
                                                hover:text-white
                                            "
                                            aria-label="Bagikan ke X"
                                        >
                                            <FaXTwitter size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => shareToWhatsapp(berita.judul)}
                                            className="
                                                flex h-8 w-8 items-center justify-center
                                                rounded-lg border
                                                text-slate-500
                                                transition-all
                                                hover:border-primary
                                                hover:bg-primary
                                                hover:text-white
                                            "
                                            aria-label="Bagikan ke WhatsApp"
                                        >
                                            <FaWhatsapp size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={copyCurrentLink}
                                            className="
                                                flex h-8 w-8 items-center justify-center
                                                rounded-lg border
                                                text-slate-500
                                                transition-all
                                                hover:border-primary
                                                hover:bg-primary
                                                hover:text-white
                                            "
                                            aria-label="Salin link berita"
                                        >
                                            <Link2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Cover */}
                                <img
                                    src={getBeritaImageUrl(berita.images)}
                                    alt={berita.judul}
                                    className="mt-6 h-[420px] w-full rounded-2xl object-cover"
                                />

                                {/* Article */}
                                <div className="prose prose-slate mt-8 max-w-none">
                                    <p>{deskripsiText}</p>
                                </div>
                            </article>

                            {/* SIDEBAR */}
                            <aside className="space-y-6">
                                {/* Related News */}
                                <div className="rounded-3xl border bg-white p-5">
                                    <h3 className="font-bold">
                                        Berita Terbaru
                                    </h3>

                                    <div className="mt-5 space-y-4">
                                        {beritaTerbaru.length > 0 ? (
                                            beritaTerbaru.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={route("berita.show", item.slug)}
                                                    className="group flex gap-3"
                                                >
                                                    <img
                                                        src={getBeritaImageUrl(item.images)}
                                                        alt={item.judul}
                                                        className="h-20 w-24 rounded-lg object-cover"
                                                    />

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className="text-xs text-slate-500">
                                                                {formatDate(item.tanggal)}
                                                            </span>

                                                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                                                                {item.kategori?.nama_kategori || "Berita"}
                                                            </span>
                                                        </div>

                                                        <h4 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug transition group-hover:text-primary">
                                                            {item.judul}
                                                        </h4>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-sm text-slate-500">
                                                Belum ada berita terbaru.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <SidebarKategoriBerita kategoriBerita={kategoriBerita} />
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
    );
}
