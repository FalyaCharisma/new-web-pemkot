import { Cpu, GraduationCap, Rocket, Users } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import smart from "@/assets/smart-city.jpg";

const pillars = [
  { icon: GraduationCap, title: "Smart Education", desc: "Sekolah terhubung, pembelajaran digital, dan kurikulum adaptif." },
  { icon: Cpu, title: "Transformasi Digital", desc: "Layanan kota berbasis data, IoT, dan AI yang inklusif." },
  { icon: Rocket, title: "Ekosistem Inovasi", desc: "Inkubator startup, coworking, dan riset kolaboratif." },
  { icon: Users, title: "Pemberdayaan Pemuda", desc: "Pelatihan, beasiswa, dan ruang kreatif untuk generasi muda." },
];

export function SmartCity() {
  return (
    <section id="smart" className="relative py-28">
      <div className="container-page grid gap-14 lg:grid-cols-2">
        <div>
          <SectionLabel>Smart City &amp; Education</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Membangun masa depan dari{" "}
            <span className="font-serif italic text-gold">ruang kelas</span> ke{" "}
            <span className="font-serif italic text-gold">ruang kota</span>
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground md:text-lg">
            Kota Kediri menjadikan pendidikan dan teknologi sebagai mesin
            pertumbuhan — menciptakan ekosistem yang siap melahirkan
            generasi cerdas, kreatif, dan berdaya saing global.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="bg-surface p-6">
                <p.icon className="size-6 text-gold" strokeWidth={1.4} />
                <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-elegant">
            <img
              src={smart}
              alt="Generasi muda Kediri belajar dengan teknologi"
              loading="lazy"
              width={1280}
              height={960}
              className="aspect-[4/5] size-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-card p-5 shadow-elegant">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Akses Digital
            </div>
            <div className="mt-1 font-serif text-4xl text-gold">98.4%</div>
            <div className="text-xs text-muted-foreground">Sekolah online</div>
          </div>
          <div className="absolute -right-4 top-8 rounded-2xl border border-border bg-card p-5 shadow-elegant">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Smart City Index
            </div>
            <div className="mt-1 font-serif text-4xl text-gold">A+</div>
            <div className="text-xs text-muted-foreground">Skor 2025</div>
          </div>
        </div>
      </div>
    </section>
  );
}
