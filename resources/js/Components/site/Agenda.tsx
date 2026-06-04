import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import festival from "@/assets/agenda-festival.jpg";
import marathon from "@/assets/agenda-marathon.jpg";
import bazaar from "@/assets/agenda-bazaar.jpg";
import dance from "@/assets/culture-dance.jpg";

type Event = {
    date: { day: string; month: string };
    category: string;
    title: string;
    location: string;
    time: string;
    image: string;
    featured?: boolean;
};

const events: Event[] = [
    {
        date: { day: "21", month: "Jun" },
        category: "Festival Budaya",
        title: "Kediri Nite Carnival 2026",
        location: "Jalan Dhoho · Kota Kediri",
        time: "18.30 — 23.00 WIB",
        image: festival,
        featured: true,
    },
    {
        date: { day: "05", month: "Jul" },
        category: "Olahraga",
        title: "Kediri Heritage Run 10K",
        location: "Simpang Lima Gumul",
        time: "05.30 WIB",
        image: marathon,
    },
    {
        date: { day: "12", month: "Jul" },
        category: "UMKM Expo",
        title: "Bazaar Kreatif Dhoho Street",
        location: "Taman Sekartaji",
        time: "16.00 — 22.00 WIB",
        image: bazaar,
    },
    {
        date: { day: "27", month: "Jul" },
        category: "Seni Pertunjukan",
        title: "Malam Jaranan Nusantara",
        location: "Pendopo Kota Kediri",
        time: "19.30 WIB",
        image: dance,
    },
];

export function Agenda() {
    const [featured, ...rest] = events;

    return (
        <section id="agenda" className="relative">
            <div className="container-page">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <SectionLabel>Agenda &amp; Event Kota</SectionLabel>
                        <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                            Jadwal kegiatan{" "}
                            <span className="font-serif italic text-gold">
                                Kota Kediri
                            </span>
                        </h2>
                        <p className="mt-5 max-w-xl text-muted-foreground">
                            Festival, expo, perayaan budaya, dan kegiatan publik
                            — dikurasi langsung oleh Pemerintah Kota untuk warga
                            &amp; pengunjung.
                        </p>
                    </div>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
                    >
                        Lihat semua agenda
                        <ArrowUpRight className="size-4" />
                    </a>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[1.8fr_1fr]">
                    {/* Featured event */}
                    <article className="group relative overflow-hidden rounded-3xl border border-border shadow-elegant">
                        <img
                            src={featured.image}
                            alt={featured.title}
                            loading="lazy"
                            width={1600}
                            height={1024}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        <div className="absolute left-6 top-6 flex size-20 flex-col items-center justify-center rounded-2xl bg-gradient-gold text-gold-foreground shadow-elegant">
                            <span className="font-serif text-3xl leading-none">
                                {featured.date.day}
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] leading-none">
                                {featured.date.month}
                            </span>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-gold backdrop-blur">
                                {featured.category}
                            </span>

                            <h3 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-white md:text-4xl">
                                {featured.title}
                            </h3>

                            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
                                <span className="inline-flex items-center gap-2">
                                    <MapPin className="size-4 text-gold" />
                                    {featured.location}
                                </span>

                                <span className="inline-flex items-center gap-2">
                                    <Calendar className="size-4 text-gold" />
                                    {featured.time}
                                </span>
                            </div>

                            <a
                                href="#"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:gap-3"
                            >
                                Daftar &amp; info lengkap
                                <ArrowUpRight className="size-4" />
                            </a>
                        </div>
                    </article>

                    {/* Right side events */}
                    <div className="grid h-full grid-rows-3 gap-6">
                        {rest.map((e) => (
                            <article
                                key={e.title}
                                className="group flex h-full gap-5 overflow-hidden rounded-2xl border border-border bg-gradient-card p-4 transition-colors hover:bg-card"
                            >
                                <div className="relative aspect-square w-32 shrink-0 overflow-hidden rounded-xl">
                                    <img
                                        src={e.image}
                                        alt={e.title}
                                        loading="lazy"
                                        width={400}
                                        height={400}
                                        className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute left-2 top-2 grid size-12 place-items-center rounded-lg bg-background/80 backdrop-blur">
                                        <span className="font-serif text-lg leading-none">
                                            {e.date.day}
                                        </span>

                                        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-gold">
                                            {e.date.month}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col py-1">
                                    <span className="text-[11px] uppercase tracking-[0.18em] text-gold">
                                        {e.category}
                                    </span>

                                    <h3 className="mt-1 text-lg font-semibold leading-snug">
                                        {e.title}
                                    </h3>

                                    <div className="mt-auto flex flex-col gap-1 pt-3 text-xs text-muted-foreground">
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin className="size-3" />
                                            {e.location}
                                        </span>

                                        <span className="inline-flex items-center gap-1.5">
                                            <Calendar className="size-3" />
                                            {e.time}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
