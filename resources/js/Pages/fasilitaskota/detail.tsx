import { Head, Link } from "@inertiajs/react";

import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";

import {
    MapPin,
    Globe,
    Phone,
    ArrowLeft,
    ChevronRight,
    Home,
} from "lucide-react";

export default function Show({
    fasilitas,

    berita,

    agenda,

    lainnya,
}: any) {
    return (
        <>
            <Head title={fasilitas.nama} />

            <div className="min-h-screen bg-slate-50">
                <HeaderSolid />

                <main className="pt-16 mt-8">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Home size={14} />
                            Beranda
                            <ChevronRight size={14} />
                            Setiap Sudut Punya Cerita
                            <ChevronRight size={14} />
                            <span className="font-medium">
                                {fasilitas.nama}
                            </span>
                        </div>
                    </div>

                    <section className="container mx-auto px-4 py-8">
                        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                            <article className="rounded-3xl bg-white border p-6">
                                <div className="flex justify-between items-center">
                                    <span className="bg-amber-100 px-3 py-1 rounded-full text-xs font-semibold text-amber-700">
                                        {fasilitas.kategori?.nama_kategori}
                                    </span>

                                    <button
                                        onClick={() => window.history.back()}
                                        className="text-sm flex items-center gap-2"
                                    >
                                        <ArrowLeft size={14} />
                                        Kembali
                                    </button>
                                </div>

                                <h1 className="mt-5 text-4xl font-bold">
                                    {fasilitas.nama}
                                </h1>

                                <img
                                    src={
                                        fasilitas.foto
                                            ? `/storage/fasilitas/${fasilitas.foto}`
                                            : "https://placehold.co/800x500"
                                    }
                                    className="w-full h-[450px] mt-6 rounded-2xl object-cover"
                                />

                                {fasilitas.deskripsi ? (
                                    <div className="prose mt-8 max-w-none">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: fasilitas.deskripsi,
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="mt-8 rounded-2xl border bg-slate-50 p-6">
                                        <h3 className="mb-4 text-xl font-bold">
                                            Informasi Singkat
                                        </h3>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="flex gap-3">
                                                <MapPin
                                                    className="mt-1 text-primary"
                                                    size={20}
                                                />

                                                <div>
                                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                                        Alamat
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-700">
                                                        {fasilitas.alamat ||
                                                            "-"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <Phone
                                                    className="mt-1 text-primary"
                                                    size={20}
                                                />

                                                <div>
                                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                                        Telepon
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-700">
                                                        {fasilitas.telp || "-"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 md:col-span-2">
                                                <Globe
                                                    className="mt-1 text-primary"
                                                    size={20}
                                                />

                                                <div>
                                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                                        Website
                                                    </p>

                                                    {fasilitas.link ? (
                                                        <a
                                                            href={
                                                                fasilitas.link
                                                            }
                                                            target="_blank"
                                                            className="mt-1 inline-block text-sm text-primary hover:underline"
                                                        >
                                                            {fasilitas.link}
                                                        </a>
                                                    ) : (
                                                        <p className="mt-1 text-sm text-slate-700">
                                                            Belum tersedia
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </article>

                            <aside className="space-y-6">
                                <div className="rounded-3xl border bg-white p-5">
                                    <h3 className="font-bold">
                                        Sudut Lain yang Punya Cerita
                                    </h3>

                                    <div className="mt-5 space-y-4">
                                        {lainnya.map((item: any) => (
                                            <Link
                                                key={item.id}
                                                href={route(
                                                    "fasilitas-kota.show",
                                                    item.slug,
                                                )}
                                                className="group flex gap-3"
                                            >
                                                <img
                                                    src={
                                                        item.images
                                                            ? item.images.startsWith(
                                                                  "http",
                                                              )
                                                                ? item.images
                                                                : `/storage/fasilitas/${item.images}`
                                                            : "/placeholder.jpg"
                                                    }
                                                    className="h-20 w-24 rounded-xl object-cover"
                                                />

                                                <div className="flex-1">
                                                    <p className="text-xs text-primary">
                                                        {
                                                            item.kategori
                                                                ?.nama_kategori
                                                        }
                                                    </p>

                                                    <h4 className="mt-1 line-clamp-2 font-semibold text-sm group-hover:text-primary">
                                                        {item.nama}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl border p-5">
                                    <h3 className="font-bold">
                                        Agenda Terkait
                                    </h3>

                                    <div className="mt-4 space-y-4">
                                        {agenda.map((item: any) => (
                                            <div key={item.id}>
                                                <p className="text-xs text-slate-400">
                                                    {item.tanggal}
                                                </p>

                                                <h4 className="font-semibold">
                                                    {item.judul}
                                                </h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        </div>

                        <section className="mt-14">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-3xl font-bold">
                                    Cerita dari Sekitar Tempat Ini
                                </h2>

                                {/* <Link
            href={route("berita")}
            className="text-primary font-medium"
        >
            Lihat Semua
        </Link> */}
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {berita.map((item: any) => (
                                    <Link
                                        key={item.id}
                                        href={route("berita.show", item.slug)}
                                        className="group overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <img
                                            src={
                                                item.images
                                                    ? item.images.startsWith(
                                                          "http",
                                                      )
                                                        ? item.images
                                                        : `/storage/berita/${item.images}`
                                                    : "/placeholder.jpg"
                                            }
                                            className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <div className="p-5">
                                            <p className="text-xs text-slate-500">
                                                {item.created_at_formatted}
                                            </p>

                                            <h3 className="mt-2 line-clamp-2 font-semibold group-hover:text-primary">
                                                {item.judul}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
