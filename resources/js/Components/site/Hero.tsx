import { ArrowRight, Compass } from "lucide-react";
import hero from "@/assets/hero2.png";

export function Hero() {
  return (
    <section id="beranda" className="relative min-h-[100svh] overflow-hidden">
      <img
        src={hero}
        alt="Simpang Lima Gumul, ikon Kota Kediri saat senja"
        width={1920}
        height={1280}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grain" />

      <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-16 pt-40 md:justify-center md:pt-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            <span className="size-1.5 rounded-full bg-gold" />
            Portal Resmi · Pemerintah Kota Kediri
          </div>

          <h1 className="mt-8 text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl lg:text-[88px]">
            Kota Kediri <span className="text-gold italic">Mapan</span>
          </h1>
          <h5 className="mt-6 text-lg font-medium uppercase tracking-[0.18em] text-white/80">
            Ngangeni dalam Kenangan, Maju dalam Perjalanan
          </h5>

          <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
            Tata kelola pemerintahan yang modern, masyarakat yang produktif, lingkungan yang aman, serta kehidupan yang berlandaskan nilai budaya dan religiusitas.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#wisata"
              className="inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-all hover:gap-4"
            >
              <Compass className="size-4" />
              Jelajahi Kota Kediri
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#layanan"
              className="inline-flex items-center gap-3 rounded-full bg-primary/90 px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary"
            >
              Layanan Publik
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/20 pt-8 text-xs uppercase tracking-[0.22em] text-white/60 md:flex md:flex-wrap md:items-center md:gap-x-12">
          {/* <span className="text-white">Simpang Lima Gumul</span> */}
          <span>Wisata Kota</span>
          <span>Budaya &amp; Festival</span>
          <span>Pendidikan &amp; Smart City</span>
          <span className="ml-auto hidden md:inline">Scroll ↓</span>
        </div>
      </div>
    </section>
  );
}
