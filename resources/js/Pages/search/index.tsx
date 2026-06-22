import { Head } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import {
    Search,
    FileText,
    Newspaper,
    Trophy,
    Calendar,
    MapPin,
    ChevronDown,
    ArrowRight,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/**
 * TYPES
 */
interface StatCardProps {
    icon: LucideIcon;
    title: string;
    value: string | number;
}

type ResultItem = {
    category: string;
    color: string;
    title: string;
    image: string;
    date: string;
    desc: string;
    location?: string;
};

/**
 * PAGE
 */
export default function SearchIndex() {
    const results: ResultItem[] = [
        {
            category: "Agenda / Acara",
            color: "bg-amber-500",
            title: "Kediri Festival 2025",
            image: "https://picsum.photos/600/400?1",
            date: "12 - 14 Juli 2025",
            desc: "Rangkaian kegiatan budaya, seni, dan pariwisata terbesar di Kota Kediri.",
            location: "Alun-Alun Kota Kediri",
        },
        {
            category: "Berita",
            color: "bg-blue-600",
            title: "Kediri Festival 2024 Sukses Gaet 50 Ribu Pengunjung",
            image: "https://picsum.photos/600/400?2",
            date: "15 Juli 2024",
            desc: "Kediri Festival 2024 berlangsung meriah dengan berbagai pertunjukan menarik.",
        },
        {
            category: "Penghargaan",
            color: "bg-green-600",
            title: "Kota Kediri Raih Penghargaan Anugerah Pesona Indonesia",
            image: "https://picsum.photos/600/400?3",
            date: "2 Mei 2024",
            desc: "Penghargaan diberikan atas komitmen dalam pengembangan pariwisata daerah.",
        },
    ];

    return (
        <>
            <Head title="Hasil Pencarian" />

            <div className="min-h-screen bg-slate-100">
                <HeaderSolid />

                <main className="pt-16 mb-20">
                    {/* HERO */}
                    <section
                        className="relative h-[340px] bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600')",
                        }}
                    >
                        <div className="absolute inset-0 bg-black/20" />

                        <div className="relative container mx-auto px-6 pt-12">
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-white rounded-full p-3 flex items-center shadow-xl">
                                    <Search className="w-5 h-5 text-slate-400 ml-4" />

                                    <input
                                        defaultValue="kediri festival"
                                        className="flex-1 px-4 py-3 outline-none text-lg"
                                    />

                                    <button className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center">
                                        <Search className="w-6 h-6 text-white" />
                                    </button>
                                </div>

                                <div className="flex justify-center gap-4 mt-8">
                                    <button className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-white">
                                        Akses Fasilitas Publik
                                        <ArrowRight size={18} />
                                    </button>

                                    <button className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white">
                                        Jelajahi Kota Kediri
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CONTENT */}
                    <section className="-mt-10 relative z-10">
                        <div className="container mx-auto px-6">
                            <div className="bg-white rounded-[40px] p-8 shadow-sm">
                                <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                                    {/* SIDEBAR */}
                                    <aside className="border rounded-3xl p-6 h-fit">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-lg">
                                                Filter Pencarian
                                            </h3>
                                        </div>

                                        <div className="border-t my-6" />

                                        <h4 className="font-semibold mb-4">
                                            Kategori
                                        </h4>

                                        <div className="space-y-4 text-sm">
                                            {[
                                                "Semua Kategori",
                                                "Agenda / Acara",
                                                "Berita",
                                                "Penghargaan & Prestasi",
                                                "Informasi Lainnya",
                                            ].map((item) => (
                                                <label
                                                    key={item}
                                                    className="flex items-center gap-3"
                                                >
                                                    <input type="checkbox" />
                                                    {item}
                                                </label>
                                            ))}
                                        </div>

                                        <div className="border-t my-6" />

                                        <h4 className="font-semibold mb-4">
                                            Tahun
                                        </h4>

                                        <select className="w-full border rounded-xl p-3">
                                            <option>Semua Tahun</option>
                                            <option>2025</option>
                                            <option>2024</option>
                                            <option>2023</option>
                                        </select>

                                        <button className="w-full mt-8 bg-teal-800 text-white py-4 rounded-full font-semibold">
                                            Terapkan Filter
                                        </button>
                                    </aside>

                                    {/* MAIN */}
                                    <div>
                                        {/* HEADER */}
                                        <div className="flex justify-between">
                                            <div>
                                                <h1 className="text-4xl font-bold">
                                                    Hasil pencarian untuk{" "}
                                                    <span className="text-teal-800">
                                                        “kediri festival”
                                                    </span>
                                                </h1>

                                                <p className="text-slate-500 mt-2">
                                                    Ditemukan 24 hasil
                                                </p>
                                            </div>

                                            <button className="border rounded-full px-5 py-3 flex items-center gap-2">
                                                Terbaru
                                                <ChevronDown size={18} />
                                            </button>
                                        </div>

                                        {/* STATS */}
                                        <div className="grid md:grid-cols-4 gap-4 mt-8">
                                            <StatCard
                                                icon={FileText}
                                                title="Total Hasil"
                                                value="24"
                                            />
                                            <StatCard
                                                icon={Calendar}
                                                title="Agenda"
                                                value="8"
                                            />
                                            <StatCard
                                                icon={Newspaper}
                                                title="Berita"
                                                value="10"
                                            />
                                            <StatCard
                                                icon={Trophy}
                                                title="Penghargaan"
                                                value="3"
                                            />
                                        </div>

                                        {/* RESULTS */}
                                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                                            {results.map((item, i) => (
                                                <article
                                                    key={i}
                                                    className="border rounded-3xl overflow-hidden hover:shadow-lg transition"
                                                >
                                                    <img
                                                        src={item.image}
                                                        className="h-56 w-full object-cover"
                                                    />

                                                    <div className="p-5">
                                                        <span
                                                            className={`${item.color} text-white text-sm px-3 py-1 rounded-full`}
                                                        >
                                                            {item.category}
                                                        </span>

                                                        <div className="text-sm text-slate-500 mt-3">
                                                            {item.date}
                                                        </div>

                                                        <h3 className="font-bold text-xl mt-2">
                                                            {item.title}
                                                        </h3>

                                                        <p className="text-slate-600 mt-2 line-clamp-3">
                                                            {item.desc}
                                                        </p>

                                                        {item.location && (
                                                            <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
                                                                <MapPin size={16} />
                                                                {item.location}
                                                            </div>
                                                        )}
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}

/**
 * STAT CARD FIX
 */
function StatCard({ icon: Icon, title, value }: StatCardProps) {
    return (
        <div className="border rounded-3xl p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-800 text-white flex items-center justify-center">
                <Icon size={20} />
            </div>

            <div>
                <p className="text-slate-500 text-sm">{title}</p>
                <h3 className="text-3xl font-bold">{value}</h3>
            </div>
        </div>
    );
}