import { Opd } from "@/types/opd";
import { useState } from "react";

interface Props {
    opd: Opd[];
}

export default function KepalaDaerah({ opd }: Props) {
    const [selected, setSelected] = useState<any>(null);

    return (
        <>
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
                                className="relative z-10 h-[260px] object-contain"
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
                                <button
                                    onClick={() => setSelected(item.pimpinan)}
                                    className="block w-full rounded-lg bg-[#0F5D58] py-3 text-white font-medium transition hover:bg-[#004F3B]"
                                >
                                    Lihat Profil
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b p-5">
                            <h3 className="text-xl font-bold text-[#0F3D3E]">
                                Profil Pimpinan
                            </h3>

                            <button
                                onClick={() => setSelected(null)}
                                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <div className="grid md:grid-cols-[260px_1fr] gap-8">
                                {/* Foto */}
                                <div>
                                    <img
                                        src={`/storage/pimpinan/${selected.foto}`}
                                        alt={selected.nama_pimpinan}
                                        className="rounded-2xl w-full"
                                    />
                                </div>

                                {/* Detail */}
                                <div>
                                    <h2 className="text-xl font-bold text-[#0F3D3E]">
                                        {selected.nama_pimpinan}
                                    </h2>

                                    <p className="mt-2 text-[#D8A21D] font-semibold">
                                        {selected.jabatan?.nama_jabatan}
                                    </p>

                                    <div className="mt-6 prose max-w-none">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    selected.profil ??
                                                    selected.deskripsi ??
                                                    "-",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
