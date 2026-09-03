import {
    ArrowUpRight,
    Calendar,
    Clock,
    MapPin,
} from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Agenda as AgendaType } from "@/types/agenda";
import { formatDate } from "../ui/date";
import { Link } from "@inertiajs/react";

interface Props {
    agenda: AgendaType[];
}

export function Agenda({ agenda }: Props) {
    const [featured, ...rest] = agenda;

    if (!featured) return null;

    const formatTime = (date: string) => {
        return new Date(date).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getMonth = (date: string) => {
        return new Date(date).toLocaleString("id-ID", {
            month: "short",
        });
    };

    const getDay = (date: string) => {
        return new Date(date)
            .getDate()
            .toString()
            .padStart(2, "0");
    };

    return (
        <section
            id="agenda"
           className="relative overflow-hidden py-10 md:py-2"
        >
            <div className="container-page">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

                    <div className="max-w-2xl">

                        <SectionLabel>
                            Agenda &amp; Event Kota
                        </SectionLabel>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                            Kota Kediri{" "}
                            <span className="font-serif italic text-gold">
                                Terkini
                            </span>
                        </h2>

                        <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">
                            Jangan lewatkan berbagai acara menarik di Kota
                            Kediri. Temukan festival, pertunjukan, kegiatan
                            budaya, hingga event publik yang bisa kamu ikuti.
                        </p>

                    </div>


                    <Link
                        href="/agenda"
                        className="group inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-sm"
                    >
                        Lihat semua agenda

                        <ArrowUpRight
                            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>

                </div>


                {/* =====================================================
                    AGENDA CONTENT
                ====================================================== */}

                <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">


                    {/* =================================================
                        FEATURED AGENDA
                    ================================================== */}

                    <Link
                        href={route(
                            "agenda.show",
                            featured.id
                        )}
                        className="group block"
                    >

                        <article className="relative min-h-[500px] overflow-hidden rounded-[2rem] border border-border bg-slate-900 shadow-elegant">

                            {/* IMAGE */}

                            <img
                                src={
                                    featured.banner ??
                                    "/noimage.png"
                                }
                                alt={featured.judul_acara}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />


                            {/* OVERLAY */}

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5" />


                            {/* TOP BADGE */}

                            <div className="absolute left-5 top-5 sm:left-7 sm:top-7">

                                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-slate-900 shadow-lg backdrop-blur">

                                    <span className="size-2 rounded-full bg-primary" />

                                    Agenda Pilihan

                                </span>

                            </div>


                            {/* DATE BOX */}

                            <div className="absolute right-5 top-5 flex size-[76px] flex-col items-center justify-center rounded-2xl bg-white/95 shadow-xl backdrop-blur sm:right-7 sm:top-7">

                                <span className="font-serif text-3xl font-bold leading-none text-slate-900">
                                    {getDay(
                                        featured.tanggal_mulai
                                    )}
                                </span>

                                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                                    {getMonth(
                                        featured.tanggal_mulai
                                    )}
                                </span>

                            </div>


                            {/* CONTENT */}

                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">

                                <div className="flex flex-wrap items-center gap-2 text-xs text-white/80">

                                    <span className="inline-flex items-center gap-1.5">
                                        <Calendar className="size-3.5 text-gold" />
                                        {formatDate(
                                            featured.tanggal_mulai
                                        )}
                                    </span>

                                    <span className="text-white/40">
                                        •
                                    </span>

                                    <span className="inline-flex items-center gap-1.5">
                                        <Clock className="size-3.5 text-gold" />
                                        {formatTime(
                                            featured.tanggal_mulai
                                        )}
                                    </span>

                                </div>


                                <h3 className="mt-3 max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                                    {featured.judul_acara}
                                </h3>


                                <div className="mt-3 flex items-center gap-2 text-sm text-white/80">

                                    <MapPin className="size-4 shrink-0 text-gold" />

                                    <span className="line-clamp-1">
                                        {featured.lokasi_acara}
                                    </span>

                                </div>


                                {/* CTA */}

                                <div className="mt-6">

                                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition-all duration-300 group-hover:gap-3 group-hover:bg-primary group-hover:text-white">

                                        Lihat detail agenda

                                        <ArrowUpRight className="size-4" />

                                    </span>

                                </div>

                            </div>

                        </article>

                    </Link>


                    {/* =================================================
                        AGENDA LAINNYA
                    ================================================== */}

                    <div className="flex flex-col">

                        {/* HEADER */}

                        <div className="mb-4 flex items-center justify-between">

                            <div>

                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                                    Agenda lainnya
                                </p>

                                <h3 className="mt-1 text-xl font-bold">
                                    Jangan sampai terlewat
                                </h3>

                            </div>

                        </div>


                        {/* LIST */}

                        <div className="space-y-4">

                            {rest.slice(0, 4).map((item) => (

                                <Link
                                    key={item.id}
                                    href={route(
                                        "agenda.show",
                                        item.id
                                    )}
                                    className="group block"
                                >

                                    <article className="flex min-h-[120px] gap-4 rounded-2xl border border-border bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">

                                        {/* FOTO */}

                                        <div className="relative h-[104px] w-[120px] shrink-0 overflow-hidden rounded-xl bg-slate-100">

                                            <img
                                                src={
                                                    item.banner ??
                                                    "/noimage.png"
                                                }
                                                alt={
                                                    item.judul_acara
                                                }
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                        </div>


                                        {/* DATE */}

                                        <div className="flex w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/5">

                                            <span className="font-serif text-xl font-bold leading-none text-primary">
                                                {getDay(
                                                    item.tanggal_mulai
                                                )}
                                            </span>

                                            <span className="mt-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                                                {getMonth(
                                                    item.tanggal_mulai
                                                )}
                                            </span>

                                        </div>


                                        {/* CONTENT */}

                                        <div className="flex min-w-0 flex-1 flex-col py-1">

                                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">

                                                <Clock className="size-3" />

                                                {formatTime(
                                                    item.tanggal_mulai
                                                )}

                                            </div>


                                            <h4 className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug transition-colors group-hover:text-primary sm:text-base">
                                                {item.judul_acara}
                                            </h4>


                                            <div className="mt-auto flex items-center gap-1.5 pt-2 text-[11px] text-muted-foreground">

                                                <MapPin className="size-3 shrink-0" />

                                                <span className="line-clamp-1">
                                                    {item.lokasi_acara}
                                                </span>

                                            </div>

                                        </div>


                                        {/* ARROW */}

                                        <div className="hidden items-center pr-1 sm:flex">

                                            <div className="flex size-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-primary group-hover:text-white">

                                                <ArrowUpRight className="size-4" />

                                            </div>

                                        </div>

                                    </article>

                                </Link>

                            ))}

                        </div>


                        {/* MOBILE ALL */}

                        <Link
                            href="/agenda"
                            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary sm:hidden"
                        >
                            Lihat semua agenda
                            <ArrowUpRight className="size-4" />
                        </Link>

                    </div>

                </div>

            </div>
        </section>
    );
}