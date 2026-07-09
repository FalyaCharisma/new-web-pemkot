import { X, ShieldAlert, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { useState } from "react";

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
    const [selected, setSelected] = useState<Service | null>(null);
    return (
        <>
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
                                Berbagai layanan resmi Pemerintah Kota Kediri
                                kini lebih mudah, cepat, dan terintegrasi dalam
                                satu portal.
                            </p>

                            <a
                                href="https://pecut.kedirikota.go.id"
                                target="_blank"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
                            >
                                Lihat semua layanan
                                <ArrowUpRight className="size-4" />
                            </a>
                        </div>

                        {/* Grid layanan */}
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-3">
                            {layanan.map((s) => (
                                <a
                                    key={s.id}
                                    href={s.url ?? "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex size-10 sm:size-12 items-center justify-center rounded-xl bg-gold/10">
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

                                    <h3 className="mt-3 text-sm sm:text-base font-semibold leading-snug">
                                        {s.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                        {s.desc}
                                    </p>

                                    <div className="mt-auto pt-3 flex items-center justify-between">
                                        <span className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                                            Buka layanan
                                            <ArrowUpRight className="size-4" />
                                        </span>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelected(s);
                                            }}
                                            className="text-sm font-medium text-gold hover:underline"
                                        >
                                            Selengkapnya
                                        </button>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-6 flex items-start justify-between">
                            <h3 className="text-2xl font-bold">
                                {selected.title}
                            </h3>

                            <button onClick={() => setSelected(null)}>
                                <X className="size-5" />
                            </button>
                        </div>

                        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gold/10">
                            {selected.icon ? (
                                <img
                                    src={selected.icon}
                                    alt={selected.title}
                                    className="h-10 w-10 object-contain"
                                />
                            ) : (
                                <ShieldAlert className="size-8 text-gold" />
                            )}
                        </div>

                        <p className="whitespace-pre-line text-muted-foreground">
                            {selected.desc}
                        </p>

                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                onClick={() => setSelected(null)}
                                className="rounded-full border px-5 py-2"
                            >
                                Tutup
                            </button>

                            <a
                                href={selected.url ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-primary px-5 py-2 text-primary-foreground"
                            >
                                Kunjungi Layanan
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
