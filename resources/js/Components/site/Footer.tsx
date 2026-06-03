const cols = [
  {
    title: "Pemerintahan",
    links: ["Profil Wali Kota", "Struktur OPD", "Visi & Misi", "Produk Hukum"],
  },
  {
    title: "Layanan",
    links: ["Lapor Mbak Wali", "Perizinan Online", "PPDB Kediri", "Pajak Daerah"],
  },
  {
    title: "Informasi",
    links: ["Berita Kota", "Agenda & Event", "Pengumuman", "Statistik Kota"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="container-page py-20">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-gradient-gold text-gold-foreground font-bold shadow-elegant">
                K
              </span>
              <div>
                <div className="text-base font-semibold">Pemerintah Kota Kediri</div>
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Harmoni, Maju, Berbudaya
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm text-muted-foreground">
              Jl. Basuki Rahmat No.15, Kota Kediri, Jawa Timur 64121
              <br />
              (0354) 682-621 · humas@kedirikota.go.id
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-xs uppercase tracking-[0.22em] text-gold">{c.title}</div>
                <ul className="mt-5 space-y-3 text-sm">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Pemerintah Kota Kediri. Hak cipta dilindungi.</span>
          <span className="font-serif italic text-gold">Damai dalam perbedaan, kuat dalam kebersamaan.</span>
        </div>
      </div>
    </footer>
  );
}
