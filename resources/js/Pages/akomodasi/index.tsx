import { Head } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { useRef } from "react";
import { HeroPage } from "@/Components/HeroPage";

import {
  Search,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Home,
  ChevronRight as BreadcrumbChevron,
  Phone,
  Building2,
  Bus,
  HeartPulse,
  UtensilsCrossed,
  ShoppingBag,
  Trees,
} from "lucide-react";

const accommodations = [
  {
    id: 1,
    name: "Grand Surya Hotel",
    type: "Hotel",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    rating: 4.6,
    reviews: 1254,
    address: "Jl. Dhoho No.123, Kota Kediri",
    phone: "(0354) 123456",
  },
  {
    id: 2,
    name: "Viva Hotel Kediri",
    type: "Hotel",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200",
    rating: 4.4,
    reviews: 812,
    address: "Jl. S. Parman No.86, Kota Kediri",
    phone: "(0354) 123456",
  },
  {
    id: 3,
    name: "Lotus Garden Hotel",
    type: "Guest House",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
    rating: 4.5,
    reviews: 633,
    address: "Jl. Imam Bonjol No.14, Kota Kediri",
    phone: "(0354) 123456",
  },
  {
    id: 4,
    name: "Homestay Kampung Inggris",
    type: "Homestay",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200",
    rating: 4.3,
    reviews: 312,
    address: "Jl. Anggrek No.15, Pare",
    phone: "(0354) 123456",
  },
];

export default function AkomodasiIndex() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -300,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 300,
            behavior: "smooth",
        });
    };

  return (
    <>
      <Head title="Akomodasi" />

      <div className="min-h-screen bg-slate-50 text-foreground">
        <HeaderSolid />

        <main className="pt-15">
            <HeroPage
                title="Kediri Hub"
                breadcrumb="Fasilitas Kota"
                placeholder="Cari nama akomodasi atau lokasi..."
                description="Pusat informasi Kota Kediri untuk menemukan wisata, kuliner, akomodasi, dan berbagai rekomendasi terbaik bagi perjalanan Anda."
            />

            {/* CONTENT */}
            <section className="container mx-auto px-4 py-10">
                <div className="mb-8 rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                        <div className="flex items-center justify-center">
                            <h2 className="text-2xl font-bold text-primary">
                                Jelajahi Fasilitas
                            </h2>
                        </div>
                        <div className="relative min-w-0">
                            {/* Tombol kiri */}
                            <button
                                type="button"
                                onClick={scrollLeft}
                                className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-md transition hover:bg-slate-50"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {/* Tombol kanan */}
                            <button
                                type="button"
                                onClick={scrollRight}
                                className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-md transition hover:bg-slate-50"
                            >
                                <ChevronRight size={18} />
                            </button>

                            {/* Scroll Area */}
                            <div
                                ref={scrollRef}
                                className="
                                flex gap-4 overflow-x-auto scroll-smooth
                                px-14 pb-2
                                [-ms-overflow-style:none]
                                [scrollbar-width:none]
                                [&::-webkit-scrollbar]:hidden
                                "
                            >
                                <button className="flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                                <Building2 size={28} />
                                <span className="mt-2 font-medium">
                                    Akomodasi
                                </span>
                                </button>

                                <button className="flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-2xl border bg-white text-slate-700 transition hover:border-primary hover:text-primary">
                                <Bus size={28} />
                                <span className="mt-2 font-medium">
                                    Transportasi
                                </span>
                                </button>

                                <button className="flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-2xl border bg-white text-slate-700 transition hover:border-primary hover:text-primary">
                                <HeartPulse size={28} />
                                <span className="mt-2 font-medium">
                                    Kesehatan
                                </span>
                                </button>

                                <button className="flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-2xl border bg-white text-slate-700 transition hover:border-primary hover:text-primary">
                                <UtensilsCrossed size={28} />
                                <span className="mt-2 font-medium">
                                    Kuliner
                                </span>
                                </button>

                                <button className="flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-2xl border bg-white text-slate-700 transition hover:border-primary hover:text-primary">
                                <ShoppingBag size={28} />
                                <span className="mt-2 font-medium">
                                    Perbelanjaan
                                </span>
                                </button>

                                <button className="flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-2xl border bg-white text-slate-700 transition hover:border-primary hover:text-primary">
                                <Trees size={28} />
                                <span className="mt-2 font-medium">
                                    Ruang Publik
                                </span>
                                </button>

                                <button className="flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-2xl border bg-white text-slate-700 transition hover:border-primary hover:text-primary">
                                <Building2 size={28} />
                                <span className="mt-2 font-medium">
                                    Pendidikan
                                </span>
                                </button>

                                <button className="flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-2xl border bg-white text-slate-700 transition hover:border-primary hover:text-primary">
                                <Building2 size={28} />
                                <span className="mt-2 font-medium">
                                    Perbankan
                                </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                {/* FILTER */}
                <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-32">
                    <h2 className="mb-6 text-lg font-semibold">
                    Filter Pencarian
                    </h2>

                    <div className="space-y-8">
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-slate-700">
                        Kategori
                        </h3>

                        <div className="space-y-2">
                        {[
                            "Hotel",
                            "Guest House",
                            "Homestay",
                            "Villa",
                            "Penginapan",
                        ].map((item) => (
                            <label
                            key={item}
                            className="flex items-center gap-2 text-sm"
                            >
                            <input type="checkbox" />
                            {item}
                            </label>
                        ))}
                        </div>
                    </div>

                    <button className="w-full rounded-xl bg-primary py-3 font-medium text-white">
                        Terapkan Filter
                    </button>
                    </div>
                </aside>

                {/* LIST */}
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {accommodations.map((item) => (
                    <article
  key={item.id}
  className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
>
  <div className="relative">
    <img
      src={item.image}
      alt={item.name}
      className="h-40 w-full object-cover"
    />

    <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-1 text-xs font-medium text-white">
      {item.type}
    </span>
  </div>

  <div className="p-4">
    {/* Nama */}
    <h3 className="line-clamp-1 font-semibold text-slate-900">
      {item.name}
    </h3>

    {/* Rating */}
    <div className="mt-2 flex items-center gap-1 text-sm">
      <Star
        size={15}
        className="fill-yellow-400 text-yellow-400"
      />

      <span className="font-medium">
        {item.rating}
      </span>

      <span className="text-slate-500">
        ({item.reviews} ulasan)
      </span>
    </div>

    {/* Alamat */}
    <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
      <MapPin
        size={15}
        className="mt-0.5 shrink-0"
      />

      <span className="line-clamp-2">
        {item.address}
      </span>
    </div>

    {/* Telepon */}
    <div className="mt-2 flex items-center gap-2 text-sm">
      <Phone
        size={15}
        className="text-primary"
      />

      <span className="font-medium text-slate-700">
        {item.phone}
      </span>
    </div>

    {/* Tombol Maps */}
    <a
      href="#"
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
    >
      <MapPin size={16} />
      Lihat Lokasi
    </a>
  </div>
</article>
                ))}
                </div>
                </div>
            </section>
        </main>

        <Footer />
      </div>
    </>
  );
}