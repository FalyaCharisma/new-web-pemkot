import { useState } from "react";

interface Props {
    pimpinan: any[];
}

export default function ProfilPimpinan({ pimpinan }: Props) {
    const [selected, setSelected] = useState<any>(null);

    return (
        <>
            <div className="grid gap-8 md:grid-cols-2">
                {pimpinan.map((item) => (
                    <div
                        key={item.id}
                        className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="bg-gradient-to-b from-primary/10 to-white pt-8">
                            <div className="flex justify-center">
                                <img
                                    src={`/storage/pimpinan/${item.foto}`}
                                    alt={item.nama_pimpinan}
                                    className="h-[340px] object-contain"
                                />
                            </div>
                        </div>

                        <div className="border-t p-6 text-center">
                            <h3 className="text-xl font-bold text-slate-800">
                                {item.nama_pimpinan}
                            </h3>

                            <p className="mt-2 font-medium text-[#D8A21D]">
                                {item.jabatan?.nama_jabatan}
                            </p>

                            <button
                                onClick={() => setSelected(item)}
                                className="block mt-4 w-full rounded-lg bg-[#0F5D58] py-3 text-white font-medium transition hover:bg-[#004F3B]"
                            >
                                Lihat Profil
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-xl">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b p-5">
                            <h3 className="text-xl font-bold text-[#0F3D3E]">
                                Profil Pimpinan
                            </h3>

                            <button
                                onClick={() => setSelected(null)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8">
                            <div className="grid gap-8 md:grid-cols-[280px_1fr]">
                                {/* Foto */}
                                <div>
                                    <img
                                        src={`/storage/pimpinan/${selected.foto}`}
                                        alt={selected.nama_pimpinan}
                                        className="w-full rounded-2xl"
                                    />
                                </div>

                                {/* Detail */}
                                <div>
                                    <h2 className="text-3xl font-bold text-[#0F3D3E]">
                                        {selected.nama_pimpinan}
                                    </h2>

                                    <p className="mt-2 text-lg font-medium text-[#D8A21D]">
                                        {selected.jabatan?.nama_jabatan}
                                    </p>

                                    <div className="prose mt-6 max-w-none">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    selected.profil ??
                                                    selected.deskripsi ??
                                                    selected.biografi ??
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
