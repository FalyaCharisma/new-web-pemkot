import { Search, Home, ChevronRight } from "lucide-react";
import cityline from "@/assets/cityline.png";
import { useState } from "react";

interface FacilityHeroProps {
    title: string;
    description: string;
    placeholder?: string;
    breadcrumb?: string;

    searchValue?: string;
    onSearch?: (value: string) => void;
}

export function HeroPage({
    title,
    description,
    placeholder = "Cari informasi...",
    breadcrumb = "Fasilitas Kota",
    searchValue = "",
    onSearch,
}: FacilityHeroProps) {
    const [keyword, setKeyword] = useState(searchValue);

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

            <div className="container relative z-10 mx-auto px-4 py-6">
                <div className="mt-4 mb-2 flex items-center gap-2 text-sm text-slate-500">
                    <Home size={14} />

                    <span>Beranda</span>

                    <ChevronRight size={14} />

                    <span className="font-medium text-slate-700">
                        {breadcrumb}
                    </span>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1fr_500px] lg:items-center">
                    <div>
                        <h1 className="text-5xl font-bold text-primary">
                            {title}
                        </h1>

                        <p className="mt-4 max-w-xl text-primary">
                            {description}
                        </p>
                        <div className="mt-6 max-w-xl">
                            <div className="flex overflow-hidden rounded-xl border bg-white shadow-sm">
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            onSearch?.(keyword);
                                        }
                                    }}
                                    placeholder={placeholder}
                                    className="flex-1 px-6 py-4 outline-none"
                                />

                                <button onClick={()=>onSearch?.(keyword)} className="m-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden lg:flex items-center justify-end">
                        <div className="hidden lg:flex items-end justify-end">
                            <img
                                src={cityline}
                                alt="Cityline Kediri"
                                className="max-h-[380px] w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
