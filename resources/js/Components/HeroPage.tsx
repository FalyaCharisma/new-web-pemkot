import { Search, Home, ChevronRight } from "lucide-react";

interface FacilityHeroProps {
  title: string;
  description: string;
  placeholder?: string;
  breadcrumb?: string;
}

export function HeroPage({
  title,
  description,
  placeholder = "Cari informasi...",
  breadcrumb = "Fasilitas Kota",
}: FacilityHeroProps) {
  return (
    <section className="relative overflow-hidden border-b bg-primary/5">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div
          className="
            absolute inset-0 opacity-[0.07]
            bg-[linear-gradient(to_right,#0f766e_1px,transparent_1px),linear-gradient(to_bottom,#0f766e_1px,transparent_1px)]
            bg-[size:40px_40px]
          "
        />

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Home size={14} />

          <span>Beranda</span>

          <ChevronRight size={14} />

          <span className="font-medium text-slate-700">
            {breadcrumb}
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_500px] lg:items-center">
          <div>
            <h1 className="text-5xl font-bold text-slate-900">
              {title}
            </h1>

            <p className="mt-4 max-w-xl text-slate-600">
              {description}
            </p>
          </div>

          <div>
            <div className="flex overflow-hidden rounded-2xl border bg-white shadow-sm">
              <input
                type="text"
                placeholder={placeholder}
                className="flex-1 px-6 py-4 outline-none"
              />

              <button className="bg-primary px-6 text-white">
                <Search size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}