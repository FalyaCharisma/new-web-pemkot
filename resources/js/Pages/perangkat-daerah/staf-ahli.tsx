import { useState } from "react";
import { Opd } from "@/types/opd";

export default function OpdGrid({ opd }: { opd: Opd[] }) {
    const [selected, setSelected] = useState<any>(null);

    return (
        <>
            <div className="grid md:grid-cols-2 gap-6">
                {opd.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-2xl p-5 bg-white h-full flex flex-col"
                    >
                        <div className="flex-1">
                            <h3 className="font-bold uppercase min-h-[48px]">
                                {item.nama}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                {item.alamat}
                            </p>
                        </div>

                        <div className="mt-4 flex gap-2">
                            {(item.website?.startsWith("http://") ||
                                item.website?.startsWith("https://")) && (
                                <a
                                    href={item.website}
                                    target="_blank"
                                    className="bg-teal-800 text-white px-3 py-2 rounded-md text-sm"
                                >
                                    Kunjungi Web
                                </a>
                            )}

                            <button
                                onClick={() => setSelected(item)}
                                className="bg-amber-500 px-3 py-2 rounded-md text-sm"
                            >
                                Selengkapnya
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}

            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-white rounded-3xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
                        {/* HEADER */}
                        <div className="flex justify-between items-center border-b p-5">
                            <h2 className="text-xl md:text-2xl font-bold uppercase">
                                {selected.nama}
                            </h2>

                            <button
                                onClick={() => setSelected(null)}
                                className="w-10 h-10 shrink-0 rounded-full bg-slate-100 hover:bg-slate-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="overflow-y-auto p-6 md:p-8 max-h-[75vh]">
                            {/* DATA PIMPINAN */}
                            {selected.pimpinan && (
                                <div className="border rounded-2xl p-5 md:p-6 mb-8">
                                    <h3 className="text-lg font-bold mb-5">
                                        Data Pimpinan
                                    </h3>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* FOTO */}
                                        <div className="shrink-0">
                                            <img
                                                src={
                                                    selected.pimpinan.foto
                                                        ? `/storage/pimpinan/${selected.pimpinan.foto}`
                                                        : "/assets/images/noimage.png"
                                                }
                                                alt={
                                                    selected.pimpinan
                                                        .nama_pimpinan
                                                }
                                                className="w-28 h-36 md:w-32 md:h-40 object-cover rounded-xl border"
                                            />
                                        </div>

                                        {/* DATA PIMPINAN */}
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold uppercase">
                                                {
                                                    selected.pimpinan
                                                        .nama_pimpinan
                                                }
                                            </h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                                {selected.pimpinan.nip && (
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            NIP
                                                        </p>

                                                        <p className="font-medium">
                                                            {
                                                                selected
                                                                    .pimpinan
                                                                    .nip
                                                            }
                                                        </p>
                                                    </div>
                                                )}

                                                {selected.pimpinan.pangkat && (
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Pangkat
                                                        </p>

                                                        <p className="font-medium">
                                                            {
                                                                selected
                                                                    .pimpinan
                                                                    .pangkat
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                                {selected.pimpinan
                                                    .gol_ruang && (
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Golongan / Ruang
                                                        </p>

                                                        <p className="font-medium">
                                                            {
                                                                selected
                                                                    .pimpinan
                                                                    .gol_ruang
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                                {selected.alamat && (
                                                    <div className="mb-5">
                                                        <p className="text-sm text-gray-500 mb-1">
                                                            Alamat Kantor
                                                        </p>

                                                        <p className="font-medium">
                                                            {selected.alamat}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TUPOKSI */}
                            {selected.detail_opd && (
                                <div className="pt-2">
                                    <h3 className="text-lg font-bold mb-5">
                                        Tugas Pokok dan Fungsi
                                    </h3>

                                    <div
                                        className="detail-opd max-w-[850px] mx-auto"
                                        dangerouslySetInnerHTML={{
                                            __html: selected.detail_opd,
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
