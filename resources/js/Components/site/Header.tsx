import { useEffect, useState } from "react";

const nav = [
  { href: "#beranda", label: "Beranda" },
  { href: "#layanan", label: "Layanan" },
  { href: "#tentang", label: "Tentang" },
  { href: "#agenda", label: "Agenda" },
  { href: "#budaya", label: "Budaya" },
  { href: "#wisata", label: "Wisata" },
  { href: "#harmoni", label: "Harmoni" },
  { href: "#smart", label: "Smart City" },
  { href: "#berita", label: "Berita" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <a href="#beranda" className="flex items-center gap-3 group">
          <span className="grid size-11 place-items-center rounded-full bg-gradient-gold text-gold-foreground font-bold shadow-elegant">
            K
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">Kota Kediri</span>
            <span className={`block text-[10px] uppercase tracking-[0.22em] ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>
              Pemerintah Kota
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#layanan"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-glow"
        >
          Layanan Publik
        </a>
      </div>
    </header>
  );
}
