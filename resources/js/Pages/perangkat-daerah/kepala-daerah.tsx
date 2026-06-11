import { Link } from "@inertiajs/react";
import { Opd } from "@/types/opd";

interface Props {
    opd: Opd[];
}

export default function KepalaDaerah({ opd }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opd.map((item) => (
                <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition hover:shadow-lg"
                >
                    {/* FOTO */}
                    <div className="relative flex justify-center pt-8 bg-slate-50">
                        <div className="absolute w-56 h-56 rounded-full bg-emerald-50 top-10" />

                        <img
                            src={`/storage/pimpinan/${item.pimpinan?.foto}`}
                            alt={item.pimpinan?.nama_pimpinan}
                            className="relative z-10 h-[320px] object-contain"
                        />
                    </div>

                    {/* INFO */}
                    <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-[#0F3D3E]">
                            {item.pimpinan?.nama_pimpinan}
                        </h3>

                        <p className="mt-2 text-[#D8A21D] font-medium">
                            {item.pimpinan?.jabatan?.nama_jabatan}
                        </p>

                        <div className="mt-6">
                            <Link
                                href={`/profil-pimpinan/${item.pimpinan?.id}`}
                                className="
            block rounded-lg
            w-full
            bg-[#0F5D58]
            text-white
            text-center
            py-3
            font-medium
            transition
            hover:bg-[#004F3B]
        "
                            >
                                Lihat Profil
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
