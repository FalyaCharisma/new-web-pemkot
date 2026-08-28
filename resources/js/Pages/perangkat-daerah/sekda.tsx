import { Opd } from "@/types/opd";

export default function SekretarisDaerah({ opd }: { opd: Opd[] }) {
    const data = opd[0];

    if (!data?.pimpinan) return null;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Profile */}
            <div className="flex flex-col items-center">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <img
                        src={`/storage/pimpinan/${data.pimpinan.foto}`}
                        alt={data.pimpinan.nama_pimpinan}
                        className="w-[320px] h-[320px] object-cover"
                    />
                </div>

                <h2 className="mt-6 text-xl font-bold text-[#0F3D3E] text-center">
                    {data.pimpinan.nama_pimpinan}
                </h2>

                {data.pimpinan.jabatan?.nama_jabatan && (
                    <p className="mt-2 font-medium text-[#D8A21D]">
                        {data.pimpinan.jabatan.nama_jabatan}
                    </p>
                )}
            </div>

            {/* Deskripsi */}
            {data.pimpinan.deskripsi && (
                <div className="mt-6">
                    <div
                        className="detail-opd max-w-[850px] mx-auto"
                        dangerouslySetInnerHTML={{
                            __html: data.pimpinan.deskripsi,
                        }}
                    />
                </div>
            )}
        </div>
    );
}
