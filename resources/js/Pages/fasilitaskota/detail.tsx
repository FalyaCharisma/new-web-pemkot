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

                <main className="pt-16">
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
                                    src={fasilitas.foto}
                                    className="w-full h-[450px] mt-6 rounded-2xl object-cover"
                                />

                                <div className="prose max-w-none mt-8">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: fasilitas.deskripsi,
                                        }}
                                    />
                                </div>
                            </article>

                            <aside className="space-y-6">
                                <div className="bg-white rounded-3xl border p-5">
                                    <h3 className="font-bold">
                                        Informasi Tempat
                                    </h3>

                                    <div className="mt-5 space-y-4 text-sm">
                                        <div className="flex gap-3">
                                            <MapPin size={16} />

                                            <span>{fasilitas.alamat}</span>
                                        </div>

                                        <div className="flex gap-3">
                                            <Phone size={16} />

                                            <span>{fasilitas.telp}</span>
                                        </div>

                                        <div className="flex gap-3">
                                            <Globe size={16} />

                                            <a
                                                href={fasilitas.link}
                                                target="_blank"
                                                className="text-primary"
                                            >
                                                Website Resmi
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl border p-5">
                                    <h3 className="font-bold">
                                        Cerita dari Sekitar Tempat Ini
                                    </h3>

                                    <div className="mt-5 space-y-4">
                                        {berita.map((item: any) => (
                                            <Link
                                                key={item.id}
                                                href={route(
                                                    "berita.show",

                                                    item.slug,
                                                )}
                                                className="flex gap-3"
                                            >
                                                <img
                                                    src={
                                                        item.images
                                                            ? `/storage/berita/${item.images}`
                                                            : "/placeholder.jpg"
                                                    }
                                                    className="w-24 h-20 rounded-lg object-cover"
                                                />

                                                <div>
                                                    <p className="text-xs text-slate-400">
                                                        {
                                                            item.created_at_formatted
                                                        }
                                                    </p>

                                                    <h4 className="font-semibold text-sm line-clamp-2">
                                                        {item.judul}
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

                        <section className="mt-16">
                            <h2 className="text-3xl font-bold">
                                Sudut Lain yang Punya Cerita
                            </h2>

                            <div className="grid md:grid-cols-3 gap-5 mt-8">
                                {lainnya.map((item: any) => (
                                    <Link
                                        key={item.id}
                                        href={route(
                                            "fasilitas-kota.show",

                                            item.slug,
                                        )}
                                        className="group"
                                    >
                                        <img
                                            src={item.foto}
                                            className="rounded-2xl h-60 w-full object-cover"
                                        />

                                        <h3 className="mt-4 font-bold">
                                            {item.nama}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {item.kategori?.nama_kategori}
                                        </p>
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
