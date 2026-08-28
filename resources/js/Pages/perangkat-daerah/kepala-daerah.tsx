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

            {/* MODAL */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
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
                                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="overflow-y-auto p-6 max-h-[75vh]">
                            {/* FOTO + IDENTITAS */}
                            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                                {/* FOTO */}
                                <div className="flex justify-center shrink-0">
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

                                        <p className="mt-2 text-[#D8A21D] font-semibold">
                                            {selected.jabatan?.nama_jabatan}
                                        </p>

                                        <div className="w-8 h-0.5 bg-[#D8A21D] mx-auto mt-4" />
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

                                                    {selected.tanggal_lahir
                                                        ? new Date(
                                                              selected.tanggal_lahir,
                                                          ).toLocaleDateString(
                                                              "id-ID",
                                                              {
                                                                  day: "2-digit",
                                                                  month: "long",
                                                                  year: "numeric",
                                                              },
                                                          )
                                                        : ""}
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
