import { Head, Link } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { Home, ChevronRight } from "lucide-react";
import { ContentCTA } from "@/Components/ContentCTA";
import type { Penghargaan } from "@/types/penghargaan";

import {
    FaInstagram,
    FaFacebookF,
    FaXTwitter,
    FaWhatsapp,
} from "react-icons/fa6";

import { CalendarDays, Building2, Eye, Link2, ArrowLeft } from "lucide-react";

interface Props {
    penghargaan: Penghargaan;
    penghargaanLainnya: Penghargaan[];
}

export default function DetailPenghargaan({ penghargaan, penghargaanLainnya }: Props) {
    const getImageUrl = (foto?: string | null) => {
    if (!foto) return "https://placehold.co/120x90";

    if (foto.startsWith('http')) return foto;

    if (foto.startsWith('/storage')) return foto;

    return `/storage/penghargaan/${foto}`;
};
    return (
        <>
            <Head title="Detail Penghargaan" />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />

                <main className="pt-15">
                    <div className="container relative z-10 mx-auto px-4 py-3">
                        <div className="mt-13 flex items-center gap-2 text-sm text-slate-500">
                            <Home size={14} />
                            <span>Beranda</span>

                            <ChevronRight size={14} />
                            <span>Penghargaan</span>

                            <ChevronRight size={14} />

                            <span className="font-medium text-slate-700">
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
                                    {penghargaan.judul}
                                </h1>

                                {/* Meta */}
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays size={14} />
                                            <span>
                                                {new Date(
                                                    penghargaan.tanggal,
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Building2 size={14} />
                                            <span>Pemerintah Kota Kediri</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Eye size={14} />
                                            <span>1.234 kali dibaca</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="mr-1 text-sm text-slate-500">
                                            Bagikan:
                                        </span>

                                        {[
                                            FaFacebookF,
                                            FaXTwitter,
                                            FaWhatsapp,
                                        ].map((Icon, index) => (
                                            <button
                                                key={index}
                                                className="
                                            flex h-8 w-8 items-center justify-center
                                            rounded-lg border
                                            text-slate-500
                                            transition-all
                                            hover:border-primary
                                            hover:bg-primary
                                            hover:text-white
                                        "
                                            >
                                                <Icon size={14} />
                                            </button>
                                        ))}

                                        <button
                                            className="
                                        flex h-8 w-8 items-center justify-center
                                        rounded-lg border
                                        text-slate-500
                                        transition-all
                                        hover:border-primary
                                        hover:bg-primary
                                        hover:text-white
                                    "
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
                    href={route("penghargaan.show", item.id)}
                    className="group flex gap-3"
                >
                    <img
                        src={getImageUrl(item.foto)}
                        alt={item.judul}
                        className="h-20 w-24 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">
                                {new Date(item.tanggal).toLocaleDateString(
                                    "id-ID",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    },
                                )}
                            </span>

                           
                        </div>

                        <h4 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug transition group-hover:text-primary">
                            {item.judul}
                        </h4>
                    </div>
                </Link>
            ))}
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
