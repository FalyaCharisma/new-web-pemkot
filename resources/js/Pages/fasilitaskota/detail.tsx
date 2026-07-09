import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

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
    console.log(fasilitas);
    const allPhotos = [
        {
            id: 0,
            url: fasilitas.foto
                ? `/storage/fasilitas/${fasilitas.foto}`
                : "/placeholder.jpg",
        },
        ...(fasilitas.galeri_foto ?? []),
    ];

    const [selectedPhoto, setSelectedPhoto] = useState(allPhotos[0].url);
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
                                    src={selectedPhoto}
                                    className="mt-6 h-[420px] w-full rounded-2xl object-cover"
                                />

                                {allPhotos.length > 1 && (
                                    <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                                        {allPhotos.map((foto: any) => (
                                            <button
                                                key={foto.id}
                                                onClick={() =>
                                                    setSelectedPhoto(foto.url)
                                                }
                                                className={`overflow-hidden rounded-xl border-2 transition
                    ${
                        selectedPhoto === foto.url
                            ? "border-primary"
                            : "border-transparent"
                    }`}
                                            >
                                                <img
                                                    src={foto.url}
                                                    className="h-20 w-28 object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}

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
                                    <h3 className="font-bold">Video Profil</h3>
                                    <div className="mt-5">
                                        {fasilitas.galeri_video?.length > 0 ? (
                                            fasilitas.galeri_video.map(
                                                (video: any) => {
                                                    const platform =
                                                        video.url.includes(
                                                            "youtu",
                                                        )
                                                            ? "YouTube"
                                                            : video.url.includes(
                                                                    "instagram",
                                                                )
                                                              ? "Instagram Reels"
                                                              : video.url.includes(
                                                                      "tiktok",
                                                                  )
                                                                ? "TikTok"
                                                                : "Video";

                                                    return (
                                                        <a
                                                            key={video.id}
                                                            href={video.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group block rounded-2xl border p-4 transition hover:border-primary hover:shadow-md"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">
                                                                    ▶
                                                                </div>

                                                                <div>
                                                                    <p className="text-xs text-primary">
                                                                        {
                                                                            platform
                                                                        }
                                                                    </p>

                                                                    <p className="mt-1 text-sm font-semibold group-hover:text-primary">
                                                                        Tonton
                                                                        Video
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    );
                                                },
                                            )
                                        ) : (
                                            <div className="rounded-xl bg-slate-50 p-4 text-center text-sm text-slate-500">
                                                Belum ada video.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl border p-5">
                                    <h3 className="font-bold">
                                        Cerita dari Sekitar Tempat Ini
                                    </h3>

                                    <div className="mt-4 space-y-3">
                                        {berita.map((item: any) => (
                                            <Link
                                                key={item.id}
                                                href={route(
                                                    "berita.show",
                                                    item.slug,
                                                )}
                                                className="group flex items-start gap-3 rounded-xl border bg-white p-3 transition hover:border-primary hover:shadow-md"
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
                                                    className="h-20 w-28 flex-shrink-0 rounded-lg object-cover"
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[11px] font-medium text-primary">
                                                        {
                                                            item.kategori
                                                                ?.nm_kategori
                                                        }
                                                    </p>

                                                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-slate-800 group-hover:text-primary">
                                                        {item.judul}
                                                    </h3>

                                                    <p className="mt-2 text-[11px] text-slate-400">
                                                        {
                                                            item.created_at_formatted
                                                        }
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
