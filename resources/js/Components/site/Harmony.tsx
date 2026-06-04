import { SectionLabel } from "./SectionLabel";
import mosque from "@/assets/harmony-mosque.jpg";

const houses = [
  { name: "Masjid", desc: "Rumah ibadah umat Muslim" },
  { name: "Gereja", desc: "Rumah ibadah umat Kristiani" },
  { name: "Pura", desc: "Rumah ibadah umat Hindu" },
  { name: "Vihara", desc: "Rumah ibadah umat Buddha" },
];

export function Harmony() {
  return (
    <section id="harmoni" className="relative overflow-hidden py-28">
      <img
        src={mosque}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Bhinneka Tunggal Ika</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Kerukunan yang tumbuh{" "}
            <span className="font-serif italic text-gold">dari hati</span>
          </h2>
          <p className="mt-6 text-muted-foreground md:text-lg">
            Di Kota Kediri, masjid, gereja, pura, dan vihara berdiri
            berdampingan — menjadi bukti hidup bahwa perbedaan adalah
            kekuatan, dan toleransi adalah warisan paling berharga.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {houses.map((h) => (
            <div key={h.name} className="bg-surface p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-gold">{h.name}</div>
              <p className="mt-3 font-serif text-2xl">{h.desc}</p>
            </div>
          ))}
        </div>

        <figure className="mx-auto mt-16 max-w-3xl text-center">
          <blockquote className="font-serif text-3xl italic md:text-4xl">
            “Damai dalam perbedaan, kuat dalam kebersamaan.”
          </blockquote>
          {/* <figcaption className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Filosofi Warga Kediri
          </figcaption> */}
        </figure>
      </div>
    </section>
  );
}
