import {
    Users,
    Building2,
    Map,
    GraduationCap,
    ChartNoAxesCombined,
} from "lucide-react";

const stats = [
    {
        value: "285.000+",
        label: "Penduduk",
        icon: Users,
    },
    {
        value: "27",
        label: "Kelurahan",
        icon: Building2,
    },
    {
        value: "5",
        label: "Kecamatan",
        icon: Map,
    },
    {
        value: "98,4%",
        label: "Angka Melek Huruf",
        icon: GraduationCap,
    },
    {
        value: "1,2 Juta+",
        label: "Kunjungan Website / bln",
        icon: ChartNoAxesCombined,
    },
];

export function Statistik() {
    return (
      <section className="py-10">
    <div className="container-page">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#003f3b] via-[#00524d] to-[#004842] shadow-xl">

            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

            <div className="relative flex flex-col lg:flex-row lg:items-center">
                
                {/* Title */}
                <div className="px-8 py-8 lg:min-w-[260px]">
                    <h2 className="text-3xl font-bold text-white">
                        Kediri dalam angka
                    </h2>
                </div>

                {/* Stats */}
                <div className="flex flex-1 flex-wrap lg:flex-nowrap">
                    {stats.map((item, index) => (
                        <div
                            key={item.label}
                            className="flex flex-1 items-center gap-4 px-6 py-8"
                        >
                            {index !== 0 && (
                                <div className="hidden lg:block h-14 w-px bg-white/15" />
                            )}

                            <item.icon
                                className="size-10 shrink-0 text-gold"
                                strokeWidth={1.8}
                            />

                            <div>
                                <div className="text-4xl font-bold leading-none text-white">
                                    {item.value}
                                </div>

                                <div className="mt-2 text-sm text-white/80">
                                    {item.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
</section>
    );
}