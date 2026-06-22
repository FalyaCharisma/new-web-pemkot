import { Head, router } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { useState, useEffect } from "react";
import type { FeaturedVideos } from "@/types/featured-videos";
import type { PaginatedAlbums } from "@/types/album";
import { getYoutubeEmbedUrl } from "@/helpers/youtube";
import Pagination from "@/Components/Pagination";
 
import {
    Image as ImageIcon,
    Video,
    FolderOpen,
    RotateCcw,
} from "lucide-react";

import {
  FaYoutube,
} from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
    videos: FeaturedVideos[];
    albums: PaginatedAlbums;
    totalFoto: number;
    totalVideo: number;
    totalAlbum: number;
}

export default function GaleriIndex( { videos, albums, totalAlbum, totalFoto, totalVideo }:Props) {

    const [search, setSearch] = useState("");

    const [year, setYear] = useState<string>("all");

    const years = Array.from(
        new Set(
            (albums?.data ?? []).map((a) =>
                new Date(a.created_at).getFullYear()
            )
        )
    );

    const filteredAlbums = (albums?.data ?? []).filter((album) => {
        if (year === "all") return true;

        return new Date(album.created_at).getFullYear().toString() === year;
    });


    const galleries = filteredAlbums.map((album) => ({
        category: "Album",
        title: album.judul,
        cover: album.fotos?.[0]?.foto
            ? `/storage/album/${album.fotos[0].foto}`
            : "https://placehold.co/600x400",

        images: album.fotos?.map(
            (foto) => `/storage/album/${foto.foto}`
        ) || [],

        date: new Date(album.created_at).toLocaleDateString("id-ID"),
        count: `${album.fotos?.length ?? 0} Foto`,
    }));
    
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
                        placeholder="Cari album..."
                        description="Jelajahi momen terbaik Kota Kediri..."

                        searchValue={search}
                        onSearchChange={(value) => setSearch(value)}
                        onSearch={(keyword) => {
                            router.get(
                                route("galeri.index"),
                                {
                                    search: keyword,
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                }
                            );
                        }}
                    />

                    <section className="container mx-auto px-4 py-10">

                        {/* STATISTIK */}
                        <div className="grid gap-5 md:grid-cols-3">

                            {/* FOTO */}
                            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                                        <ImageIcon className="h-7 w-7 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-primary">
                                            {totalFoto}
                                        </h3>
                                        <p className="font-semibold">Foto</p>
                                        <p className="text-sm text-muted-foreground">
                                            Koleksi foto kegiatan dan keindahan Kota Kediri
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* VIDEO */}
                            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                                        <Video className="h-7 w-7 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-primary">
                                            {totalVideo}
                                        </h3>
                                        <p className="font-semibold">Video</p>
                                        <p className="text-sm text-muted-foreground">
                                            Koleksi video kegiatan dan profil Kota Kediri
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* ALBUM */}
                            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                                        <FolderOpen className="h-7 w-7 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-primary">
                                            {totalAlbum}
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
                                {videos?.length > 0 && (
                                    <Swiper
                                        modules={[Navigation, Autoplay]}
                                        navigation
                                        pagination={{ clickable: true }}
                                        autoplay={{
                                            delay: 5000,
                                            disableOnInteraction: false,
                                        }}
                                        loop={videos.length > 1}
                                    >
                                        {videos.map((item, index) => {
                                            // ambil youtube id
                                            const videoId = item.video_url
                                                ? item.video_url.match(
                                                    /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/
                                                )?.[1]
                                                : null;

                                            return (
                                                <SwiperSlide key={item.id}>
                                                    <div className="grid lg:grid-cols-[1.4fr_1fr]">

                                                        {/* VIDEO */}
                                                        <div className="aspect-video">
                                                            <iframe
                                                                loading="lazy"
                                                                className="h-full w-full"
                                                                src={`${getYoutubeEmbedUrl(item.video_url)}?rel=0&mute=1`}
                                                                title={item.title}
                                                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                            />
                                                        </div>

                                                        {/* DETAIL */}
                                                        <div className="flex flex-col justify-center p-8">
                                                            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                                                Highlight Video
                                                            </span>

                                                            <h2 className="mt-4 text-3xl font-bold">
                                                                {item.title}
                                                            </h2>

                                                            <p className="mt-4 text-muted-foreground">
                                                                {item.description}
                                                            </p>

                                                           <div className="mt-8 rounded-2xl bg-red-50 border border-red-100 p-5">
                                                                <div className="flex items-start gap-4">
                                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                                                                        <FaYoutube size={22} />
                                                                    </div>

                                                                    <div className="flex-1">
                                                                        <h3 className="font-semibold text-slate-900">
                                                                            Tonton video selengkapnya
                                                                        </h3>

                                                                        <p className="mt-1 text-sm text-slate-600">
                                                                            Saksikan berbagai video destinasi wisata, budaya, dan aktivitas menarik
                                                                            Kota Kediri di kanal resmi Pemkot Kediri TV.
                                                                        </p>

                                                                        <a
                                                                            href="https://www.youtube.com/@pemkotkediritv"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                                                                        >
                                                                            <FaYoutube />
                                                                            Buka Channel
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                )}
                            </div>
                        </div>

                        {/* FILTER + GRID */}
                        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">

                            {/* FILTER */}
                            <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm">
                                <h3 className="mb-5 text-lg font-semibold">
                                    Filter Tahun
                                </h3>

                                <div className="space-y-4">

                                    <select
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        className="w-full rounded-xl border p-3"
                                    >
                                        <option value="all">Semua Tahun</option>

                                        {years.map((y) => (
                                            <option key={y} value={y}>
                                                {y}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        onClick={() => setYear("all")}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border py-3"
                                    >
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

                                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                                <h3 className="font-semibold">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <Pagination links={albums.links} />

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
                                            modules={[Navigation]}
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