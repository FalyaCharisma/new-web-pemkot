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
                        className="border rounded-2xl p-5 bg-white"
                    >
                        <div className="flex gap-4">
                            <img
                                src={
                                    item.logo
                                        ? `/storage/opd/${item.logo}`
                                        : "/logo.png"
                                }
                                className="w-14 h-14"
                            />

                            <div className="flex-1">
                                <h3 className="font-bold">{item.nama}</h3>

                                <p className="text-sm text-gray-500">
                                    {item.alamat}
                                </p>

                                <div className="mt-4 flex gap-2">
                                    {(item.website?.startsWith("http://") ||
                                        item.website?.startsWith(
                                            "https://",
                                        )) && (
                                        <a
                                            href={item.website}
                                            target="_blank"
                                            className="bg-teal-800 text-white px-3 py-2 rounded-lg"
                                        >
                                            Kunjungi Web
                                        </a>
                                    )}

                                    <button
                                        onClick={() => setSelected(item)}
                                        className="bg-amber-500 px-3 py-2 rounded-lg"
                                    >
                                        Selengkapnya
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}

            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-white rounded-3xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
                        {/* Header */}

                        <div className="flex justify-between items-center border-b p-5">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {selected.nama}
                                </h2>
                            </div>

                            <button
                                onClick={() => setSelected(null)}
                                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* BODY */}

                        <div className="overflow-y-auto p-8 max-h-[75vh]">
                           
                            <div className="prose prose-slate max-w-none mt-8">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: selected.detail_opd ?? "",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
