import { Head, Link, router } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { useState, useRef } from "react";
import { ContentCTA } from "@/Components/ContentCTA";
import type { PesonaUnggulan } from "@/types/unggulan";

import {
    Sparkles,
    UtensilsCrossed,
    Barrel,
    MapPinned,
    Landmark,
    ShoppingBag,
    ChevronLeft,
    ChevronRight,
    Coffee,
    Theater,
    Moon,
    Clock3,
    Building2,
    Bus,
    HeartPulse,
    Trees,
    GraduationCap,
} from "lucide-react";

import pecel from "@/assets/pecel.jpeg";
import pecel2 from "@/assets/pecel2.webp";
import pecel3 from "@/assets/pecel3.jpg";
import pecel4 from "@/assets/pecel4.jpg";
import pecel5 from "@/assets/pecel5.jpg";
import { Peta } from "@/types/peta";

const images = [pecel2, pecel3, pecel4, pecel5, pecel];
const icons = {
    Building2,

    Bus,

    HeartPulse,

    UtensilsCrossed,

    ShoppingBag,

    Trees,

    GraduationCap,

    Landmark,
};

interface Props {
    pesona: PesonaUnggulan[];
    kategori?: number;
    peta: Peta[];
}

export default function PesonaKediriIndex({ pesona, kategori, peta }: Props) {
    const [activeItinerary, setActiveItinerary] = useState(0);

    const active = peta[activeItinerary];
    const mapUrl = active
        ? `https://maps.google.com/maps?q=${active.lat},${active.lng}&z=15&output=embed`
        : "";

    const [selectedImage, setSelectedImage] = useState(images[0]);

    const [search, setSearch] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);

    const scrollNext = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: 300,
                behavior: "smooth",
            });
        }
    };

    const scrollPrev = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -300,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <Head title="Pesona Kediri Raya" />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />

                <main className="pt-15">
                    <HeroPage
                        title="Pesona Kediri Raya"
                        breadcrumb="Pesona Kediri Raya"
                        enableSearch={false}
                        description="Jelajahi kekayaan budaya, kuliner khas, ekonomi kreatif, dan berbagai warisan yang menjadi kebanggaan Kediri Raya."
                    />

                    {/* CONTENT */}
                    <section className="container mx-auto px-4 py-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">
                                    Unggulan Pesona Kediri Raya
                                </h2>
                                <p className="mt-2 text-slate-500">
                                    Kenali lebih dekat berbagai budaya, kuliner,
                                    dan karya yang menjadi identitas Kediri
                                    Raya.
                                </p>
                            </div>
                        </div>

                        {/* Top Cards */}
                        <div className="relative">
                            {/* tombol kiri */}
                            <button
                                onClick={scrollPrev}
                                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary text-white p-3 shadow-lg hover:scale-105 transition"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {/* container scroll */}
                            <div
                                ref={containerRef}
                                className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-10"
                            >
                                {pesona.map((item) => (
                                    <div
                                        key={item.id}
                                        className="min-w-[250px] max-w-[250px] overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
                                    >
                                        <img
                                            src={`/storage/pesona/${item.cover}`}
                                            alt={item.judul}
                                            className="h-40 w-full object-cover"
                                        />

                                        <div className="p-4">
                                            <span className="inline-block rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
                                                {item.kategori?.nama_kategori}
                                            </span>

                                            <h3 className="mt-3 font-bold">
                                                {item.judul}
                                            </h3>

                                            <p className="mt-2 text-sm text-slate-500 line-clamp-3">
                                                {item.deskripsi}
                                            </p>

                                            <Link
                                                href={route(
                                                    "pesona-unggulan.show",
                                                    item.slug,
                                                )}
                                                className="mt-3 inline-flex text-sm font-semibold text-primary"
                                            >
                                                Baca Selengkapnya →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* tombol kanan */}
                            <button
                                onClick={scrollNext}
                                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary text-white p-3 shadow-lg hover:scale-105 transition"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Featured Detail */}
                        {!kategori && (
                            <div className="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm">
                                <div className="grid lg:grid-cols-2">
                                    {/* Left */}
                                    <div className="p-6">
                                        {/* Main Image */}
                                        <img
                                            src={selectedImage}
                                            className="h-[350px] w-full rounded-2xl object-cover"
                                            alt=""
                                        />

                                        {/* Thumbnail */}
                                        <div className="mt-4 flex gap-2">
                                            {images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        setSelectedImage(image)
                                                    }
                                                    className={`
                                    overflow-hidden rounded-lg border-2 transition-all duration-300
                                    ${
                                        selectedImage === image
                                            ? "border-primary scale-105"
                                            : "border-transparent opacity-70 hover:opacity-100"
                                    }
                                    `}
                                                >
                                                    <img
                                                        src={image}
                                                        alt=""
                                                        className="h-16 w-20 object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right */}
                                    <div className="p-8">
                                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                            KULINER KHAS
                                        </span>

                                        <h3 className="mt-4 text-4xl font-bold">
                                            Nasi Pecel Tumpang
                                        </h3>

                                        <p className="mt-4 leading-relaxed text-slate-600">
                                            Nasi Pecel Tumpang adalah kuliner
                                            khas Kediri yang terdiri dari nasi
                                            putih, sayuran rebus, dan sambal
                                            tumpang berbahan tempe semangit yang
                                            dimasak dengan bumbu khas.
                                        </p>

                                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                                            <div className="rounded-xl bg-slate-50 p-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                                        <Barrel className="h-5 w-5 text-primary" />
                                                    </div>

                                                    <div>
                                                        <h4 className="font-semibold text-slate-900">
                                                            Asal Usul
                                                        </h4>

                                                        <p className="mt-1 text-sm text-slate-500">
                                                            Berasal dari tradisi
                                                            masyarakat Kediri
                                                            sejak zaman dahulu.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-xl bg-slate-50 p-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                                        <Sparkles className="h-5 w-5 text-primary" />
                                                    </div>

                                                    <div>
                                                        <h4 className="font-semibold">
                                                            Keunikan
                                                        </h4>
                                                        <p className="mt-1 text-sm text-slate-500">
                                                            Sambal tumpang
                                                            dengan cita rasa
                                                            yang berbeda.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-xl bg-slate-50 p-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                                        <UtensilsCrossed className="h-5 w-5 text-primary" />
                                                    </div>

                                                    <div>
                                                        <h4 className="font-semibold">
                                                            Cocok Untuk
                                                        </h4>
                                                        <p className="mt-1 text-sm text-slate-500">
                                                            Sarapan, makan
                                                            siang, hingga
                                                            oleh-oleh.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 rounded-2xl bg-primary p-6 text-white">
                                            <h4 className="text-xl font-bold">
                                                Ingin mencicipi Nasi Pecel
                                                Tumpang?
                                            </h4>

                                            <p className="mt-2 text-sm text-white/80">
                                                Temukan rumah makan dan warung
                                                terbaik yang menyajikan Nasi
                                                Pecel Tumpang di Kota Kediri.
                                            </p>

                                            <Link
                                                href={route(
                                                    "fasilitas-kota.index",
                                                    {
                                                        kategori: 4,
                                                        search: "Nasi Pecel",
                                                    },
                                                )}
                                                className="mt-4 inline-flex rounded-xl bg-white px-5 py-3 font-medium text-primary transition hover:bg-slate-100"
                                            >
                                                Cari Kuliner Terkait →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* ITINERARY + MAP */}
                        {!kategori && (
                            <div className="mt-10 overflow-hidden rounded-3xl border bg-white shadow-sm">
                                <div className="grid lg:grid-cols-2">
                                    {/* LEFT */}
                                    <div className="p-7 bg-gradient-to-b from-white to-slate-50">
                                        <h3 className="text-2xl font-bold">
                                            Rekomendasi Sehari di Kediri
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Klik aktivitas untuk melihat lokasi
                                            di peta interaktif.
                                        </p>

                                        <div className="mt-6 space-y-3">
                                            {peta.map((item, index) => {
                                                const isActive =
                                                    index === activeItinerary;
                                                const Icon =
                                                    icons[
                                                        item.icon as keyof typeof icons
                                                    ] ?? MapPinned;

                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            setActiveItinerary(
                                                                index,
                                                            )
                                                        }
                                                        className={`
                                                    group w-full text-left rounded-2xl border p-4 transition-all
                                                    hover:shadow-md hover:-translate-y-0.5
                                                    ${
                                                        isActive
                                                            ? "border-primary bg-primary/5 shadow-md"
                                                            : "bg-white"
                                                    }
                                                `}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                {/* ICON BOX */}
                                                                <div
                                                                    className={`
                                                            flex h-10 w-10 items-center justify-center rounded-xl transition
                                                            ${
                                                                isActive
                                                                    ? "bg-primary text-white"
                                                                    : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                                                            }
                                                        `}
                                                                >
                                                                    <Icon className="h-5 w-5" />
                                                                </div>

                                                                {/* TEXT */}
                                                                <div>
                                                                    <div className="font-semibold">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </div>
                                                                    <div className="text-xs text-slate-500">
                                                                        {
                                                                            item.desc
                                                                        }
                                                                    </div>

                                                                    {item.jam_buka &&
                                                                        item.jam_tutup && (
                                                                            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                                                                <Clock3 className="h-4 w-4 text-primary" />

                                                                                <span className="font-medium">
                                                                                    Buka
                                                                                </span>

                                                                                <span>
                                                                                    {item.jam_buka.slice(
                                                                                        0,
                                                                                        5,
                                                                                    )}
                                                                                </span>

                                                                                <span className="text-slate-300">
                                                                                    •
                                                                                </span>

                                                                                <span className="font-medium">
                                                                                    Tutup
                                                                                </span>

                                                                                <span>
                                                                                    {item.jam_tutup.slice(
                                                                                        0,
                                                                                        5,
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                </div>
                                                            </div>

                                                            {/* TIME BADGE */}
                                                            <span
                                                                className={`
                                                        text-sm font-semibold
                                                        ${isActive ? "text-primary" : "text-slate-400"}
                                                    `}
                                                            >
                                                                {item.category}
                                                            </span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* RIGHT MAP */}
                                    <div className="relative h-[520px]">
                                        {/* MAP */}
                                        <iframe
                                            key={activeItinerary}
                                            src={mapUrl}
                                            className="h-full w-full"
                                            loading="lazy"
                                        />

                                        {/* overlay gradient biar lebih aesthetic */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CTA Bottom */}
                        <ContentCTA
                            icon={<MapPinned size={24} />}
                            title="Temukan lebih banyak pengalaman di Kota Kediri!"
                            description="Jelajahi destinasi, kuliner, budaya, dan berbagai fasilitas terbaik di Kediri Raya."
                            buttonText="Jelajahi Fasilitas Kota"
                            href={route("fasilitas-kota.index")}
                        />
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}
