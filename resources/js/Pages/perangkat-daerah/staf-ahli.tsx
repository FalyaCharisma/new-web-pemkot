import { Opd } from "@/types/opd";

export default function OpdGrid({
    opd,
}: {
    opd: Opd[];
}) {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {opd.map((item) => (
                <div
                    key={item.id}
                    className="border rounded-2xl p-5"
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

                        <div>
                            <h3 className="font-bold">
                                {item.nama}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {item.alamat}
                            </p>

                            <div className="mt-4 flex gap-2">
                                {item.website && (
                                    <a
                                        href={item.website}
                                        target="_blank"
                                        className="bg-teal-800 text-white px-3 py-2 rounded-lg"
                                    >
                                        Kunjungi Web
                                    </a>
                                )}

                                <a
                                    href={`/detail-opd/${item.id}`}
                                    className="bg-amber-500 px-3 py-2 rounded-lg"
                                >
                                    Selengkapnya
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}