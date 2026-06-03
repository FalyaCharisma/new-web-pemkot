import { useState } from "react";
import { MapPin } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import hero from "@/assets/hero-kediri.jpg";
import kelud from "@/assets/tourism-kelud.jpg";
import mosque from "@/assets/harmony-mosque.jpg";
import dance from "@/assets/culture-dance.jpg";
import umkm from "@/assets/culture-umkm.jpg";
import food from "@/assets/culture-food.jpg";

const filters = ["Semua", "Wisata Alam", "Wisata Kota", "Wisata Religi", "Wisata Budaya"] as const;

const items = [
  { title: "Simpang Lima Gumul", category: "Wisata Kota", area: "Ngasem, Kediri", img: hero },
  { title: "Gunung Kelud", category: "Wisata Alam", area: "Sugih Waras, Kediri", img: kelud },
  { title: "Goa Selomangleng", category: "Wisata Budaya", area: "Mojoroto, Kediri", img: umkm },
  { title: "Masjid Agung Kediri", category: "Wisata Religi", area: "Kota, Kediri", img: mosque },
  { title: "Sentra Kuliner Tahu", category: "Wisata Kota", area: "Kota, Kediri", img: food },
  { title: "Sentra Seni Tradisi", category: "Wisata Budaya", area: "Kota, Kediri", img: dance },
];

export function Tourism() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Semua");
  const filtered = filter === "Semua" ? items : items.filter((i) => i.category === filter);

  return (
    <section id="wisata" className="relative py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionLabel>Destinasi Wisata</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              Setiap sudut menyimpan{" "}
              <span className="font-serif italic text-gold">cerita</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                  filter === f
                    ? "border-gold bg-gold text-gold-foreground"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((i) => (
            <article
              key={i.title}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-border"
            >
              <img
                src={i.img}
                alt={i.title}
                loading="lazy"
                width={800}
                height={1000}
                className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="text-[11px] uppercase tracking-[0.22em] text-gold">
                  {i.category}
                </span>
                <h3 className="mt-2 font-serif text-2xl text-white">{i.title}</h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/70">
                  <MapPin className="size-3.5" /> {i.area}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
