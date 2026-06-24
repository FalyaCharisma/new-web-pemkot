import { ShieldAlert, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

interface Service {
    id: number;
    title: string;
    desc: string;
    icon: string | null;
    url: string | null;
}

interface Props {
    layanan: Service[];
}

export function Services({ layanan }: Props) {
    return (
        <section id="layanan" className="relative py-28">
            <div className="container-page">
                <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
                    {/* Sidebar */}
                    <div>
                        <SectionLabel>Layanan Publik</SectionLabel>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight">
                            Layanan publik
                            <br />
                            dalam{" "}
                            <span className="font-serif italic text-gold">
                                satu genggaman
                            </span>
                        </h2>

                        <p className="mt-5 text-muted-foreground">
                            Berbagai layanan resmi Pemerintah Kota Kediri kini
                            lebih mudah, cepat, dan terintegrasi dalam satu
                            portal.
                        </p>

                        <div className="mt-8 rounded-3xl border border-border bg-card p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-gold/10">
                                    <ShieldAlert className="size-6 text-gold" />
                                </div>

                                <div>
                                    <div className="text-3xl font-bold">
                                        {layanan.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Layanan Digital Terintegrasi
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a
                            href="#"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
                        >
                            Lihat semua layanan
                            <ArrowUpRight className="size-4" />
                        </a>
                    </div>

                    {/* Grid layanan */}
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {layanan.map((s) => (
                            <a
                                key={s.id}
                                href={s.url ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-gold/10">
                                    {s.icon ? (
                                        <img
                                            src={s.icon}
                                            alt={s.title}
                                            className="h-8 w-8 object-contain"
                                        />
                                    ) : (
                                        <ShieldAlert className="size-6 text-gold" />
                                    )}
                                </div>

                                <h3 className="mt-5 text-base font-semibold">
                                    {s.title}
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                    {s.desc}
                                </p>

                                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                                    Buka layanan
                                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
