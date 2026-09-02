import {
    ArrowUpRight,
    Building2,
    UserRound,
} from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Berita } from "@/types/berita";
import { formatDate } from "../ui/date";
import { Link } from "@inertiajs/react";

type Props = {
    beritaProkopim: Berita[];
    beritaKominfo: Berita[];
};

export function News({
    beritaProkopim,
    beritaKominfo,
}: Props) {
    return (
        <section
            id="berita"
            className="relative py-10 md:py-28"
        >
            <div className="container-page">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

                    <div className="max-w-2xl">

                        <SectionLabel>
                            Kabar Terbaru
                        </SectionLabel>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                            Kota Kediri{" "}
                            <span className="font-serif italic text-gold">
                                hari ini
                            </span>
                        </h2>

                        <p className="mt-4 max-w-3xl text-muted-foreground md:text-lg">
                            Ikuti perkembangan terkini dan informasi resmi
                            dari Pemerintah Kota Kediri.
                        </p>

                    </div>

                    <Link
                        href="/berita"
                        className="group inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium transition-all hover:border-primary hover:text-primary"
                    >
                        Lihat semua berita

                        <ArrowUpRight
                            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>

                </div>


                {/* =====================================================
                    BERITA
                ====================================================== */}

                <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-2">

                    {/* =================================================
                        KOMINFO
                    ================================================== */}

                    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white">

                        {/* HEADER */}
                        <div className="shrink-0 border-b border-border px-6 py-5">

                            <div className="flex items-center justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <Building2 className="size-5" />
                                    </div>

                                    <div>

                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                                            Diskominfo
                                        </p>

                                        <h3 className="mt-0.5 text-lg font-bold">
                                            Informasi Pemerintah Kota
                                        </h3>

                                    </div>

                                </div>

                                <span className="hidden rounded-full bg-slate-50 px-3 py-1 text-xs text-muted-foreground sm:block">
                                    {beritaKominfo.length} berita
                                </span>

                            </div>

                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                Informasi pelayanan, kebijakan, dan kegiatan
                                Pemerintah Kota Kediri.
                            </p>

                        </div>


                        {/* =================================================
                            CARD KOMINFO
                        ================================================== */}

                        <div className="flex-1 p-5">

                            {beritaKominfo.length > 0 ? (

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                    {beritaKominfo.map((item) => (

                                        <Link
                                            key={item.id}
                                            href={route(
                                                "berita.show",
                                                item.slug
                                            )}
                                            className="group block"
                                        >

                                            <article className="h-full overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">

                                                {/* FOTO */}
                                                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">

                                                    <img
                                                        src={item.images}
                                                        alt={item.judul}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />

                                                </div>


                                                {/* CONTENT */}
                                                <div className="flex min-h-[190px] flex-col p-4">

                                                    {/* META */}
                                                    <div className="flex flex-wrap items-center gap-2">

                                                        <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                                                            Kominfo
                                                        </span>

                                                        <span className="text-[10px] text-muted-foreground">
                                                            {formatDate(item.tanggal)}
                                                        </span>

                                                    </div>


                                                    {/* JUDUL */}
                                                    <h4 className="mt-3 line-clamp-3 text-sm font-bold leading-snug transition-colors group-hover:text-primary">
                                                        {item.judul}
                                                    </h4>


                                                    {/* DESKRIPSI */}
                                                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                                                        {item.deskripsi}
                                                    </p>


                                                    {/* LINK */}
                                                    <div className="mt-auto pt-4">

                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">

                                                            Baca selengkapnya

                                                            <ArrowUpRight
                                                                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                            />

                                                        </span>

                                                    </div>

                                                </div>

                                            </article>

                                        </Link>

                                    ))}

                                </div>

                            ) : (

                                <div className="flex h-full min-h-[300px] items-center justify-center px-6 py-12 text-center">

                                    <div>

                                        <Building2 className="mx-auto size-8 text-slate-300" />

                                        <p className="mt-3 text-sm text-muted-foreground">
                                            Belum ada informasi Pemerintah Kota.
                                        </p>

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* FOOTER */}
                        {beritaKominfo.length > 0 && (

                            <div className="shrink-0 border-t border-border px-6 py-4">

                                <Link
                                    href="/berita"
                                    className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
                                >

                                    Lihat berita lainnya

                                    <ArrowUpRight
                                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />

                                </Link>

                            </div>

                        )}

                    </div>

                    {/* =================================================
                        PROKOPIM
                    ================================================== */}

                    <div className="flex min-h-0 h-full flex-col overflow-hidden rounded-3xl border border-border bg-white">

                        {/* HEADER */}
                        <div className="shrink-0 border-b border-border px-6 py-5">

                            <div className="flex items-center justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <UserRound className="size-5" />
                                    </div>

                                    <div>

                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                                            Prokopim
                                        </p>

                                        <h3 className="mt-0.5 text-lg font-bold">
                                            Informasi Kepala Daerah
                                        </h3>

                                    </div>

                                </div>

                                <span className="hidden rounded-full bg-slate-50 px-3 py-1 text-xs text-muted-foreground sm:block">
                                    {beritaProkopim.length} berita
                                </span>

                            </div>

                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                Informasi dan kegiatan Wali Kota serta
                                Wakil Wali Kota Kediri.
                            </p>

                        </div>


                        {/* =================================================
                            LIST PROKOPIM - SCROLL
                        ================================================== */}

                        <div className="min-h-0 flex-1 overflow-y-auto">

                            {beritaProkopim.length > 0 ? (

                                <div className="divide-y divide-border">

                                    {beritaProkopim
                                        .slice(0, 10)
                                        .map((item) => (

                                            <Link
                                                key={item.id}
                                                href={route(
                                                    "berita.show",
                                                    item.slug
                                                )}
                                                className="group block px-5 py-4 transition-colors hover:bg-slate-50/70"
                                            >

                                                <article className="flex gap-4">

                                                    {/* FOTO */}
                                                    <div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-40">

                                                        <img
                                                            src={item.images}
                                                            alt={item.judul}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />

                                                    </div>


                                                    {/* CONTENT */}
                                                    <div className="flex min-w-0 flex-1 flex-col">

                                                        {/* META */}
                                                        <div className="flex flex-wrap items-center gap-2">

                                                            <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                                                                Prokopim
                                                            </span>

                                                            <span className="text-[11px] text-muted-foreground">
                                                                {formatDate(item.tanggal)}
                                                            </span>

                                                        </div>


                                                        {/* JUDUL */}
                                                        <h4 className="mt-2 line-clamp-2 text-sm font-bold leading-snug transition-colors group-hover:text-primary sm:text-base">
                                                            {item.judul}
                                                        </h4>


                                                        {/* DESKRIPSI */}
                                                        <p className="mt-1.5 hidden line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:block">
                                                            {item.deskripsi}
                                                        </p>


                                                        {/* LINK */}
                                                        <div className="mt-auto pt-2">

                                                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">

                                                                Baca selengkapnya

                                                                <ArrowUpRight
                                                                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                                />

                                                            </span>

                                                        </div>

                                                    </div>

                                                </article>

                                            </Link>

                                        ))}

                                </div>

                            ) : (

                                <div className="flex h-full min-h-[300px] items-center justify-center px-6 py-12 text-center">

                                    <div>

                                        <UserRound className="mx-auto size-8 text-slate-300" />

                                        <p className="mt-3 text-sm text-muted-foreground">
                                            Belum ada informasi kepala daerah.
                                        </p>

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* FOOTER */}
                        {beritaProkopim.length > 0 && (

                            <div className="shrink-0 border-t border-border px-6 py-4">

                                <Link
                                    href="/berita"
                                    className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
                                >

                                    Lihat berita lainnya

                                    <ArrowUpRight
                                        className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />

                                </Link>

                            </div>

                        )}

                    </div>

                </div>

            </div>
        </section>
    );
}