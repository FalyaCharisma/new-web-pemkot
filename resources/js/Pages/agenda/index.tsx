import { Head, Link } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { ContentCTA } from "@/Components/ContentCTA";

import {
  FaInstagram,
} from "react-icons/fa6";

import {
    CalendarDays,
    Clock3,
    MapPin,
    PartyPopper,
    Landmark,
    Users,
} from "lucide-react";


export default function Agenda() {

    const timelineAgenda = [
        {
            date: "24 JUL 2026",
            category: "Festival",
            color: "bg-green-500",
            title: "Festival Budaya Kota Kediri",
            time: "08.00 - 16.00 WIB",
            location: "Alun-Alun Kota Kediri",
            description:
                "Festival budaya tahunan yang menampilkan berbagai kesenian tradisional dan UMKM lokal.",
        },
        {
            date: "25 JUL 2026",
            category: "Pemerintahan",
            color: "bg-amber-500",
            title: "Upacara Hari Jadi Kota Kediri",
            time: "07.00 - 10.00 WIB",
            location: "Balai Kota Kediri",
            description:
                "Upacara resmi Pemerintah Kota Kediri dalam rangka memperingati Hari Jadi Kota Kediri.",
        },
        {
            date: "30 JUL 2026",
            category: "Komunitas",
            color: "bg-blue-500",
            title: "Fun Bike Kediri Sehat",
            time: "06.00 WIB",
            location: "Taman Brantas",
            description:
                "Kegiatan bersepeda bersama masyarakat untuk mendukung gaya hidup sehat.",
        },
        {
            date: "24 JUL 2026",
            category: "Festival",
            color: "bg-green-500",
            title: "Festival Budaya Kota Kediri",
            time: "08.00 - 16.00 WIB",
            location: "Alun-Alun Kota Kediri",
            description:
                "Festival budaya tahunan yang menampilkan berbagai kesenian tradisional dan UMKM lokal.",
        },
        {
            date: "25 JUL 2026",
            category: "Pemerintahan",
            color: "bg-amber-500",
            title: "Upacara Hari Jadi Kota Kediri",
            time: "07.00 - 10.00 WIB",
            location: "Balai Kota Kediri",
            description:
                "Upacara resmi Pemerintah Kota Kediri dalam rangka memperingati Hari Jadi Kota Kediri.",
        },
        {
            date: "30 JUL 2026",
            category: "Komunitas",
            color: "bg-blue-500",
            title: "Fun Bike Kediri Sehat",
            time: "06.00 WIB",
            location: "Taman Brantas",
            description:
                "Kegiatan bersepeda bersama masyarakat untuk mendukung gaya hidup sehat.",
        },
    ];

    const upcomingAgenda = [
        {
            category: "Pemerintahan",
            image: "/images/upacara.jpg",
            day: "25",
            month: "JUL",
            title: "Upacara Peringatan Hari Jadi Kota Kediri",
            time: "07.00 - 10.00 WIB",
            location: "Halaman Balai Kota Kediri",
        },
        {
            category: "Festival",
            image: "/images/festival.jpg",
            day: "28",
            month: "JUL",
            title: "Festival Budaya Kota Kediri 2026",
            time: "08.00 - 16.00 WIB",
            location: "Alun-alun Kota Kediri",
        },
        {
            category: "Komunitas",
            image: "/images/funbike.jpg",
            day: "30",
            month: "JUL",
            title: "Fun Bike Kediri Sehat Bersama",
            time: "06.00 - 09.00 WIB",
            location: "Taman Brantas Kediri",
        },
    ];

    return (
        <>
        <Head title="Agenda" />
        <div className="min-h-screen bg-slate-50 text-foreground">
            <HeaderSolid />
            <main className="pt-15">
                <HeroPage
                    title="Agenda Kota Kediri"
                    breadcrumb="Agenda"
                    placeholder="Cari agenda atau kegiatan..."
                    description="Informasi kegiatan, acara, dan agenda penting yang diselenggarakan di Kota Kediri."
                />
                {/* CONTENT */}
                <section className="container mx-auto px-4 py-10">
                    {/* STATISTIK */}
                    <div className="grid gap-5 md:grid-cols-4 mb-8">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100">
                                    <CalendarDays className="h-7 w-7 text-teal-700" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-primary">
                                        24
                                    </h3>
                                    <p className="font-semibold">Agenda</p>
                                    <p className="text-sm text-muted-foreground">
                                        Akan datang
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                                    <PartyPopper className="h-7 w-7 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-primary">
                                        8
                                    </h3>
                                    <p className="font-semibold">Festival</p>
                                    <p className="text-sm text-muted-foreground">
                                        Budaya & Event
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                                    <Landmark className="h-7 w-7 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-primary">
                                        12
                                    </h3>
                                    <p className="font-semibold">Pemerintahan</p>
                                    <p className="text-sm text-muted-foreground">
                                        Kegiatan Resmi
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                                    <Users className="h-7 w-7 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-primary">
                                        4
                                    </h3>
                                    <p className="font-semibold">Komunitas</p>
                                    <p className="text-sm text-muted-foreground">
                                        Kegiatan Masyarakat
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
                        {/* TIMELINE */}
                        <div className="rounded-3xl border bg-white p-6 shadow-sm">

                            <div className="mb-5">
                                <h2 className="text-lg font-bold">
                                    Timeline Agenda
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Agenda dan kegiatan yang akan berlangsung
                                </p>
                            </div>

                            <div className="relative">

                                {/* Scroll Area */}
                                <div
                                    className="
                                        max-h-[520px]
                                        space-y-4
                                        overflow-y-auto
                                        pb-6
                                        [-ms-overflow-style:none]
                                        [scrollbar-width:none]
                                        [&::-webkit-scrollbar]:hidden
                                    "
                                >

                                    {timelineAgenda.map((item, index) => (

                                        <div
                                            key={index}
                                            className="relative flex gap-4"
                                        >

                                            {/* Tanggal */}
                                            <div className="w-16 shrink-0 text-right">

                                                <p className="text-sm font-bold text-primary">
                                                    {item.date}
                                                </p>

                                            </div>

                                            {/* Garis Timeline */}
                                            <div className="relative flex w-6 justify-center">

                                                {/* Garis */}
                                                {index !== timelineAgenda.length - 1 && (
                                                    <div className="absolute top-4 bottom-0 w-0.5 bg-slate-200"></div>
                                                )}

                                                {/* Titik */}
                                                <div
                                                    className={`z-10 mt-1 h-4 w-4 rounded-full border-4 border-white shadow ${item.color}`}
                                                />

                                            </div>

                                            {/* Isi */}
                                            <div className="flex-1 pb-4">

                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-medium text-white ${item.color}`}
                                                >
                                                    {item.category}
                                                </span>

                                                <h3 className="mt-2 font-semibold leading-snug">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {item.time}
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                {/* Fade bawah */}
                                <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-white to-transparent"></div>

                            </div>

                        </div>

                        {/* AGENDA MENDATANG */}
                        <div className="grid gap-6 md:grid-cols-3">
                            {upcomingAgenda.map((item, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-48 w-full object-cover"
                                    />

                                    <div className="p-5">
                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                            {item.category}
                                        </span>

                                        <h3 className="mt-3 text-lg font-semibold">
                                            {item.title}
                                        </h3>

                                        <div className="mt-4 space-y-2 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays size={16} />
                                                {item.day} {item.month}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Clock3 size={16} />
                                                {item.time}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} />
                                                {item.location}
                                            </div>
                                        </div>

                                        <button className="mt-5 font-medium text-primary hover:underline">
                                            Lihat Detail →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                    {/* CTA */}
                    <ContentCTA
                        icon={<FaInstagram size={24} />}
                        title="Ikuti Informasi Terkini Kota Kediri"
                        description="Dapatkan update kegiatan, program pemerintah, pengumuman, dan berbagai informasi terbaru melalui Instagram resmi Pemerintah Kota Kediri."
                        buttonText="Kunjungi Instagram"
                        href="https://instagram.com/pemkotkediri"
                        external
                    />
                </section>
            </main>
            <Footer />
        </div>
        </>
    )
}