import { useState } from "react";
import {
  ChevronDown,
  Search,
  Menu,
  X,
  Info,
  Building2,
  Network,
  Map,
  Trophy,
  Newspaper,
  Megaphone,
  Images,
  Video,
  BarChart3,
  FileText,
} from "lucide-react";

import stroke from "@/assets/logo-pemkot-stroke.png";

const navigation = [
  {
    title: "Mengenal Kediri",
    children: [
      {
        title: "Pesona Kediri Raya",
        description:
          "Jelajahi kekayaan budaya, kuliner khas, ekonomi kreatif, dan berbagai warisan yang menjadi kebanggaan Kediri Raya.",
        icon: Search,
        href: route('pesona-kediri.index'),
      },
      {
        title: "Tentang Kediri",
        description:
          "Gambaran umum tentang Kota Kediri termasuk sejarah, visi & misi serta profil pemimpinnya.",
        icon: Info,
        href: "#",
      },
      {
        title: "Fasilitas Kota",
        description:
          "Berbagai sarana dan prasarana yang ada di Kota Kediri.",
        icon: Building2,
        href: route('fasilitas-kota.index'),
      },
      {
        title: "Perangkat Daerah",
        description:
          "Struktur dan tugas perangkat daerah yang mendukung pelayanan publik.",
        icon: Network,
        href: "#",
      },
      {
        title: "Kelurahan",
        description:
          "Informasi tentang pembagian wilayah kelurahan di Kota Kediri.",
        icon: Map,
        href: "#",
      },
      {
        title: "Penghargaan",
        description:
          "Prestasi dan penghargaan yang telah diraih oleh Kota Kediri.",
        icon: Trophy,
        href: "#",
      },
    ],
  },
  {
    title: "Pusat Media & Informasi",
    children: [
      {
        title: "Berita & Pengumuman",
        description:
          "Berita terkini mengenai berbagai aktivitas dan program Kota Kediri.",
        icon: Newspaper,
        href: route('berita.index'),
      },
      {
        title: "Agenda",
        description:
          "Informasi penting yang perlu diketahui masyarakat.",
        icon: Megaphone,
        href: "#",
      },
      {
        title: "Galeri",
        description:
          "Koleksi foto dan vidio yang menggambarkan aktivitas dan keindahan Kota Kediri.",
        icon: Images,
        href: "#",
      },
      {
        title: "Satu Data",
        description:
          "Portal satu data Pemerintah Kota Kediri.",
        icon: BarChart3,
        href: "#",
      },
      {
        title: "Dokumen",
        description:
          "Dokumen berisi berbagai laporan dan regulasi Pemerintah Kota Kediri.",
        icon: FileText,
        href: "#",
      },
    ],
  },
  {
    title: "Layanan Publik",
    href: "#",
  },
  {
    title: "PPID",
    href: "#",
  },
];

export function HeaderSolid() {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        bg-white/95 backdrop-blur-md
        border-b border-slate-200
        shadow-sm
      "
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="rounded-md bg-white px-2 py-1">
            <img
              src={stroke}
              alt="Logo"
              className="h-10 w-auto"
            />
          </div>
        </a>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.title} className="group">
                <button
                  className="
                    flex items-center gap-1
                    text-sm font-medium
                    text-slate-700
                    transition-colors
                    hover:text-primary
                  "
                >
                  {item.title}

                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </button>

                <div
                  className="
                    invisible
                    absolute
                    left-1/2
                    top-full
                    z-50
                    mt-3
                    w-[1000px]
                    max-w-[90vw]
                    -translate-x-1/2
                    rounded-2xl
                    border
                    border-primary/10
                    bg-[#F7FAFB]
                    p-6
                    opacity-0
                    shadow-xl
                    transition-all
                    duration-200
                    group-hover:visible
                    group-hover:opacity-100
                  "
                >
                  <div className="container-page py-5">
                    <div className="grid grid-cols-3 gap-x-8 gap-y-3">
                      {item.children.map((child) => {
                        const Icon = child.icon;

                        return (
                          <a
                            key={child.title}
                            href={child.href}
                            className="
                              flex items-start gap-4
                              rounded-xl p-3
                              transition-all
                              hover:bg-white
                              hover:shadow-sm
                            "
                          >
                            <div className="mt-1">
                              <Icon
                                size={24}
                                className="text-primary"
                              />
                            </div>

                            <div>
                              <h4 className="font-semibold text-base text-primary">
                                {child.title}
                              </h4>

                              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                {child.description}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.title}
                href={item.href}
                className="
                  text-sm font-medium
                  text-slate-700
                  transition-colors
                  hover:text-primary
                "
              >
                {item.title}
              </a>
            )
          )}

          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 shadow-lg">
                <Search size={16} className="text-slate-500" />

                <input
                  autoFocus
                  type="text"
                  placeholder="Cari..."
                  className="ml-2 w-64 bg-transparent text-sm outline-none"
                />

                <button
                  onClick={() => setShowSearch(false)}
                  className="ml-2 text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-primary text-white
                  transition-all
                  hover:opacity-90
                "
              >
                <Search size={18} />
              </button>
            )}
          </div>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg">
          <div className="container-page py-4">
            {navigation.map((item) => (
              <div
                key={item.title}
                className="border-b border-slate-100 py-3"
              >
                <div className="font-semibold text-slate-800">
                  {item.title}
                </div>

                {item.children && (
                  <div className="mt-2 ml-3 space-y-2">
                    {item.children.map((child) => (
                      <a
                        key={child.title}
                        href={child.href}
                        className="block text-sm text-slate-600 hover:text-primary"
                      >
                        {child.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}