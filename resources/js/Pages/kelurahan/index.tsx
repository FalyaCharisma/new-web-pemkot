import { HeroPage } from "@/Components/HeroPage";
import { Footer } from "@/Components/site/Footer";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Head, Link } from "@inertiajs/react";
import { Building2, Users, Globe } from "lucide-react";

interface Kecamatan {
    kd_kecamatan: string;
    nm_kecamatan: string;
}

interface Kelurahan {
    id: number;
    nm_kelurahan: string;
    jml_penduduk?: string;
    link?: string;

    kecamatan?: Kecamatan;
}

interface Props {
    kecamatanList: Kecamatan[];
    selectedKecamatan: Kecamatan;
    kelurahan: Kelurahan[];
}

export default function KelurahanPage({
    kecamatanList,
    selectedKecamatan,
    kelurahan,
}: Props) {
    return (
        <>
            <Head title="Daftar Kelurahan" />
            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />
                <main className="pt-15">
                    <HeroPage
                        title="Daftar Kelurahan"
                        breadcrumb="Daftar Kelurahan"
                        placeholder="Cari nama Kecamatan atau Kelurahan..."
                        description="Jelajahi informasi Perangkat Daerah Kota Kediri untuk mengenal struktur organisasi, tugas pokok dan fungsi, serta peran masing-masing perangkat daerah dalam penyelenggaraan pemerintahan daerah."
                    />
                    <section className="container mx-auto px-4 py-10">
                        <div className="mb-20">
                            <div className="container mx-auto -mt-8">
                                <div className="mt-10">
                                    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                                       <div className="rounded-3xl border bg-white p-4 shadow-sm">
                    <h3 className="mb-4 font-semibold">
                        Daftar Kecamatan
                    </h3>

                    <div className="space-y-2">
                        {kecamatanList.map((item) => (
                            <Link
                                key={item.kd_kecamatan}
                                href={`/kelurahan/${item.kd_kecamatan}`}
                                className={`block rounded-xl px-4 py-3 transition ${
                                    selectedKecamatan?.kd_kecamatan ===
                                    item.kd_kecamatan
                                        ? "bg-primary text-white"
                                        : "bg-slate-50 hover:bg-slate-100"
                                }`}
                            >
                                {item.nm_kecamatan}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                <div className="mb-6 rounded-3xl bg-primary p-6 text-white">
                    <h2 className="text-2xl font-bold">
                        Kecamatan {selectedKecamatan?.nm_kecamatan}
                    </h2>

                    <p className="mt-2 opacity-90">
                        Daftar kelurahan yang berada di wilayah Kecamatan{" "}
                        {selectedKecamatan?.nm_kecamatan}
                    </p>
                </div>

                <div className="grid gap-4">
                    {kelurahan.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-2xl border bg-white p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Building2
                                            size={18}
                                            className="text-primary"
                                        />

                                        <h3 className="text-lg font-semibold">
                                            {item.nm_kelurahan}
                                        </h3>
                                    </div>

                                    <p className="mt-2 text-slate-500">
                                        Kecamatan{" "}
                                        {item.kecamatan?.nm_kecamatan},
                                        Kota Kediri
                                    </p>
                                </div>

                                <div className="flex items-center gap-6">
                                    {item.jml_penduduk && (
                                        <div className="text-center">
                                            <Users
                                                size={18}
                                                className="mx-auto mb-1 text-primary"
                                            />

                                            <p className="font-bold">
                                                {item.jml_penduduk}
                                            </p>

                                            <span className="text-sm text-slate-500">
                                                Penduduk
                                            </span>
                                        </div>
                                    )}

                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white"
                                        >
                                            <Globe size={16} />
                                            Website
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {kelurahan.length === 0 && (
                    <div className="rounded-3xl border bg-white p-12 text-center">
                        <p className="text-slate-500">
                            Data kelurahan belum tersedia.
                        </p>
                    </div>
                )}
            </div>

                                        
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}
