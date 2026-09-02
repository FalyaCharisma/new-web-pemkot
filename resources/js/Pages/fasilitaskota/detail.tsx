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
    Clock
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
                   <div className="container-page py-4">
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

                    <section className="container-page py-8">
                        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                            <article className="rounded-3xl border bg-white p-5 shadow-sm md:p-6">
    {/* HEADER */}
    <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            {fasilitas.kategori?.nama_kategori ?? "Fasilitas"}
        </span>

        <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-primary hover:text-primary"
        >
            <ArrowLeft size={15} />
            Kembali
        </button>
    </div>

    {/* TITLE */}
    <h1 className="mt-5 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
        {fasilitas.nama}
    </h1>

    {/* FOTO UTAMA */}
    <div className="mt-6 flex justify-center">
        <div className="aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-slate-100">
            <img
                src={selectedPhoto}
                alt={fasilitas.nama}
                className="h-full w-full object-cover"
            />
        </div>
    </div>

    {/* THUMBNAILS */}
    {allPhotos.length > 1 && (
        <div className="mt-4 flex justify-center gap-3 overflow-x-auto pb-2">
            {allPhotos.map((foto: any) => (
                <button
                    key={foto.id}
                    onClick={() => setSelectedPhoto(foto.url)}
                    className={`flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${
                        selectedPhoto === foto.url
                            ? "border-primary"
                            : "border-transparent"
                    }`}
                >
                    <img
                        src={foto.url}
                        alt=""
                        className="h-16 w-16 object-cover"
                    />
                </button>
            ))}
        </div>
    )}

    {/* DESKRIPSI */}
    {fasilitas.deskripsi && (
        <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900">
                Tentang {fasilitas.nama}
            </h2>

            <div
                className="prose prose-slate mt-4 max-w-none leading-7 text-slate-600"
                dangerouslySetInnerHTML={{
                    __html: fasilitas.deskripsi,
                }}
            />
        </div>
    )}

    {/* INFORMASI */}
    <div className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">
            Informasi Fasilitas
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {/* ALAMAT */}
            <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex gap-3">
                    <MapPin
                        size={20}
                        className="mt-1 flex-shrink-0 text-primary"
                    />

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Alamat
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-700">
                            {fasilitas.alamat || "Belum tersedia"}
                        </p>
                    </div>
                </div>
            </div>

            {/* TELEPON */}
            <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex gap-3">
                    <Phone
                        size={20}
                        className="mt-1 flex-shrink-0 text-primary"
                    />

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Telepon
                        </p>

                        <p className="mt-1 text-sm text-slate-700">
                            {fasilitas.telp || "Belum tersedia"}
                        </p>
                    </div>
                </div>
            </div>

            {/* JAM OPERASIONAL */}
            <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex gap-3">
                    <Clock
                        size={20}
                        className="mt-1 flex-shrink-0 text-primary"
                    />

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Jam Operasional
                        </p>

                        <p className="mt-1 text-sm text-slate-700">
                            {fasilitas.jam_buka && fasilitas.jam_tutup
                                ? `${fasilitas.jam_buka} - ${fasilitas.jam_tutup}`
                                : "Belum tersedia"}
                        </p>
                    </div>
                </div>
            </div>

            {/* TAUTAN */}
            <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex gap-3">
                    <Globe
                        size={20}
                        className="mt-1 flex-shrink-0 text-primary"
                    />

                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Tautan
                        </p>

                        {fasilitas.link ? (
                            <a
                                href={fasilitas.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 inline-flex text-sm font-medium text-primary hover:underline"
                            >
                                {fasilitas.link}
                            </a>
                        ) : (
                            <p className="mt-1 text-sm text-slate-500">
                                Belum tersedia
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* LOKASI */}
    {(fasilitas.lat && fasilitas.lng) || fasilitas.map ? (
        <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-slate-900">
                    Lokasi
                </h2>

                {fasilitas.map && (
                    <a
                        href={fasilitas.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-primary hover:underline"
                    >
                        Buka Peta →
                    </a>
                )}
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border bg-slate-100">
                {fasilitas.lat && fasilitas.lng ? (
                    <iframe
                        src={`https://www.google.com/maps?q=${fasilitas.lat},${fasilitas.lng}&output=embed`}
                        className="h-[180px] w-full border-0"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-[160px] flex-col items-center justify-center gap-2">
                        <MapPin
                            size={28}
                            className="text-primary"
                        />

                        <p className="text-sm text-slate-500">
                            Lokasi tersedia di Google Maps
                        </p>

                        {fasilitas.map && (
                            <a
                                href={fasilitas.map}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-primary hover:underline"
                            >
                                Lihat Lokasi →
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    ) : null}
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
