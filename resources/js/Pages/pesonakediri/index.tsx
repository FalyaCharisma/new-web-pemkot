import { Head, Link  } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { useState } from "react";

import {
  Sparkles,
  UtensilsCrossed,
  Barrel,
  MapPinned, 
  ArrowRight
} from "lucide-react";

import jaranan from "@/assets/jaranan.jpg";
import pecel from "@/assets/pecel.jpeg";
import batik from "@/assets/batik.jpg";
import tenun from "@/assets/tenun.jpg";
import carnival from "@/assets/carnival.jpeg";
import pecel2 from "@/assets/pecel2.webp";
import pecel3 from "@/assets/pecel3.jpg";
import pecel4 from "@/assets/pecel4.jpg";
import pecel5 from "@/assets/pecel5.jpg";
import tahu from "@/assets/tahu.webp";
import soto from "@/assets/soto.webp";
import klotok from "@/assets/klotok.jpg";
import skena from "@/assets/skena.jpg";

const images = [
    pecel2,
    pecel3,
    pecel4,
    pecel5,
    pecel
];

const unggulan = [
    {
        title: "Jaranan Kediri",
        image: jaranan,
        category: "KESENIAN",
    },
    {
        title: "Nasi Pecel Tumpang",
        image: pecel,
        category: "KULINER KHAS",
    },
    {
        title: "Tenun Bandar Kidul",
        image: tenun,
        category: "PRODUK LOKAL",
    },
    {
        title: "Tahu Kuning",
        image: tahu,
        category: "PRODUK LOKAL",
    },
    {
        title: "Kediri Nite Carnival",
        image: carnival,
        category: "FESTIVAL",
    },
];

const pesonaItems = [
  {
    title: "Soto Kediri",
    image: soto,
  },
  {
    title: "Tahu Kuning",
    image: tahu,
  },
  {
    title: "Gang Skena",
    image: skena,
  },
  {
    title: "Batik Kediri",
    image: batik,
  },
  {
    title: "Tenun Bandar Kidul",
    image: tenun,
  },
  {
    title: "Gunung Klotok",
    image: klotok,
  },
];

export default function PesonaKediriIndex() {
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

                        <button className="border rounded-xl px-5 py-3 text-sm font-medium hover:bg-slate-50">
                        Lihat Semua →
                        </button>
                    </div>

                    {/* Top Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                        {unggulan.map((item, i) => (
                            <div
                            key={i}
                            className="overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
                            >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-40 w-full object-cover"
                            />

                            <div className="p-4">
                                <span className="inline-block rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
                                {item.category}
                                </span>

                                <h3 className="mt-3 font-bold">{item.title}</h3>

                                <p className="mt-2 text-sm text-slate-500 line-clamp-3">
                                Deskripsi singkat mengenai pesona khas Kediri.
                                </p>

                                <button className="mt-4 text-primary font-medium text-sm">
                                Baca Selengkapnya →
                                </button>
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

                    {/* Tema */}
                    <div className="mt-14">
                        <h2 className="text-3xl font-bold">
                        Jelajah Berdasarkan Tema
                        </h2>

                        <p className="mt-2 text-slate-500">
                        Temukan berbagai pesona Kediri Raya dan jelajahi lebih dalam.
                        </p>

                        <div className="mt-8 flex gap-8 border-b overflow-x-auto">
                        {[
                            "Semua",
                            "Budaya",
                            "Kuliner",
                            "Ekonomi Kreatif",
                            "Produk Khas",
                            "Festival Daerah",
                            "Sejarah & Warisan",
                        ].map((tab, i) => (
                            <button
                            key={tab}
                            className={`pb-3 whitespace-nowrap ${
                                i === 0
                                ? "border-b-2 border-primary text-primary font-semibold"
                                : "text-slate-500"
                            }`}
                            >
                            {tab}
                            </button>
                        ))}
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                            {pesonaItems.map((item, i) => (
                                <div
                                key={i}
                                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
                                >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-36 w-full object-cover"
                                />

                                <div className="p-4">
                                    <h3 className="font-semibold">
                                    {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500">
                                    Deskripsi singkat mengenai {item.title}.
                                    </p>

                                    <button className="mt-3 text-primary text-sm font-medium">
                                    Lihat →
                                    </button>
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Bottom */}
                    <div className="relative mt-10
                        overflow-hidden
                        rounded-2xl
                        bg-[linear-gradient(135deg,#154E5B_0%,#1D6573_50%,#2A7D8C_100%)]
                        px-6
                        py-5
                        text-white">
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute left-1/3 bottom-0 h-20 w-20 rounded-full bg-cyan-300/10 blur-2xl" />

                        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                                <MapPinned className="h-6 w-6" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold">
                                Temukan lebih banyak pengalaman di Kota Kediri!
                                </h3>

                                <p className="mt-1 text-sm text-white/80">
                                Jelajahi destinasi, kuliner, budaya, dan berbagai fasilitas terbaik di Kediri Raya.
                                </p>
                            </div>
                            </div>

                            <Link
                                href={route('akomodasi.index')}
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-sm"
                            >
                                Jelajahi Fasilitas Kota
                                <ArrowRight size={16} />
                            </Link>

                        </div>
                    </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    )
}