import { SectionLabel } from "./SectionLabel";
import mosque from "@/assets/Masjid-Agung.webp";
import church from "@/assets/gerejamerah.jpg";
import temple from "@/assets/pura.jpg";
import vihara from "@/assets/vihara.jpg";
import kelenteng from "@/assets/kelenteng.png";
import { useEffect, useState } from "react";
import {
    Church,
    Landmark,
    Building2,
    HeartHandshake,
    Warehouse,
} from "lucide-react";

const houses = [
    {
        name: "Masjid",
        icon: Landmark,
        desc: "Aktif & hidup dalam kebersamaan umat",
        img: mosque,
    },
    {
        name: "Gereja",
        icon: Church,
        desc: "Komunitas aktif, saling mendukung",
        img: church,
    },
    {
        name: "Pura",
        icon: Building2,
        desc: "Pusat ibadah Hindu yang terawat",
        img: temple,
    },
    {
        name: "Vihara",
        icon: HeartHandshake,
        desc: "Harmoni umat dalam semangat toleransi",
        img: vihara,
    },
    {
        name: "Kelenteng",
        icon: Warehouse,
        desc: "Warisan budaya dan spiritual yang lestari",
        img: kelenteng,
    },
];

export function Harmony() {
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % houses.length);
        }, 1500);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <section id="harmoni" className="relative overflow-hidden py-14 my-14">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src={mosque}
                    alt=""
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-full object-cover opacity-[0.04]"
                />
            </div>

            <div className="container-page relative">
                {/* Heading */}
                <div className="mx-auto max-w-4xl text-center">
                    <SectionLabel>Bhinneka Tunggal Ika</SectionLabel>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
                        Kerukunan yang tumbuh <br />
                        <span className="font-serif italic text-gold">
                            dari hati
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-muted-foreground md:text-lg">
                        Di Kota Kediri, masjid, gereja, pura, vihara, dan
                        kelenteng hidup berdampingan sebagai bukti bahwa
                        keberagaman bukan sekadar identitas, melainkan kekuatan
                        yang menyatukan masyarakat.
                    </p>
                </div>

                {/* Content */}
                <div className="mt-10 grid gap-6 lg:grid-cols-[1.8fr_1fr]">
                    {/* Left Visual */}
                    <div className="overflow-hidden rounded-[32px] border border-border bg-card">
                        <div className="flex h-[420px] overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                            {houses.map((h, index) => (
                                <div
                                    key={h.name}
                                    onClick={() => setActive(index)}
                                    className={`group relative cursor-pointer overflow-hidden transition-all duration-700 ease-in-out ${
                                        active === index ? "flex-[6]" : "flex-1"
                                    }`}
                                >
                                    <img
                                        src={h.img}
                                        alt={h.name}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                                    <div
                                        className={`absolute bottom-5 left-5 transition-all duration-300 ${
                                            active === index
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-4"
                                        }`}
                                    >
                                        <div className="text-sm uppercase tracking-[0.22em] text-gold">
                                            {h.name}
                                        </div>

                                        <div className="mt-2 text-xl font-semibold text-white">
                                            Kota Kediri
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Stats */}
                    <div className="space-y-4">
                        {houses.map((h) => (
                            <div
                                key={h.name}
                                className="rounded-3xl border border-border bg-card px-4 py-2"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                                        <h.icon
                                            className="size-6 text-gold"
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {h.name}
                                        </h3>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {h.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
