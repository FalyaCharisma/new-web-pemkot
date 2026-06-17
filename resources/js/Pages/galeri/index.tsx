import { Head } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { useState, useEffect } from "react";
import {
    Image as ImageIcon,
    Video,
    FolderOpen,
    Play,
    Camera,
    RotateCcw,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function GaleriIndex() {

    const featuredVideos = [
        {
            category: "Profil Kota",
            date: "12 Juni 2026",
            title: "Video Profil Kota Kediri 2026",
            description:
                "Mengenal potensi wisata, budaya, dan perkembangan Kota Kediri melalui video profil terbaru.",
            image: "/images/video-profil.jpg",
            duration: "03:25",
        },
        {
            category: "Budaya",
            date: "10 Juni 2026",
            title: "Festival Jaranan Kota Kediri",
            description:
                "Kemeriahan Festival Jaranan yang dihadiri ribuan masyarakat Kota Kediri.",
            image: "/images/jaranan.jpg",
            duration: "04:10",
        },
        {
            category: "Wisata",
            date: "8 Juni 2026",
            title: "Pesona Wisata Kediri",
            description:
                "Menjelajahi destinasi wisata unggulan yang menjadi kebanggaan Kota Kediri.",
            image: "/images/wisata.jpg",
            duration: "05:42",
        },
    ];

    const galleries = [
        {
            type: "photo",
            category: "Wisata",
            title: "Simpang Lima Gumul",
            cover:
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            images: [
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            ],
            date: "24 Mei 2026",
            count: "18 Foto",
        },
        {
            type: "photo",
            category: "Wisata",
            title: "Air Terjun Dolo",
            cover:
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            images: [
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            ],
            date: "23 Mei 2026",
            count: "15 Foto",
        },
        {
            type: "video",
            category: "Video",
            title: "Video Profil Kota Kediri",
            cover:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            images: [
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            ],
            duration: "03:25",
        },
        {
            type: "photo",
            category: "Pemerintahan",
            title: "Upacara Hari Jadi Kota Kediri",
            cover:
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
            images: [
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            ],
            date: "17 Mei 2026",
            count: "42 Foto",
        },
        {
            type: "photo",
            category: "Budaya",
            title: "Kirab Budaya Hari Jadi Kota Kediri",
            cover:
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
            images: [
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            ],
            date: "17 Mei 2026",
            count: "36 Foto",
        },
        {
            type: "photo",
            category: "UMKM",
            title: "Pameran UMKM Kota Kediri",
            cover:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            images: [
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            ],
            date: "10 Mei 2026",
            count: "28 Foto",
        },
        {
            type: "video",
            category: "Video",
            title: "Pesona Wisata Kota Kediri",
            cover:
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
            images: [
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            ],
            duration: "04:18",
        },
        {
            type: "photo",
            category: "Pendidikan",
            title: "Kegiatan Belajar Mengajar",
            cover:
                "https://images.unsplash.com/photo-1509062522246-3755977927d7",
            images: [
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            ],
            date: "8 Mei 2026",
            count: "20 Foto",
        },
        {
            type: "photo",
            category: "Wisata",
            title: "Masjid Agung Kota Kediri",
            cover:
                "https://images.unsplash.com/photo-1512632578888-169bbbc64f33",
            images: [
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            ],
            date: "5 Mei 2026",
            count: "22 Foto",
        },
    ];
    
    const [selectedItem, setSelectedItem] = useState<any>(null);

    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedItem]);

    return (
        <>
            <Head title="Galeri" />

            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />

                <main className="pt-15">
                    <HeroPage
                        title="Galeri"
                        breadcrumb="Galeri"
                        placeholder="Cari foto, video, destinasi, budaya, atau kegiatan..."
                        description="Jelajahi momen terbaik Kota Kediri melalui koleksi foto dan video yang merekam pesona alam, budaya, destinasi wisata, serta berbagai kegiatan masyarakat."
                    />

                    <section className="container mx-auto px-4 py-10">

                        {/* STATISTIK */}
                        <div className="grid gap-5 md:grid-cols-3">
                            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                                        <ImageIcon className="h-7 w-7 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-primary">
                                            1.250
                                        </h3>
                                        <p className="font-semibold">Foto</p>
                                        <p className="text-sm text-muted-foreground">
                                            Koleksi foto kegiatan dan keindahan Kota Kediri
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                                        <Video className="h-7 w-7 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-primary">
                                            145
                                        </h3>
                                        <p className="font-semibold">Video</p>
                                        <p className="text-sm text-muted-foreground">
                                            Koleksi video kegiatan dan profil Kota Kediri
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                                        <FolderOpen className="h-7 w-7 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-primary">
                                            25
                                        </h3>
                                        <p className="font-semibold">Album</p>
                                        <p className="text-sm text-muted-foreground">
                                            Album dokumentasi berbagai kegiatan
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* HIGHLIGHT VIDEO */}
                        <div className="mt-10">
                            <div className="mb-5">
                                <h2 className="text-2xl font-bold">
                                    Highlight Video
                                </h2>

                                <p className="text-muted-foreground">
                                    Video pilihan yang menampilkan pesona, budaya, dan aktivitas Kota Kediri.
                                </p>
                            </div>

                            <div className="overflow-hidden rounded-3xl border bg-white">
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay]}
                                    navigation
                                    pagination={{
                                        clickable: true,
                                    }}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    loop
                                >
                                    {featuredVideos.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="grid lg:grid-cols-[1.4fr_1fr]">
                                                {/* THUMBNAIL */}
                                                <div className="relative h-[260px] lg:h-[320px]">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="h-full w-full object-cover"
                                                    />

                                                    <div className="absolute inset-0 bg-black/30" />

                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="rounded-full bg-white/90 p-5 shadow-lg">
                                                            <Play className="h-10 w-10 text-primary" />
                                                        </div>
                                                    </div>

                                                    <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                                                        Highlight Video
                                                    </span>
                                                </div>

                                                {/* DETAIL */}
                                                <div className="flex flex-col justify-center p-6 lg:p-8">
                                                    <div className="flex items-center gap-3">
                                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                                            {item.category}
                                                        </span>

                                                        <span className="text-sm text-muted-foreground">
                                                            {item.date}
                                                        </span>
                                                    </div>

                                                    <h2 className="mt-4 text-2xl font-bold lg:text-3xl">
                                                        {item.title}
                                                    </h2>

                                                    <p className="mt-3 text-muted-foreground">
                                                        {item.description}
                                                    </p>

                                                    <div className="mt-5 flex gap-6 text-sm text-muted-foreground">
                                                        <span>🎬 Video</span>
                                                        <span>⏱ {item.duration}</span>
                                                    </div>

                                                    <button className="mt-6 w-fit rounded-xl bg-primary px-5 py-3 font-medium text-white">
                                                        Tonton Video →
                                                    </button>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        {/* FILTER + GRID */}
                        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">

                            {/* FILTER */}
                            <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm">
                                <h3 className="mb-5 text-lg font-semibold">
                                    Filter Galeri
                                </h3>

                                <div className="space-y-4">
                                    <select className="w-full rounded-xl border p-3">
                                        <option>Semua Jenis</option>
                                    </select>

                                    <select className="w-full rounded-xl border p-3">
                                        <option>Semua Kategori</option>
                                    </select>

                                    <select className="w-full rounded-xl border p-3">
                                        <option>Semua Tahun</option>
                                    </select>

                                    <input
                                        type="date"
                                        className="w-full rounded-xl border p-3"
                                    />

                                    <button className="w-full rounded-xl bg-primary py-3 font-medium text-white">
                                        Terapkan Filter
                                    </button>

                                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border py-3">
                                        <RotateCcw size={16} />
                                        Reset Filter
                                    </button>
                                </div>
                            </aside>

                            {/* GRID GALERI */}
                            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                {galleries.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedItem(item)}
                                        className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm"
                                    >
                                        <div className="relative aspect-[4/3]">
                                            <img
                                                src={item.cover || item.images?.[0]}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                            <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                                                {item.category}
                                            </span>

                                            {item.type === "video" && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="rounded-full bg-white/90 p-4">
                                                        <Play className="h-8 w-8" />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                                <h3 className="font-semibold">
                                                    {item.title}
                                                </h3>

                                                {item.type === "video" ? (
                                                    <p className="mt-2 text-sm">
                                                        Durasi {item.duration}
                                                    </p>
                                                ) : (
                                                    <>
                                                        <p className="mt-1 text-sm opacity-90">
                                                            {item.date}
                                                        </p>

                                                        <div className="mt-2 flex items-center gap-2 text-sm">
                                                            <Camera size={14} />
                                                            {item.count}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedItem && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                                <div className="relative w-full max-w-4xl rounded-2xl bg-white p-4">

                                    {/* CLOSE BUTTON */}
                                    <button
                                        onClick={() => setSelectedItem(null)}
                                        className="absolute right-4 top-4 z-10 rounded-full bg-black/70 px-3 py-1 text-white"
                                    >
                                        ✕
                                    </button>

                                    {/* SWIPER */}
                                    {selectedItem?.images?.length > 0 && (
                                        <Swiper
                                            key={selectedItem?.title}
                                            modules={[Navigation, Pagination]}
                                            navigation
                                            pagination={{ clickable: true }}
                                            loop={selectedItem.images.length > 1}
                                        >
                                            {(selectedItem?.images || []).map((img: string, i: number) => (
                                                <SwiperSlide key={i}>
                                                    <img
                                                        src={img}
                                                        className="h-[70vh] w-full object-contain"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    )}

                                    {/* INFO */}
                                    <div className="mt-4">
                                        <h2 className="text-xl font-bold">{selectedItem.title}</h2>
                                        <p className="text-sm text-gray-500">
                                            {selectedItem.category} • {selectedItem.date || selectedItem.duration}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}