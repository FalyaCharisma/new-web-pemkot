import { Head, Link } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { ContentCTA } from "@/Components/ContentCTA";
import type { Penghargaan } from "@/types/penghargaan";

import {
    FaInstagram,
    FaFacebookF,
    FaXTwitter,
    FaWhatsapp,
} from "react-icons/fa6";

import {
    CalendarDays,
    Building2,
    Eye,
    Link2,
    ArrowLeft,
    Home,
    ChevronRight,
} from "lucide-react";

type PenghargaanDetail = Penghargaan & {
    count_view?: number | null;
    author?: string | number | null;
};

interface Props {
    penghargaan: PenghargaanDetail;
    penghargaanLainnya: PenghargaanDetail[];
}

const getImageUrl = (foto?: string | null) => {
    if (!foto) return "https://placehold.co/120x90";

    if (foto.startsWith("http")) return foto;

    if (foto.startsWith("/storage")) return foto;

    return `/storage/penghargaan/${foto}`;
};

const formatTanggal = (tanggal?: string | null) => {
    if (!tanggal) return "-";

    return new Date(tanggal).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export default function DetailPenghargaan({
    penghargaan,
    penghargaanLainnya,
}: Props) {
    const currentUrl =
        typeof window !== "undefined" ? window.location.href : "";
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(penghargaan.judul);

    const shareTo = (platform: "facebook" | "twitter" | "whatsapp") => {
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
        };

        window.open(urls[platform], "_blank", "noopener,noreferrer");
    };

    const copyLink = async () => {
        if (!currentUrl) return;

        await navigator.clipboard.writeText(currentUrl);
    };

    return (
        <>
            <Head title={penghargaan.judul} />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />

                <main className="pt-15">
                    <div className="container relative z-10 mx-auto px-4 py-3">
                        <div className="mt-13 flex items-center gap-2 text-sm text-slate-500">
                            <Home size={14} />
                            <Link href="/" className="hover:text-primary">
                                Beranda
                            </Link>

                            <ChevronRight size={14} />
                            <Link
                                href={route("penghargaan")}
                                className="hover:text-primary"
                            >
                                Penghargaan
                            </Link>

                            <ChevronRight size={14} />

                            <span className="line-clamp-1 font-medium text-slate-700">
                                Detail Penghargaan
                            </span>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <section className="container mx-auto px-4 py-10">
                        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                            <article className="rounded-3xl border bg-white p-6">
                                <div className="flex items-center justify-between gap-4">
                                    <Link
                                        href={route("penghargaan")}
                                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-primary hover:text-primary"
                                    >
                                        <ArrowLeft size={14} />
                                        Kembali
                                    </Link>
                                </div>

                                {/* Title */}
                                <h1 className="mt-4 text-4xl font-bold text-slate-900">
                                    {penghargaan.judul}
                                </h1>

                                {/* Meta */}
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays size={14} />
                                            <span>
                                                {formatTanggal(
                                                    penghargaan.tanggal,
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Building2 size={14} />
                                            <span>Pemerintah Kota Kediri</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Eye size={14} />
                                            <span>
                                                {penghargaan.count_view ?? 0} kali dibaca
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="mr-1 text-sm text-slate-500">
                                            Bagikan:
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => shareTo("facebook")}
                                            aria-label="Bagikan ke Facebook"
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-slate-500 transition-all hover:border-primary hover:bg-primary hover:text-white"
                                        >
                                            <FaFacebookF size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => shareTo("twitter")}
                                            aria-label="Bagikan ke X"
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-slate-500 transition-all hover:border-primary hover:bg-primary hover:text-white"
                                        >
                                            <FaXTwitter size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => shareTo("whatsapp")}
                                            aria-label="Bagikan ke WhatsApp"
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-slate-500 transition-all hover:border-primary hover:bg-primary hover:text-white"
                                        >
                                            <FaWhatsapp size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={copyLink}
                                            aria-label="Salin link"
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-slate-500 transition-all hover:border-primary hover:bg-primary hover:text-white"
                                        >
                                            <Link2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Cover */}
                                <img
                                    src={getImageUrl(penghargaan.foto)}
                                    alt={penghargaan.judul}
                                    className="mt-6 h-[420px] w-full rounded-2xl object-cover"
                                />

                                {/* Article */}
                                <div className="prose prose-slate mt-8 max-w-none">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: penghargaan.deskripsi,
                                        }}
                                    />
                                </div>
                            </article>

                            {/* SIDEBAR */}
                            <aside className="space-y-6">
                                <div className="rounded-3xl border bg-white p-5">
                                    <h3 className="font-bold">
                                        Penghargaan Lainnya
                                    </h3>

                                    <div className="mt-5 space-y-4">
                                        {penghargaanLainnya.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={route(
                                                    "penghargaan.show",
                                                    item.slug,
                                                )}
                                                className="group flex gap-3"
                                            >
                                                <img
                                                    src={getImageUrl(item.foto)}
                                                    alt={item.judul}
                                                    className="h-20 w-24 rounded-lg object-cover"
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <span className="text-xs text-slate-500">
                                                        {formatTanggal(
                                                            item.tanggal,
                                                        )}
                                                    </span>

                                                    <h4 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug transition group-hover:text-primary">
                                                        {item.judul}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}

                                        {penghargaanLainnya.length === 0 && (
                                            <p className="text-sm text-slate-500">
                                                Belum ada penghargaan lainnya.
                                            </p>
                                        )}
                                    </div>
                                </div>
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
