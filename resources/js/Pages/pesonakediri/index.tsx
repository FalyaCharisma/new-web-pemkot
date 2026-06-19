import { Head, Link  } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { useState } from "react";
import { ContentCTA } from "@/Components/ContentCTA";
import type { PesonaUnggulan } from "@/types/unggulan";

import {
  Sparkles,
  UtensilsCrossed,
  Barrel,
  MapPinned,
  Landmark,
  Palette,
  ShoppingBag,
  CalendarDays,
  Gem
} from "lucide-react";

import jaranan from "@/assets/jaranan.jpg";
import pecel from "@/assets/pecel.jpeg";
import tenun from "@/assets/tenun.jpg";
import carnival from "@/assets/carnival.jpeg";
import pecel2 from "@/assets/pecel2.webp";
import pecel3 from "@/assets/pecel3.jpg";
import pecel4 from "@/assets/pecel4.jpg";
import pecel5 from "@/assets/pecel5.jpg";
import tahu from "@/assets/tahu.webp";
import skena from "@/assets/skena.jpg";
import batik from "@/assets/batik.jpg";
import klotok from "@/assets/klotok.jpg";

const images = [
    pecel2,
    pecel3,
    pecel4,
    pecel5,
    pecel
];

const categories = [
    {
        title: "Budaya",
        description: "Kesenian tradisional, sanggar, dan warisan budaya.",
        image: jaranan,
        icon: Landmark,
        count: "18 Tempat",
        filter: "budaya",
    },
    {
        title: "Kuliner Khas",
        description: "Kuliner legendaris dan cita rasa khas Kediri.",
        image: pecel,
        icon: UtensilsCrossed,
        count: "32 Tempat",
        filter: "kuliner",
    },
    {
        title: "Ekonomi Kreatif",
        description: "UMKM dan industri kreatif unggulan.",
        image: skena,
        icon: Palette,
        count: "20 Tempat",
        filter: "ekonomi-kreatif",
    },
    {
        title: "Produk Khas",
        description: "Batik, tenun, tahu kuning, dan oleh-oleh.",
        image: batik,
        icon: ShoppingBag,
        count: "25 Tempat",
        filter: "produk-khas",
    },
    {
        title: "Festival Daerah",
        description: "Festival budaya dan event tahunan Kota Kediri.",
        image: carnival,
        icon: CalendarDays,
        count: "12 Event",
        filter: "festival",
    },
    {
        title: "Sejarah & Warisan",
        description: "Bangunan bersejarah dan cagar budaya.",
        image: klotok,
        icon: Gem,
        count: "10 Lokasi",
        filter: "sejarah",
    },
];

interface Props {
    pesona: PesonaUnggulan[];
}


export default function PesonaKediriIndex({ pesona }: Props) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <>
            <Head title="Pesona Kediri Raya" />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />

                <main className="pt-15">
                    <HeroPage
                        title="Pesona Kediri Raya"
                        breadcrumb="Pesona Kediri Raya"
                        placeholder="Cari budaya, kuliner, festival, produk khas, dan lainnya..."
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
                                Kenali lebih dekat berbagai budaya, kuliner, dan karya yang menjadi
                                identitas Kediri Raya.
                            </p>
                        </div>
                    </div>

                    {/* Top Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                        {pesona.map((item) => (
                            <div
                                key={item.id}
                                className="overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
                            >
                                <img
                                    src={`/storage/pesona/${item.cover}`}
                                    alt={item.judul}
                                    className="h-40 w-full object-cover"
                                />
                                <div className="p-4">
                                    <span className="inline-block rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
                                        {item.kategori}
                                    </span>

                                    <h3 className="mt-3 font-bold">
                                        {item.judul}
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500 line-clamp-3">
                                        {item.deskripsi}
                                    </p>

                                    <Link
                                        href={route("pesona-unggulan.show", item.slug)}
                                        className="mt-3 inline-flex text-sm font-semibold text-primary"
                                    >
                                        Baca Selengkapnya →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Featured Detail */}
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
                                    onClick={() => setSelectedImage(image)}
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
                            Nasi Pecel Tumpang adalah kuliner khas Kediri yang terdiri dari nasi
                            putih, sayuran rebus, dan sambal tumpang berbahan tempe semangit yang
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
                                        Berasal dari tradisi masyarakat Kediri sejak zaman dahulu.
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
                                    <h4 className="font-semibold">Keunikan</h4>
                                    <p className="mt-1 text-sm text-slate-500">
                                    Sambal tumpang dengan cita rasa yang berbeda.
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
                                    <h4 className="font-semibold">Cocok Untuk</h4>
                                    <p className="mt-1 text-sm text-slate-500">
                                    Sarapan, makan siang, hingga oleh-oleh.
                                    </p>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="mt-8 rounded-2xl bg-primary p-6 text-white">
                            <h4 className="text-xl font-bold">
                                Ingin mencicipi Nasi Pecel Tumpang?
                            </h4>

                            <p className="mt-2 text-sm text-white/80">
                                Temukan rumah makan dan warung terbaik yang menyajikan Nasi Pecel
                                Tumpang di Kota Kediri.
                            </p>

                            <button className="mt-4 rounded-xl bg-white px-5 py-3 font-medium text-primary">
                                Cari Kuliner Terkait →
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* JELAJAH BERDASARKAN KATEGORI */}
                    <div className="mt-14">

                        <h2 className="text-3xl font-bold">
                            Jelajahi Berdasarkan Kategori
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Temukan berbagai fasilitas dan destinasi unggulan Kota Kediri sesuai kategori yang Anda minati.
                        </p>

                        {/* CARD */}
                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {categories.map((item, index) => {

                                const Icon = item.icon;

                                return (

                                    <Link
                                        key={index}
                                        href={route("fasilitas-kota.index", {
                                            category: item.filter,
                                        })}
                                        className="group overflow-hidden rounded-3xl border bg-white transition hover:-translate-y-1 hover:shadow-lg"
                                    >

                                        {/* IMAGE */}
                                        <div className="relative h-52 overflow-hidden">

                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                            <div className="absolute bottom-5 left-5">

                                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90">

                                                    <Icon
                                                        size={24}
                                                        className="text-primary"
                                                    />

                                                </div>

                                                <h3 className="text-2xl font-bold text-white">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-1 text-sm text-white/80">
                                                    {item.count}
                                                </p>

                                            </div>

                                        </div>

                                        {/* CONTENT */}
                                        <div className="p-5">

                                            <p className="text-sm leading-relaxed text-slate-500">
                                                {item.description}
                                            </p>

                                            <div className="mt-5 flex items-center font-semibold text-primary">
                                                Jelajahi Kategori →
                                            </div>

                                        </div>

                                    </Link>

                                );

                            })}

                        </div>

                    </div>

                    {/* CTA Bottom */}
                    <ContentCTA
                        icon={<MapPinned size={24} />}
                        title="Temukan lebih banyak pengalaman di Kota Kediri!"
                        description="Jelajahi destinasi, kuliner, budaya, dan berbagai fasilitas terbaik di Kediri Raya."
                        buttonText="Jelajahi Fasilitas Kota"
                        href={route('fasilitas-kota.index')}
                    />
                    </section>
                </main>
                <Footer />
            </div>
        </>
    )
}