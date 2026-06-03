import {
  MessageSquare,
  FileText,
  Building2,
  HeartPulse,
  GraduationCap,
  Receipt,
  Activity,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const services = [
  { icon: MessageSquare, title: "Lapor Mbak Wali", desc: "Saluran aspirasi warga langsung ke Wali Kota." },
  { icon: FileText, title: "Administrasi Kependudukan", desc: "KTP, KK, akta lahir & layanan dukcapil." },
  { icon: Building2, title: "Perizinan Online", desc: "Urus izin usaha & perizinan satu pintu digital." },
  { icon: HeartPulse, title: "Kesehatan", desc: "Akses Puskesmas, BPJS, dan layanan rujukan." },
  { icon: GraduationCap, title: "Pendidikan", desc: "PPDB, beasiswa, dan portal sekolah Kediri." },
  { icon: Receipt, title: "Pajak Daerah", desc: "PBB, BPHTB, retribusi & e-pajak terintegrasi." },
  { icon: Activity, title: "Smart City Dashboard", desc: "Pantau data kota real-time & terbuka." },
  { icon: ShieldAlert, title: "Pengaduan Masyarakat", desc: "Sampaikan keluhan, awasi tindak lanjutnya." },
];

export function Services() {
  return (
    <section id="layanan" className="relative py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionLabel>Akses Cepat</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              Layanan publik dalam{" "}
              <span className="font-serif italic text-gold">satu sentuhan</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Semua layanan esensial Pemerintah Kota Kediri, tersedia 24/7
            untuk warga.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <a
              key={s.title}
              href="#"
              className="group relative flex flex-col gap-5 bg-surface p-7 transition-colors hover:bg-card"
            >
              <s.icon className="size-7 text-gold" strokeWidth={1.4} />
              <div>
                <h3 className="text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80">
                Buka layanan
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
