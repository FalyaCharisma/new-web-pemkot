import { Head, router } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { FormEvent, useEffect, useRef, useState } from "react";
import { HeroPage } from "@/Components/HeroPage";
import { ContentCTA } from "@/Components/ContentCTA";

import {
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  Building2,
  Bus,
  HeartPulse,
  UtensilsCrossed,
  ShoppingBag,
  Trees,
  PlayCircle,
  GraduationCap,
  Landmark,
  Hotel,
  Store,
  Fuel,
  Dumbbell,
  Shield,
  type LucideIcon,
} from "lucide-react";

type Kategori = {
  id: number;
  nama_kategori: string;
  icon?: string | null;
  fasilitas_count?: number;
};

type SubKategori = {
  id: number;
  kategori_id: number;
  nama_sub: string;
};

type Fasilitas = {
  id: number;
  kategori_id: number;
  sub_kategori_id?: number | null;
  nama: string;
  foto?: string | null;
  alamat: string;
  telp: string;
  link?: string | null;
  map?: string | null;
  rating?: number | string | null;
  reviews?: number | string | null;
  ulasan?: number | string | null;
  kategori?: Kategori | null;
  sub_kategori?: SubKategori | null;
};

type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type Paginated<T> = {
  data: T[];
  links: PaginationLink[];
  from?: number | null;
  to?: number | null;
  total?: number;
};

type Props = {
  fasilitas: Paginated<Fasilitas>;
  kategori: Kategori[];
  subKategori: SubKategori[];
  filters: {
    search?: string;
    kategori?: string | number;
    sub_kategori?: string | number;
  };
};

const iconMap: Record<string, LucideIcon> = {
  // Gunakan key icon baru ini di kolom kategori_fasilitas.icon
  building: Building2,
  gedung: Building2,

  transportasi: Bus,
  bus: Bus,
  terminal: Bus,

  akomodasi: Hotel,
  hotel: Hotel,
  penginapan: Hotel,

  kesehatan: HeartPulse,
  rumah_sakit: HeartPulse,
  puskesmas: HeartPulse,
  klinik: HeartPulse,

  kuliner: UtensilsCrossed,
  restoran: UtensilsCrossed,
  cafe: UtensilsCrossed,

  belanja: ShoppingBag,
  pasar: ShoppingBag,
  mall: ShoppingBag,
  toko: Store,

  ruang_publik: Trees,
  taman: Trees,

  pendidikan: GraduationCap,
  sekolah: GraduationCap,
  kampus: GraduationCap,

  perbankan: Landmark,
  bank: Landmark,
  atm: Landmark,

  spbu: Fuel,
  olahraga: Dumbbell,
  keamanan: Shield,
};

