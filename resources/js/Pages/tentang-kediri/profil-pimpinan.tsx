import { useState } from "react";

interface Props {
    pimpinan: any[];
}

export default function ProfilPimpinan({ pimpinan }: Props) {
    const [selected, setSelected] = useState<any>(null);

    const formatTanggal = (tanggal: string | null) => {
        if (!tanggal) return "";

        return new Date(tanggal).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

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
                            <h3 className="text-xl font-bold text-[#0F3D3E]">
                                {item.nama_pimpinan}
                            </h3>

                            <p className="mt-2 font-medium text-[#D8A21D]">
                                {item.jabatan?.nama_jabatan}
                            </p>

                            <button
                                onClick={() => setSelected(item)}
                                className="block mt-4 w-full rounded-lg bg-[#0F5D58] py-3 font-medium text-white transition hover:bg-[#004F3B]"
                            >
                                Lihat Profil
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-xl">
                        {/* HEADER */}
                        <div className="flex items-center justify-between border-b p-5">
                            <div>
                                <h3 className="text-xl font-bold text-[#0F3D3E]">
                                    Profil Pimpinan
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Informasi Profil Pimpinan
                                </p>
                            </div>

                            <button
                                onClick={() => setSelected(null)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="max-h-[75vh] overflow-y-auto p-6">
                            {/* FOTO + IDENTITAS */}
                            <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
                                {/* FOTO */}
                                <div className="flex shrink-0 justify-center">
                                    <img
                                        src={`/storage/pimpinan/${selected.foto}`}
                                        alt={selected.nama_pimpinan}
                                        className="w-48 object-contain"
                                    />
                                </div>

                                {/* IDENTITAS */}
                                <div className="flex-1 max-w-lg">
                                    <div className="text-center">
                                        <h2 className="text-xl font-bold text-[#0F3D3E]">
                                            {selected.nama_pimpinan}
                                        </h2>

                                        <p className="mt-2 font-semibold text-[#D8A21D]">
                                            {selected.jabatan?.nama_jabatan}
                                        </p>

                                        <div className="mx-auto mt-4 h-0.5 w-8 bg-[#D8A21D]" />
                                    </div>

                                    {/* DATA SINGKAT */}
                                    <div className="mt-5 space-y-2 text-sm text-gray-700">
                                        {(selected.tempat_lahir ||
                                            selected.tanggal_lahir) && (
                                            <div className="grid grid-cols-[190px_12px_1fr] items-center gap-x-2">
                                                <span className="font-bold">
                                                    Tempat, Tanggal Lahir
                                                </span>

                                                <span>:</span>

                                                <span>
                                                    {selected.tempat_lahir}

                                                    {selected.tempat_lahir &&
                                                        selected.tanggal_lahir &&
                                                        ", "}

                                                    {formatTanggal(
                                                        selected.tanggal_lahir,
                                                    )}
                                                </span>
                                            </div>
                                        )}

                                        {selected.agama && (
                                            <div className="grid grid-cols-[190px_12px_1fr] items-center gap-x-2">
                                                <span className="font-bold">
                                                    Agama
                                                </span>

                                                <span>:</span>

                                                <span>{selected.agama}</span>
                                            </div>
                                        )}

                                        {selected.jenis_kelamin && (
                                            <div className="grid grid-cols-[190px_12px_1fr] items-center gap-x-2">
                                                <span className="font-bold">
                                                    Jenis Kelamin
                                                </span>

                                                <span>:</span>

                                                <span>
                                                    {selected.jenis_kelamin}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* DESKRIPSI */}
                            {selected.deskripsi && (
                                <div className="mt-6 border-t pt-6">
                                    <div
                                        className="detail-opd"
                                        dangerouslySetInnerHTML={{
                                            __html: selected.deskripsi,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
