import { Head, Link, router } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { ContentCTA } from "@/Components/ContentCTA";
import type { Agenda } from "@/types/agenda";
import { useState } from "react";

import {
  FaInstagram,
} from "react-icons/fa6";

import {
    CalendarDays,
    Clock3,
    MapPin,
    PartyPopper,
    Landmark,
    Users,
} from "lucide-react";

interface Props {
    timelineAgenda: Agenda[];
    upcomingAgenda: Agenda[];
    search?: string;
}


export default function Agenda({ timelineAgenda, upcomingAgenda, search: initialSearch = "" }: Props) {
    const [search, setSearch] = useState(initialSearch);
    return (
        <>
        <Head title="Agenda" />
        <div className="min-h-screen bg-slate-50 text-foreground">
            <HeaderSolid />
            <main className="pt-15">
                <HeroPage
                    title="Agenda Kota Kediri"
                    breadcrumb="Agenda"
                    placeholder="Cari agenda atau kegiatan..."
                    description="Informasi kegiatan, acara, dan agenda penting yang diselenggarakan di Kota Kediri."

                    searchValue={search}
                    onSearchChange={(value) => setSearch(value)}
                    onSearch={(keyword) => {
                        router.get(
                            route("agenda.index"),
                            {
                                search: keyword,
                            },
                            {
                                preserveState: true,
                                preserveScroll: true,
                            }
                        );
                    }}
                />
                {/* CONTENT */}
                <section className="container mx-auto px-4 py-10">
                    <div className="mt-10 grid gap-8 lg:grid-cols-[380px_1fr]">
                        {/* ================= TIMELINE ================= */}
                        {timelineAgenda.length > 0 ? (

                            <div className="rounded-3xl border bg-white p-6 shadow-sm">

                                <div className="mb-6">
                                    <h2 className="text-xl font-bold">
                                        Timeline Agenda
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Agenda dan kegiatan yang akan datang
                                    </p>
                                </div>

                                <div
                                    className="
                                        max-h-[650px]
                                        overflow-y-auto
                                        pr-2
                                        space-y-6
                                        [-ms-overflow-style:none]
                                        [scrollbar-width:none]
                                        [&::-webkit-scrollbar]:hidden
                                    "
                                >

                                    {timelineAgenda.map((item, index) => (

                                        <div
                                            key={item.id}
                                            className="relative flex gap-5"
                                        >

                                            {index !== timelineAgenda.length - 1 && (
                                                <div className="absolute left-4 top-10 h-full w-0.5 bg-slate-200" />
                                            )}

                                            <div
                                                className={`
                                                    relative z-10 flex h-8 w-8 shrink-0
                                                    items-center justify-center rounded-full
                                                    ${
                                                        item.is_ongoing
                                                            ? "bg-green-500"
                                                            : "bg-primary"
                                                    }
                                                    text-white
                                                `}
                                            >
                                                <CalendarDays size={16} />
                                            </div>

                                            <Link
                                                href={route("agenda.show", item.id)}
                                                className="flex-1 rounded-2xl border bg-slate-50 p-4 transition hover:border-primary hover:shadow-sm"
                                            >

                                                <div className="flex items-start justify-between gap-3">

                                                    <h3 className="font-semibold">
                                                        {item.judul_acara}
                                                    </h3>

                                                    {item.is_ongoing && (
                                                        <span className="rounded-full bg-green-100 px-2 py-1 text-[11px] font-semibold text-green-700">
                                                            Sedang Berlangsung
                                                        </span>
                                                    )}

                                                </div>

                                                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                                                    <CalendarDays size={15}/>
                                                    {item.tanggal_mulai_formatted}
                                                </div>

                                                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                                    <MapPin size={15}/>
                                                    {item.lokasi_acara}
                                                </div>

                                            </Link>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        ) : (

                            <div className="rounded-2xl border border-dashed p-8 text-center">
                                <CalendarDays className="mx-auto mb-3 h-10 w-10 text-slate-400" />
                                <h3 className="font-semibold text-slate-700">
                                    Belum ada agenda
                                </h3>
                                <p className="mt-2 text-sm text-slate-500">
                                    Saat ini belum ada agenda yang dijadwalkan. Silakan cek kembali nanti.
                                </p>
                            </div>

                        )}

                        {/* ================= FEATURED ================= */}
                        <div className="space-y-10">

                        {/* ================= HERO ================= */}
                        {upcomingAgenda.length > 0 && (
                            <Link
                                href={route("agenda.show", upcomingAgenda[0].id)}
                                className="grid lg:grid-cols-2 gap-6 items-stretch group"
                            >
                                {/* IMAGE */}
                                <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-[4/5] lg:aspect-square">
                                    <img
                                    src={`/storage/agenda/${upcomingAgenda[0].banner}`}
                                    className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="flex flex-col justify-center">

                                    <span className="w-fit bg-primary text-white text-xs px-3 py-1 rounded-full">
                                    Agenda Terdekat
                                    </span>

                                    <h1 className="mt-4 text-3xl font-bold leading-tight">
                                    {upcomingAgenda[0].judul_acara}
                                    </h1>

                                    <div className="mt-5 text-sm text-slate-500 space-y-2">

                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={16}/>
                                        {upcomingAgenda[0].tanggal_mulai_formatted} - {upcomingAgenda[0].tanggal_selesai_formatted}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MapPin size={16}/>
                                        {upcomingAgenda[0].lokasi_acara}
                                    </div>

                                    </div>

                                    <div
                                    className="mt-6 text-slate-600 text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: upcomingAgenda[0].deskripsi
                                    }}
                                    />

                                </div>
                            </Link>
                        )}

                        {/* ================= SIMPLE LIST (NO CARD OVERKILL) ================= */}
                        {upcomingAgenda.length > 1 && (

                            <div className="space-y-5">

                        <h2 className="text-lg font-semibold">
                            Agenda Lainnya
                        </h2>

                        <div className="grid sm:grid-cols-4 gap-5">

                            {upcomingAgenda.slice(1).map(item => (

                            <Link
                                key={item.id}
                                href={route("agenda.show", item.id)}
                                className="rounded-2xl overflow-hidden border bg-white hover:shadow-md transition"
                            >

                                {/* IMAGE lebih besar & proporsional */}
                                <div className="aspect-[4/3] overflow-hidden bg-slate-100">

                                <img
                                    src={`/storage/agenda/${item.banner}`}
                                    className="h-full w-full object-cover hover:scale-105 transition duration-500"
                                />

                                </div>

                                {/* CONTENT */}
                                <div className="p-4">

                                <h3 className="text-sm font-semibold line-clamp-2">
                                    {item.judul_acara}
                                </h3>

                                <div className="mt-3 text-xs text-slate-500 space-y-1">

                                    <div className="flex items-center gap-2">
                                    <CalendarDays size={14}/>
                                    {item.tanggal_mulai_formatted}
                                    </div>

                                    <div className="flex items-center gap-2">
                                    <MapPin size={14}/>
                                    {item.lokasi_acara}
                                    </div>

                                </div>

                                </div>

                            </Link>

                            ))}

                        </div>

                        </div>
                        )}

                        </div>
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