import { Head, Link, router } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { ContentCTA } from "@/Components/ContentCTA";
import FloatingReport from "@/Components/site/Floating";

import type { Agenda as AgendaType } from "@/types/agenda";

import {
    CalendarDays,
    Clock3,
    MapPin,
    PartyPopper,
    ChevronRight,
    ChevronLeft,
    ArrowRight,
    CalendarCheck2,
} from "lucide-react";

import { FaInstagram } from "react-icons/fa6";

interface Props {
    timelineAgenda: AgendaType[];
    otherAgenda: AgendaType[];
    highlightAgenda?: AgendaType | null;
    highlightStatus?: string | null;
    search?: string;
}

export default function Agenda({
    timelineAgenda,
    otherAgenda,
    search: initialSearch = "",
}: Props) {
    const [search, setSearch] = useState(initialSearch);

    const [agendaPage, setAgendaPage] = useState(0);

    const agendaPerPage = 4;

    const agendaPages = useMemo(() => {
        const pages: AgendaType[][] = [];

        for (
            let i = 0;
            i < otherAgenda.length;
            i += agendaPerPage
        ) {
            pages.push(otherAgenda.slice(i, i + agendaPerPage));
        }

        return pages;
    }, [otherAgenda]);

    const totalAgendaPages = agendaPages.length;

    const nextAgendaPage = () => {
        setAgendaPage((current) =>
            current < totalAgendaPages - 1 ? current + 1 : 0,
        );
    };

    const prevAgendaPage = () => {
        setAgendaPage((current) =>
            current > 0 ? current - 1 : totalAgendaPages - 1,
        );
    };

    /*
    |--------------------------------------------------------------------------
    | DEFAULT TANGGAL = HARI INI
    |--------------------------------------------------------------------------
    */

    const [selectedDate, setSelectedDate] = useState<Date>(
        new Date(),
    );

    /*
    |--------------------------------------------------------------------------
    | FORMAT TANGGAL
    |--------------------------------------------------------------------------
    */

    const formatDate = (
        date: string | null | undefined,
    ) => {
        if (!date) return "-";

        const parsed = new Date(date);

        if (isNaN(parsed.getTime())) {
            return "-";
        }

        return parsed.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    /*
    |--------------------------------------------------------------------------
    | FORMAT JAM
    |--------------------------------------------------------------------------
    */

    const formatTime = (
        date: string | null | undefined,
    ) => {
        if (!date) return "";

        const parsed = new Date(date);

        if (isNaN(parsed.getTime())) {
            return "";
        }

        return parsed.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    /*
    |--------------------------------------------------------------------------
    | CEK APAKAH TANGGAL SAMA
    |--------------------------------------------------------------------------
    */

    const isSameDate = (
        date1: Date,
        date2: Date,
    ) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    /*
    |--------------------------------------------------------------------------
    | SEMUA TANGGAL YANG MEMILIKI AGENDA
    |--------------------------------------------------------------------------
    |
    | Agenda 22 - 23 Agustus akan menandai:
    |
    | 22 Agustus
    | 23 Agustus
    |
    */

    const agendaDates = useMemo(() => {
        const dates: Date[] = [];

        timelineAgenda.forEach((item) => {
            if (!item.tanggal_mulai) {
                return;
            }

            const start = new Date(
                item.tanggal_mulai,
            );

            const end = item.tanggal_selesai
                ? new Date(item.tanggal_selesai)
                : new Date(item.tanggal_mulai);

            if (
                isNaN(start.getTime()) ||
                isNaN(end.getTime())
            ) {
                return;
            }

            const current = new Date(start);

            current.setHours(0, 0, 0, 0);

            const endDate = new Date(end);

            endDate.setHours(0, 0, 0, 0);

            while (current <= endDate) {
                dates.push(new Date(current));

                current.setDate(
                    current.getDate() + 1,
                );
            }
        });

        return dates;
    }, [timelineAgenda]);

    /*
    |--------------------------------------------------------------------------
    | CEK TANGGAL PUNYA AGENDA
    |--------------------------------------------------------------------------
    */

    const isAgendaDate = (
        date: Date,
    ) => {
        return agendaDates.some(
            (agendaDate) =>
                isSameDate(
                    agendaDate,
                    date,
                ),
        );
    };

    /*
    |--------------------------------------------------------------------------
    | AGENDA BERDASARKAN TANGGAL YANG DIPILIH
    |--------------------------------------------------------------------------
    */

    const selectedAgenda = useMemo(() => {
        if (!selectedDate) {
            return [];
        }

        const selected = new Date(
            selectedDate,
        );

        selected.setHours(0, 0, 0, 0);

        return timelineAgenda.filter(
            (item) => {
                if (!item.tanggal_mulai) {
                    return false;
                }

                const start = new Date(
                    item.tanggal_mulai,
                );

                const end = item.tanggal_selesai
                    ? new Date(
                          item.tanggal_selesai,
                      )
                    : new Date(
                          item.tanggal_mulai,
                      );

                if (
                    isNaN(start.getTime()) ||
                    isNaN(end.getTime())
                ) {
                    return false;
                }

                start.setHours(0, 0, 0, 0);
                end.setHours(0, 0, 0, 0);

                return (
                    selected >= start &&
                    selected <= end
                );
            },
        );
    }, [
        selectedDate,
        timelineAgenda,
    ]);

    /*
    |--------------------------------------------------------------------------
    | AGENDA UNTUK HIGHLIGHT
    |--------------------------------------------------------------------------
    |
    | Mengambil agenda pertama pada tanggal yang dipilih.
    |
    */

    const selectedHighlight = useMemo(() => {
        return selectedAgenda.length > 0
            ? selectedAgenda[0]
            : null;
    }, [selectedAgenda]);

    /*
    |--------------------------------------------------------------------------
    | STATUS HIGHLIGHT
    |--------------------------------------------------------------------------
    */

    const selectedHighlightStatus = useMemo(() => {
        if (!selectedHighlight) {
            return null;
        }

        if (
            selectedHighlight.is_ongoing
        ) {
            return "Sedang Berlangsung";
        }

        const start = new Date(
            selectedHighlight.tanggal_mulai,
        );

        const now = new Date();

        if (start > now) {
            return "Agenda Mendatang";
        }

        return "Selesai";
    }, [selectedHighlight]);

    /*
    |--------------------------------------------------------------------------
    | TANGGAL YANG DIPILIH
    |--------------------------------------------------------------------------
    */

    const selectedDateLabel =
        selectedDate.toLocaleDateString(
            "id-ID",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            },
        );

    /*
    |--------------------------------------------------------------------------
    | SEARCH
    |--------------------------------------------------------------------------
    */

    const handleSearch = () => {
        router.get(
            route("agenda.index"),
            {
                search,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    /*
    |--------------------------------------------------------------------------
    | STATUS HIGHLIGHT
    |--------------------------------------------------------------------------
    */

    const isOngoing =
        selectedHighlightStatus ===
        "Sedang Berlangsung";

    const isUpcoming =
        selectedHighlightStatus ===
        "Agenda Mendatang";

    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <Head title="Agenda Kota Kediri" />

            <div className="min-h-screen bg-slate-50 text-foreground">

                <HeaderSolid />

                <main className="pt-15">

                    {/* ================================================= */}
                    {/* HERO */}
                    {/* ================================================= */}

                    <HeroPage
                        title="Agenda Kota Kediri"
                        breadcrumb="Agenda"
                        placeholder="Cari agenda atau kegiatan..."
                        description="Temukan berbagai kegiatan, acara, dan agenda yang berlangsung di Kota Kediri."
                        searchValue={search}
                        onSearchChange={(value) =>
                            setSearch(value)
                        }
                        onSearch={handleSearch}
                    />


                    {/* ================================================= */}
                    {/* MAIN */}
                    {/* ================================================= */}

                   <section className="container-page py-12">
                        {/* ================================================= */}
                        {/* CALENDAR SECTION */}
                        {/* ================================================= */}

                        <section>

                            {/* HEADER */}

                            <div className="mb-7">

                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                                    Kalender Kegiatan
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
                                    Agenda Kota Kediri
                                </h2>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                    Pilih tanggal untuk melihat
                                    agenda yang berlangsung pada
                                    hari tersebut.
                                </p>

                            </div>


                            {/* CALENDAR + HIGHLIGHT */}

                            <div className="grid gap-6 lg:grid-cols-[420px_1fr]">

                                {/* ================================================= */}
                                {/* CALENDAR */}
                                {/* ================================================= */}

                                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

                                    {/* CALENDAR HEADER */}

                                    <div className="flex items-center gap-3 border-b border-slate-100 pb-5">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <CalendarDays
                                                size={21}
                                            />
                                        </div>

                                        <div>

                                            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                                                Kalender
                                            </p>

                                            <h3 className="mt-0.5 font-bold text-slate-900">
                                                Pilih Tanggal
                                            </h3>

                                        </div>

                                    </div>


                                    {/* CALENDAR */}

                                    <div className="calendar-wrapper mt-5 flex justify-center">

                                        <DayPicker
                                            mode="single"
                                            selected={
                                                selectedDate
                                            }
                                            onSelect={(
                                                date,
                                            ) => {

                                                if (
                                                    date
                                                ) {
                                                    setSelectedDate(
                                                        date,
                                                    );
                                                }

                                            }}
                                            captionLayout="dropdown"
                                            startMonth={
                                                new Date(
                                                    2020,
                                                    0,
                                                )
                                            }
                                            endMonth={
                                                new Date(
                                                    2035,
                                                    11,
                                                )
                                            }
                                            className="agenda-calendar"

                                            components={{
                                                DayButton: (
                                                    props: any,
                                                ) => {

                                                    const hasAgenda =
                                                        isAgendaDate(
                                                            props.day
                                                                .date,
                                                        );

                                                    const isSelected =
                                                        props.modifiers
                                                            .selected;

                                                    const isToday =
                                                        props.modifiers
                                                            .today;

                                                    return (
                                                        <button
                                                            {...props}
                                                            className={`
                                                                relative flex h-11 w-11
                                                                items-center justify-center
                                                                rounded-xl text-sm
                                                                transition-all duration-200

                                                                ${
                                                                    hasAgenda &&
                                                                    !isSelected
                                                                        ? "bg-primary/15 font-bold text-primary hover:bg-primary/25"
                                                                        : ""
                                                                }

                                                                ${
                                                                    isSelected
                                                                        ? "!bg-primary !text-white shadow-lg shadow-primary/25"
                                                                        : ""
                                                                }

                                                                ${
                                                                    isToday &&
                                                                    !isSelected
                                                                        ? "ring-2 ring-primary/30"
                                                                        : ""
                                                                }

                                                                ${
                                                                    !hasAgenda &&
                                                                    !isSelected
                                                                        ? "text-slate-600 hover:bg-slate-100"
                                                                        : ""
                                                                }
                                                            `}
                                                        >

                                                            {
                                                                props
                                                                    .children
                                                            }


                                                            {hasAgenda && (
                                                                <span
                                                                    className={`
                                                                        absolute bottom-1
                                                                        h-1.5 w-1.5
                                                                        rounded-full

                                                                        ${
                                                                            isSelected
                                                                                ? "bg-white"
                                                                                : "bg-primary"
                                                                        }
                                                                    `}
                                                                />
                                                            )}

                                                        </button>
                                                    );
                                                },
                                            }}
                                        />

                                    </div>


                                    {/* LEGEND */}

                                    <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4">

                                        <div className="flex items-center gap-2">

                                            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">

                                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />

                                            </span>

                                            <span className="text-xs text-slate-500">
                                                Ada agenda
                                            </span>

                                        </div>


                                        <div className="flex items-center gap-2">

                                            <span className="h-6 w-6 rounded-lg bg-primary" />

                                            <span className="text-xs text-slate-500">
                                                Dipilih
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* ================================================= */}
                                {/* HIGHLIGHT BERDASARKAN TANGGAL */}
                                {/* ================================================= */}

                                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                                    {selectedHighlight ? (
                                        <div className="grid md:grid-cols-[0.9fr_1.1fr]">

                                    {/* FOTO */}
                                    <div className="relative min-h-[360px] overflow-hidden bg-slate-100 md:min-h-0">

                                        {selectedHighlight.banner ? (
                                            <img
                                                src={`/storage/agenda/${selectedHighlight.banner}`}
                                                alt={selectedHighlight.judul_acara}
                                                className="absolute inset-0 h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <CalendarDays
                                                    size={64}
                                                    className="text-slate-300"
                                                />
                                            </div>
                                        )}

                                        {/* OVERLAY */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                                        {/* STATUS */}
                                        <div className="absolute left-5 top-5 z-10">
                                            <span
                                                className={`
                                                    inline-flex items-center gap-2
                                                    rounded-full px-4 py-2
                                                    text-xs font-semibold
                                                    shadow-md backdrop-blur

                                                    ${
                                                        isOngoing
                                                            ? "bg-green-500 text-white"
                                                            : isUpcoming
                                                            ? "bg-white/95 text-primary"
                                                            : "bg-slate-800/90 text-white"
                                                    }
                                                `}
                                            >
                                                {isOngoing ? (
                                                    <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                                                ) : (
                                                    <CalendarCheck2 size={14} />
                                                )}

                                                {selectedHighlightStatus}
                                            </span>
                                        </div>

                                    </div>


                                    {/* DETAIL */}
                                    <div className="flex flex-col p-6 md:p-8 lg:p-10">

                                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                            <PartyPopper size={15} />

                                            Agenda {selectedDateLabel}
                                        </div>


                                        <h3 className="mt-3 text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                                            {selectedHighlight.judul_acara}
                                        </h3>


                                        {/* INFO */}
                                        <div className="mt-6 space-y-4">

                                            {/* TANGGAL */}
                                            <div className="flex items-start gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <CalendarDays size={18} />
                                                </div>

                                                <div>
                                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                                        Tanggal
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                                        {formatDate(
                                                            selectedHighlight.tanggal_mulai,
                                                        )}

                                                        {selectedHighlight.tanggal_selesai &&
                                                            ` - ${formatDate(
                                                                selectedHighlight.tanggal_selesai,
                                                            )}`}
                                                    </p>
                                                </div>

                                            </div>


                                            {/* WAKTU */}
                                            <div className="flex items-start gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <Clock3 size={18} />
                                                </div>

                                                <div>
                                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                                        Waktu
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                                        {formatTime(
                                                            selectedHighlight.tanggal_mulai,
                                                        )}

                                                        {selectedHighlight.tanggal_selesai &&
                                                            ` - ${formatTime(
                                                                selectedHighlight.tanggal_selesai,
                                                            )}`}
                                                    </p>
                                                </div>

                                            </div>


                                            {/* LOKASI */}
                                            <div className="flex items-start gap-3">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <MapPin size={18} />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                                        Lokasi
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                                        {selectedHighlight.lokasi_acara ||
                                                            "Lokasi belum tersedia"}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>


                                        {/* DESKRIPSI */}
                                        {selectedHighlight.deskripsi && (
                                            <div
                                                className="mt-6 line-clamp-4 text-sm leading-6 text-slate-500"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        selectedHighlight.deskripsi,
                                                }}
                                            />
                                        )}


                                        {/* BUTTON */}
                                        <div className="mt-auto pt-7">

                                            <Link
                                                href={route(
                                                    "agenda.show",
                                                    selectedHighlight.id,
                                                )}
                                                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                                            >
                                                Lihat Detail Agenda

                                                <ArrowRight size={16} />
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                                    ) : (

                                        /* ===================================== */
                                        /* TIDAK ADA AGENDA */
                                        /* ===================================== */

                                        <div className="flex min-h-[430px] flex-col items-center justify-center px-6 text-center">

                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50">

                                                <CalendarDays
                                                    size={
                                                        32
                                                    }
                                                    className="text-slate-300"
                                                />

                                            </div>


                                            <h3 className="mt-5 text-lg font-bold text-slate-800">
                                                Tidak Ada Agenda
                                            </h3>


                                            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">

                                                Tidak ada agenda yang
                                                berlangsung pada

                                                <br />

                                                <span className="font-semibold text-slate-500">
                                                    {
                                                        selectedDateLabel
                                                    }
                                                </span>

                                            </p>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </section>

                        {/* ================================================= */}
                        {/* AGENDA LAINNYA */}
                        {/* ================================================= */}

                        {otherAgenda.length > 0 && (
                            <section className="mt-16">

                                {/* HEADER */}
                                <div className="mb-6 flex items-end justify-between gap-4">

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                                            Kegiatan Lainnya
                                        </p>

                                        <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                            Agenda Kota Kediri
                                        </h2>

                                        <p className="mt-2 text-sm text-slate-500">
                                            Agenda yang sedang berlangsung, mendatang, maupun
                                            yang sudah selesai.
                                        </p>
                                    </div>

                                    {/* TOMBOL SLIDE */}
                                    {totalAgendaPages > 1 && (
                                        <div className="hidden items-center gap-2 sm:flex">

                                            <button
                                                type="button"
                                                onClick={prevAgendaPage}
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
                                                aria-label="Agenda sebelumnya"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={nextAgendaPage}
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
                                                aria-label="Agenda berikutnya"
                                            >
                                                <ChevronRight size={18} />
                                            </button>

                                        </div>
                                    )}

                                </div>


                                {/* ================================================= */}
                                {/* CARDS */}
                                {/* ================================================= */}

                                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                                    {agendaPages[agendaPage]?.map((item) => {

                                        /*
                                        |--------------------------------------------------------------------------
                                        | STATUS
                                        |--------------------------------------------------------------------------
                                        */

                                        let statusLabel = "Sudah Selesai";

                                        let statusClass =
                                            "bg-slate-100 text-slate-600";

                                        if (item.is_ongoing) {

                                            statusLabel = "Sedang Berlangsung";

                                            statusClass =
                                                "bg-green-100 text-green-700";

                                        } else if (item.is_upcoming) {

                                            statusLabel = "Agenda Mendatang";

                                            statusClass =
                                                "bg-red-100 text-red-700";

                                        }

                                        return (
                                            <Link
                                                key={item.id}
                                                href={route(
                                                    "agenda.show",
                                                    item.id,
                                                )}
                                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                            >

                                                {/* IMAGE */}

                                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">

                                                    {item.banner ? (

                                                        <img
                                                            src={`/storage/agenda/${item.banner}`}
                                                            alt={item.judul_acara}
                                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                        />

                                                    ) : (

                                                        <div className="flex h-full items-center justify-center">

                                                            <CalendarDays
                                                                size={35}
                                                                className="text-slate-300"
                                                            />

                                                        </div>

                                                    )}

                                                    {/* STATUS */}

                                                    <div className="absolute left-4 top-4">

                                                        <span
                                                            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold shadow-sm ${statusClass}`}
                                                        >
                                                            {statusLabel}
                                                        </span>

                                                    </div>

                                                </div>


                                                {/* CONTENT */}

                                                <div className="p-5">

                                                    <h3 className="line-clamp-2 font-bold leading-6 text-slate-800 transition group-hover:text-primary">
                                                        {item.judul_acara}
                                                    </h3>

                                                    <div className="mt-4 space-y-2">

                                                        {/* TANGGAL */}

                                                        <div className="flex items-center gap-2 text-xs text-slate-500">

                                                            <CalendarDays
                                                                size={14}
                                                                className="shrink-0 text-primary"
                                                            />

                                                            <span className="line-clamp-1">
                                                                {item.tanggal_mulai_formatted ??
                                                                    formatDate(
                                                                        item.tanggal_mulai,
                                                                    )}
                                                            </span>

                                                        </div>


                                                        {/* LOKASI */}

                                                        <div className="flex items-center gap-2 text-xs text-slate-500">

                                                            <MapPin
                                                                size={14}
                                                                className="shrink-0 text-primary"
                                                            />

                                                            <span className="line-clamp-1">
                                                                {item.lokasi_acara ||
                                                                    "Lokasi belum tersedia"}
                                                            </span>

                                                        </div>

                                                    </div>


                                                    {/* DETAIL */}

                                                    <div className="mt-5 inline-flex items-center text-xs font-semibold text-primary">

                                                        Lihat Agenda

                                                        <ChevronRight
                                                            size={15}
                                                            className="ml-1 transition-transform group-hover:translate-x-1"
                                                        />

                                                    </div>

                                                </div>

                                            </Link>
                                        );
                                    })}

                                </div>


                                {/* ================================================= */}
                                {/* PAGINATION / SLIDE INDICATOR */}
                                {/* ================================================= */}

                                {totalAgendaPages > 1 && (
                                    <div className="mt-7 flex items-center justify-center gap-2">

                                        {/* MOBILE PREVIOUS */}

                                        <button
                                            type="button"
                                            onClick={prevAgendaPage}
                                            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary hover:bg-primary hover:text-white sm:hidden"
                                            aria-label="Agenda sebelumnya"
                                        >
                                            <ChevronLeft size={17} />
                                        </button>


                                        {/* INDICATOR */}

                                        <div className="flex items-center gap-2">

                                            {agendaPages.map((_, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() =>
                                                        setAgendaPage(index)
                                                    }
                                                    className={`h-2 rounded-full transition-all ${
                                                        agendaPage === index
                                                            ? "w-6 bg-primary"
                                                            : "w-2 bg-slate-300"
                                                    }`}
                                                    aria-label={`Halaman agenda ${
                                                        index + 1
                                                    }`}
                                                />
                                            ))}

                                        </div>


                                        {/* MOBILE NEXT */}

                                        <button
                                            type="button"
                                            onClick={nextAgendaPage}
                                            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary hover:bg-primary hover:text-white sm:hidden"
                                            aria-label="Agenda berikutnya"
                                        >
                                            <ChevronRight size={17} />
                                        </button>

                                    </div>
                                )}

                            </section>
                        )}

                        {/* ================================================= */}
                        {/* CTA */}
                        {/* ================================================= */}

                        <div className="mt-16">

                            <ContentCTA
                                icon={
                                    <FaInstagram
                                        size={24}
                                    />
                                }
                                title="Ikuti Informasi Terkini Kota Kediri"
                                description="Dapatkan update kegiatan, program pemerintah, pengumuman, dan berbagai informasi terbaru melalui Instagram resmi Pemerintah Kota Kediri."
                                buttonText="Kunjungi Instagram"
                                href="https://instagram.com/pemkotkediri"
                                external
                            />

                        </div>

                    </section>

                </main>


                <FloatingReport />

                <Footer />

            </div>


            {/* ================================================= */}
            {/* CALENDAR CSS */}
            {/* ================================================= */}

            <style>{`

                .calendar-wrapper .rdp {
                    width: 100%;
                    margin: 0;
                }

                .calendar-wrapper .rdp-months {
                    width: 100%;
                    justify-content: center;
                }

                .calendar-wrapper .rdp-month {
                    width: 100%;
                }

                .calendar-wrapper .rdp-table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 4px;
                }

                .calendar-wrapper .rdp-head_cell {
                    padding-bottom: 8px;

                    font-size: 10px;
                    font-weight: 700;

                    text-transform: uppercase;

                    color: #94a3b8;
                }

                .calendar-wrapper .rdp-day {
                    padding: 0;
                    text-align: center;
                }

                .calendar-wrapper .rdp-day_button {
                    width: 44px;
                    height: 44px;

                    padding: 0;
                }

                .calendar-wrapper .rdp-caption {
                    padding-bottom: 18px;
                }

                .calendar-wrapper .rdp-caption_label {
                    font-size: 15px;
                    font-weight: 700;

                    color: #0f172a;
                }

                .calendar-wrapper .rdp-dropdown {
                    appearance: none;

                    border: 1px solid #e2e8f0;
                    border-radius: 10px;

                    background: white;

                    padding: 6px 28px 6px 9px;

                    font-size: 12px;
                    font-weight: 600;

                    color: #334155;

                    cursor: pointer;

                    transition: all 0.2s ease;
                }

                .calendar-wrapper .rdp-dropdown:hover {
                    border-color: hsl(var(--primary));
                }

                .calendar-wrapper .rdp-day_outside {
                    opacity: 0.35;
                }

                .calendar-wrapper .rdp-button_reset:focus-visible {
                    outline: 2px solid hsl(var(--primary) / 0.4);
                    outline-offset: 2px;
                }

            `}</style>
        </>
    );
}