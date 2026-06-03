import { SectionLabel } from "./SectionLabel";
import dance from "@/assets/culture-dance.jpg";
import festival from "@/assets/agenda-festival.jpg";
import umkm from "@/assets/culture-umkm.jpg";
import food from "@/assets/culture-food.jpg";

const cards = [
  { tag: "Seni Pertunjukan", title: "Kesenian Tradisional", desc: "Jaranan, wayang, dan tari klasik khas Kediri.", img: dance },
  { tag: "Event Tahunan", title: "Festival Daerah", desc: "Kediri Nite Carnival, Grebeg Pancasila, dan lainnya.", img: festival },
  { tag: "Karya Lokal", title: "UMKM & Ekonomi Kreatif", desc: "Batik Kediren, kerajinan, dan industri kreatif warga.", img: umkm },
  { tag: "Cita Rasa", title: "Kuliner Khas", desc: "Tahu Takwa, Stik Tahu, Soto Kediri, dan Pecel Tumpang.", img: food },
];

export function Culture() {
  return (
    <section id="budaya" className="relative py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <SectionLabel>Budaya &amp; Warisan</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Denyut budaya yang hidup{" "}
            <span className="font-serif italic text-gold">setiap hari</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Seni, festival, dan kuliner yang menjadi identitas Kota Kediri.
          </p>
        </div>
      </div>

      <div className="mt-14 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="container-page flex gap-5">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group relative aspect-[3/4] w-[78vw] shrink-0 overflow-hidden rounded-3xl border border-border shadow-elegant sm:w-[420px]"
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                width={900}
                height={1200}
                className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="text-[11px] uppercase tracking-[0.22em] text-gold">{c.tag}</span>
                <h3 className="mt-2 font-serif text-3xl text-white">{c.title}</h3>
                <p className="mt-2 max-w-xs text-sm text-white/70">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