function normalizeIconKey(value?: string | null) {
  return (value ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

function getKategoriIcon(icon?: string | null): LucideIcon {
  const key = normalizeIconKey(icon);

  return iconMap[key] || Building2;
}

function resolveImageUrl(foto?: string | null) {
  if (!foto) return "";

  if (foto.startsWith("http://") || foto.startsWith("https://")) {
    return foto;
  }

  if (foto.startsWith("/")) {
    return foto;
  }

  if (foto.startsWith("storage/")) {
    return `/${foto}`;
  }

  return `/storage/${foto}`;
}

function cleanPaginationLabel(label: string) {
  return label
    .replace("&laquo;", "‹")
    .replace("&raquo;", "›")
    .replace(/<[^>]*>/g, "");
}

function formatRating(item: Fasilitas) {
  const rawRating = item.rating;

  if (rawRating === null || rawRating === undefined || rawRating === "") {
    return null;
  }

  const rating = Number(rawRating);

  if (Number.isNaN(rating)) {
    return null;
  }

  return rating.toFixed(1).replace(".0", "");
}

export default function FasilitasKotaIndex({
  fasilitas,
  kategori,
  subKategori,
  filters,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedKategori, setSelectedKategori] = useState(
    filters.kategori ? String(filters.kategori) : ""
  );
  const [selectedSubKategori, setSelectedSubKategori] = useState(
    filters.sub_kategori ? String(filters.sub_kategori) : ""
  );
  const [search, setSearch] = useState(filters.search ?? "");

  // Menjaga kolom pencarian tetap sama dengan query URL setelah pagination,
  // klik kategori, atau navigasi browser.
  useEffect(() => {
    setSearch(filters.search ?? "");
  }, [filters.search]);

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

  const goToFilter = (params: Record<string, string | number | undefined>) => {
    router.get("/fasilitas-kota", params, {
      preserveScroll: true,
      replace: true,
    });
  };

  const selectKategori = (kategoriId?: number) => {
    const nextKategori = kategoriId ? String(kategoriId) : "";

    setSelectedKategori(nextKategori);
    setSelectedSubKategori("");

    goToFilter({
      search: search.trim() || undefined,
      kategori: kategoriId || undefined,
    });
  };

  const submitFilter = (e: FormEvent) => {
    e.preventDefault();

    goToFilter({
      search: search.trim() || undefined,
      kategori: selectedKategori || undefined,
      sub_kategori: selectedSubKategori || undefined,
    });
  };

  const handleSearch = (keyword: string) => {
    const nextSearch = keyword.trim();

    setSearch(keyword);
    goToFilter({
      search: nextSearch || undefined,
      kategori: selectedKategori || undefined,
      sub_kategori: selectedSubKategori || undefined,
    });
  };

  const activeKategoriId = filters.kategori ? Number(filters.kategori) : null;

  const filteredSubKategori = selectedKategori
    ? subKategori.filter((item) => item.kategori_id === Number(selectedKategori))
    : subKategori;

  return (
    <>
      <Head title="Fasilitas Kota" />

      <div className="min-h-screen bg-slate-50 text-foreground">
        <HeaderSolid />

        <main className="pt-15">
          <HeroPage
            title="Fasilitas Kota"
            breadcrumb="Fasilitas Kota"
            placeholder="Cari fasilitas kota..."
            description="Cari dan temukan berbagai fasilitas terbaik di Kota Kediri untuk kebutuhan perjalanan, aktivitas sehari-hari, maupun rekreasi Anda."
            searchValue={search}
            onSearchChange={setSearch}
            onSearch={handleSearch}
          />

          {/* CONTENT */}
          <section className="container mx-auto px-4 py-10">
            <div className="mb-8 rounded-3xl border bg-white p-6 shadow-sm">
              <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                <div className="flex items-center justify-center">
                  <h2 className="text-2xl font-bold text-primary">
                    Kediri Hub
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
                    <button
                      type="button"
                      onClick={() => selectKategori()}
                      className={`flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-2xl transition ${
                        !activeKategoriId
                          ? "bg-primary text-white shadow-lg"
                          : "border bg-white text-slate-700 hover:border-primary hover:text-primary"
                      }`}
                    >
                      <Building2 size={28} />
                      <span className="mt-2 font-medium">Semua</span>
                    </button>

                    {kategori.map((item) => {
                      const Icon = getKategoriIcon(item.icon);
                      const isActive = activeKategoriId === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => selectKategori(item.id)}
                          className={`flex h-24 w-40 shrink-0 flex-col items-center justify-center rounded-2xl transition ${
                            isActive
                              ? "bg-primary text-white shadow-lg"
                              : "border bg-white text-slate-700 hover:border-primary hover:text-primary"
                          }`}
                        >
                          <Icon size={28} />
                          <span className="mt-2 line-clamp-1 px-2 text-center font-medium">
                            {item.nama_kategori}
                          </span>
                        </button>
                      );
                    })}
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

                <form onSubmit={submitFilter} className="space-y-8">
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-slate-700">
                      Kategori
                    </h3>

                    <div className="space-y-2">
                      {filteredSubKategori.length > 0 ? (
                        filteredSubKategori.map((item) => (
                          <label
                            key={item.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={selectedSubKategori === String(item.id)}
                              onChange={() => {
                                setSelectedSubKategori((current) =>
                                  current === String(item.id) ? "" : String(item.id)
                                );
                              }}
                            />
                            {item.nama_sub}
                          </label>
                        ))
                      ) : (
                        <p className="text-sm text-slate-500">
                          Sub kategori belum tersedia.
                        </p>
                      )}
                    </div>
                  </div>

                  <button className="w-full rounded-xl bg-primary py-3 font-medium text-white">
                    Terapkan Filter
                  </button>
                </form>
              </aside>

              {/* LIST */}
              <div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {fasilitas.data.map((item) => {
                    const imageUrl = resolveImageUrl(item.foto);
                    const mapUrl = item.map || item.link || "";
                    const Icon = getKategoriIcon(item.kategori?.icon);
                    const rating = formatRating(item);
                    const reviews = item.reviews ?? item.ulasan ?? null;

                    return (
                      <article
                        key={item.id}
                        className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="relative">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={item.nama}
                              className="h-40 w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-40 w-full items-center justify-center bg-slate-100 text-slate-400">
                              <Icon size={42} />
                            </div>
                          )}

                          <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-1 text-xs font-medium text-white">
                            {item.sub_kategori?.nama_sub || item.kategori?.nama_kategori || "Fasilitas"}
                          </span>
                        </div>

                        <div className="p-4">
                          {/* Nama */}
                          <h3 className="line-clamp-1 font-semibold text-slate-900">
                            {item.nama}
                          </h3>

                          {/* Rating */}
                          <div className="mt-2 flex items-center gap-1 text-sm">
                            <Star
                              size={15}
                              className={
                                rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-yellow-400"
                              }
                            />

                            {rating ? (
                              <>
                                <span className="font-medium">{rating}</span>

                                {reviews !== null && reviews !== undefined && reviews !== "" && (
                                  <span className="text-slate-500">
                                    ({reviews} ulasan)
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-slate-500">
                                Belum ada rating
                              </span>
                            )}
                          </div>

                          {/* Alamat */}
                          <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
                            <MapPin size={15} className="mt-0.5 shrink-0" />

                            <span className="line-clamp-2">
                              {item.alamat || "Alamat belum tersedia"}
                            </span>
                          </div>

                          {/* Telepon */}
                          <div className="mt-2 flex items-center gap-2 text-sm">
                            <Phone size={15} className="text-primary" />

                            <span className="font-medium text-slate-700">
                              {item.telp || "-"}
                            </span>
                          </div>

                          {/* Tombol Maps */}
                          {mapUrl ? (
                            <a
                              href={mapUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                            >
                              <MapPin size={16} />
                              Lihat Lokasi
                            </a>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-slate-400"
                            >
                              <MapPin size={16} />
                              Lokasi Belum Tersedia
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>

                {fasilitas.data.length === 0 && (
                  <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
                    <Building2 className="mx-auto mb-3 text-slate-400" size={42} />
                    <h3 className="text-lg font-semibold text-slate-900">
                      Data fasilitas belum ditemukan
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Coba ubah filter pencarian.
                    </p>
                  </div>
                )}

                {fasilitas.links?.length > 3 && (
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {fasilitas.links.map((link, index) => (
                      <button
                        key={`${link.label}-${index}`}
                        type="button"
                        disabled={!link.url}
                        onClick={() => {
                          if (link.url) {
                            router.get(link.url, {}, { preserveScroll: true });
                          }
                        }}
                        className={`rounded-lg border px-3 py-2 text-sm transition ${
                          link.active
                            ? "bg-primary text-white"
                            : link.url
                            ? "bg-white text-slate-700 hover:border-primary hover:text-primary"
                            : "cursor-not-allowed bg-slate-100 text-slate-400"
                        }`}
                      >
                        {cleanPaginationLabel(link.label)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <ContentCTA
              icon={<PlayCircle size={24} />}
              title="Butuh inspirasi untuk menjelajahi Kediri Raya?"
              description="Saksikan video destinasi wisata, kuliner khas, budaya lokal, dan berbagai pengalaman menarik dari Kediri Raya."
              buttonText="Tonton Inspirasi Kediri"
              href="https://www.youtube.com/results?search_query=wisata+kediri"
              external
            />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
