import { Link } from "@inertiajs/react";

interface Props {
    pimpinan: any[];
}

export default function ProfilPimpinan({
    pimpinan,
}: Props) {
    return (
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
                        <p className="mt-2 text-[#D8A21D] font-medium">
                            {item.jabatan?.nama_jabatan}
                        </p>

                        <Link
                            href={`/profil-pimpinan/${item.id}`}
                            className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 font-small text-white"
                        >
                            Lihat Profil
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}