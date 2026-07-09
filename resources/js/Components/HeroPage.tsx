import { FormEvent, useState } from "react";
import { Search, Home, ChevronRight } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

interface FacilityHeroProps {
    title: string;
    description: string;
    placeholder?: string;
    breadcrumb?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onSearch?: (keyword: string) => void;
    enableSearch?: boolean;
}

export function HeroPage({
    title,
    description,
    placeholder = "Cari informasi...",
    breadcrumb = "Fasilitas Kota",
    searchValue,
    enableSearch = true,
    onSearchChange,
    onSearch,
}: FacilityHeroProps) {
    const { menuHero } = usePage().props as any;
    const [internalSearchValue, setInternalSearchValue] = useState("");

    const isControlled = searchValue !== undefined;
    const currentSearchValue = isControlled ? searchValue : internalSearchValue;

    const handleSearchChange = (value: string) => {
        if (!isControlled) {
            setInternalSearchValue(value);
        }

        onSearchChange?.(value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch?.(currentSearchValue);
    };

    return (
        <section className="relative overflow-hidden border-b bg-primary/5">
            <div className="absolute inset-0">
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
                <div className="mt-4 mb-2 flex items-center gap-2 text-sm">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-slate-500 transition-colors hover:text-primary"
                    >
                        <Home size={14} />
                        <span>Beranda</span>
                    </Link>

                    <ChevronRight size={14} className="text-slate-400" />

                    <span className="font-medium text-slate-700">
                        {breadcrumb}
                    </span>
                </div>

                <div className="grid gap-10 pt-8 lg:pt-0 lg:grid-cols-[1fr_500px] lg:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
                            {title}
                        </h1>

                        <p className="mt-4 max-w-xl text-sm text-primary sm:text-base">
                            {description}
                        </p>

                        {enableSearch && (
                            <form
                                onSubmit={handleSubmit}
                                className="mt-6 max-w-xl"
                            >
                                <div className="flex overflow-hidden rounded-xl border bg-white shadow-sm">
                                    <input
                                        type="search"
                                        value={currentSearchValue}
                                        onChange={(event) =>
                                            handleSearchChange(
                                                event.target.value,
                                            )
                                        }
                                        placeholder={placeholder}
                                        aria-label={placeholder}
                                        className="flex-1 px-6 py-4 outline-none"
                                    />

                                    <button
                                        type="submit"
                                        aria-label="Cari fasilitas"
                                        className="m-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white transition hover:opacity-90"
                                    >
                                        <Search size={18} />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="relative hidden lg:flex items-center justify-end">
                        <div className="hidden lg:flex items-end justify-end">
                            <img
                                src={menuHero ?? "/assets/cityline.png"}
                                alt={title}
                                className="max-h-[380px] w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
