import { Head, Link } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { ContentCTA } from "@/Components/ContentCTA";
import type { Agenda as AgendaType } from "@/types/agenda";

import {
    FaInstagram,
    FaFacebookF,
    FaXTwitter,
    FaWhatsapp,
} from "react-icons/fa6";

import {
    ArrowLeft,
    CalendarDays,
    ChevronRight,
    Clock3,
    ExternalLink,
    Home,
    Link2,
    MapPin,
    PartyPopper,
} from "lucide-react";

interface Props {
    agenda: AgendaType;
    agendaLainnya: AgendaType[];
}

const getAgendaImageUrl = (banner?: string | null) => {
    if (!banner) return null;

    if (banner.startsWith("http://") || banner.startsWith("https://")) {
        return banner;
    }

    if (banner.startsWith("/storage")) {
        return banner;
    }

    if (banner.startsWith("/")) {
        return banner;
    }

    return `/storage/agenda/${banner}`;
};

const getDateRange = (item: AgendaType) => {
    const start = item.tanggal_mulai_formatted || item.tanggal_mulai;
    const end = item.tanggal_selesai_formatted || item.tanggal_selesai;

    if (!end || start === end) {
        return start || "-";
    }

    return `${start} - ${end}`;
};

function AgendaImage({
    item,
    className = "",
}: {
    item: AgendaType;
    className?: string;
}) {
    const image = getAgendaImageUrl(item.banner);

    if (!image) {
        return (
            <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 ${className}`}
            >
                <div className="rounded-2xl bg-white/80 p-5 shadow-sm">
                    <CalendarDays className="h-12 w-12 text-primary" />
                </div>
            </div>
        );
    }

    return (
        <img
            src={image}
            alt={item.judul_acara}
            className={`h-full w-full object-cover ${className}`}
            loading="lazy"
        />
    );
}

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

export default function DetailAgenda({
    agenda,
    agendaLainnya = [],
}: Props) {
    const statusLabel = agenda.is_ongoing ? "Sedang Berlangsung" : "Terjadwal";

    return (
        <>
            <Head title={agenda.judul_acara || "Detail Agenda"} />

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

                            <Link href={route("agenda.index")} className="transition hover:text-primary">
                                Agenda
                            </Link>

                            <ChevronRight size={14} />

                            <span className="line-clamp-1 font-medium text-slate-700">
                                {agenda.judul_acara}
                            </span>
                        </div>
                    </div>

                    <section className="container mx-auto px-4 py-10">
                        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                            <article className="rounded-3xl border bg-white p-6">
                                <div className="flex items-center justify-between gap-4">
                                    <span
                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                                            agenda.is_ongoing
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-primary/10 text-primary"
                                        }`}
                                    >
                                        {agenda.is_ongoing ? (
                                            <PartyPopper size={14} />
                                        ) : (
                                            <CalendarDays size={14} />
                                        )}
                                        {statusLabel}
                                    </span>

                                    <Link
                                        href={route("agenda.index")}
                                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-primary hover:text-primary"
                                    >
                                        <ArrowLeft size={14} />
                                        Kembali
                                    </Link>
                                </div>

                                <h1 className="mt-4 text-4xl font-bold text-slate-900">
                                    {agenda.judul_acara}
                                </h1>

                                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays size={14} />
                                            <span>{getDateRange(agenda)}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} />
                                            <span>{agenda.lokasi_acara || "Kota Kediri"}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="mr-1 text-sm text-slate-500">
                                            Bagikan:
                                        </span>

                                        <button
                                            type="button"
                                            onClick={shareToFacebook}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-slate-500 transition-all hover:border-primary hover:bg-primary hover:text-white"
                                            aria-label="Bagikan ke Facebook"
                                        >
                                            <FaFacebookF size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => shareToX(agenda.judul_acara)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-slate-500 transition-all hover:border-primary hover:bg-primary hover:text-white"
                                            aria-label="Bagikan ke X"
                                        >
                                            <FaXTwitter size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => shareToWhatsapp(agenda.judul_acara)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-slate-500 transition-all hover:border-primary hover:bg-primary hover:text-white"
                                            aria-label="Bagikan ke WhatsApp"
                                        >
                                            <FaWhatsapp size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={copyCurrentLink}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-slate-500 transition-all hover:border-primary hover:bg-primary hover:text-white"
                                            aria-label="Salin link agenda"
                                        >
                                            <Link2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 h-[420px] w-full overflow-hidden rounded-2xl bg-slate-100">
                                    <AgendaImage item={agenda} />
                                </div>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-2xl border bg-slate-50 p-4">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                                            <Clock3 size={16} className="text-primary" />
                                            Waktu Pelaksanaan
                                        </div>
                                        <p className="mt-2 text-sm text-slate-600">
                                            {getDateRange(agenda)}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border bg-slate-50 p-4">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                                            <MapPin size={16} className="text-primary" />
                                            Lokasi Agenda
                                        </div>
                                        <p className="mt-2 text-sm text-slate-600">
                                            {agenda.lokasi_acara || "Kota Kediri"}
                                        </p>
                                    </div>
                                </div>

                                <div className="prose prose-slate mt-8 max-w-none">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: agenda.deskripsi || "",
                                        }}
                                    />
                                </div>
                            </article>

                            <aside className="space-y-6">
                                {agenda.maps_lokasi && (
                                    <div className="rounded-3xl border bg-white p-5">
                                        <h3 className="font-bold">Lokasi Agenda</h3>
                                        <p className="mt-2 text-sm text-slate-500">
                                            Buka lokasi agenda melalui Google Maps.
                                        </p>

                                        <a
                                            href={agenda.maps_lokasi}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                                        >
                                            Lihat Lokasi
                                            <ExternalLink size={16} />
                                        </a>
                                    </div>
                                )}

                                <div className="rounded-3xl border bg-white p-5">
                                    <h3 className="font-bold">Agenda Lainnya</h3>

                                    <div className="mt-5 space-y-4">
                                        {agendaLainnya.length > 0 ? (
                                            agendaLainnya.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={route("agenda.show", item.id)}
                                                    className="group flex gap-3"
                                                >
                                                    <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                                        <AgendaImage
                                                            item={item}
                                                            className="transition duration-500 group-hover:scale-105"
                                                        />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className="text-xs text-slate-500">
                                                                {getDateRange(item)}
                                                            </span>

                                                            {item.is_ongoing && (
                                                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                                                    Berlangsung
                                                                </span>
                                                            )}
                                                        </div>

                                                        <h4 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug transition group-hover:text-primary">
                                                            {item.judul_acara}
                                                        </h4>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-sm text-slate-500">
                                                Belum ada agenda lainnya.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </aside>
                        </div>

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
