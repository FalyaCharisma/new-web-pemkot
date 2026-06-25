import {
    MapPinned,
    Building2,
    Users,
    UserRound,
    UserRoundCheck,
} from "lucide-react";

interface SekilasKota {
    id: number;
    title: string;
    deskripsi: string;
    gambar: string | null;
}

interface Statistik {
    kecamatan: number;
    kelurahan: number;
    luas_wilayah: string;
    laki_laki: string;
    perempuan: string;
}

interface Kecamatan {
    id: number;
    nama: string;
    jumlah_kelurahan: number;
}

interface Geografis {
    id: number;
    deskripsi: string;
}

interface Props {
    sekilas: SekilasKota;
    statistik: Statistik;
    kecamatan: Kecamatan[];
    geografis: Geografis[];
}

export default function Sekilas({
    sekilas,
    statistik,
    kecamatan,
    geografis,
}: Props) {
    const formatNumber = (value: string | number) => {
        return Number(value).toLocaleString("id-ID");
    };

    const jumlahPenduduk =
        Number(statistik.laki_laki) + Number(statistik.perempuan);

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-3xl font-bold">Sekilas Tentang Kediri</h2>

                <div className="mt-3 h-1 w-20 rounded-full bg-primary" />
            </div>

            {/* Profil */}

            <div className="grid gap-8 lg:grid-cols-2">
                <div>
                    <img
                        src={sekilas.gambar ?? "/noimage.png"}
                        alt="Sekilas Kota Kediri"
                        className="h-full w-full rounded-3xl object-cover shadow-md"
                    />
                </div>

                <div className="space-y-4">
                    <div
                        className="prose max-w-none text-slate-600"
                        dangerouslySetInnerHTML={{
                            __html: sekilas.deskripsi,
                        }}
                    />

                    {geografis.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                            <MapPinned size={20} className="text-primary" />

                            <span>{item.deskripsi}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Luas */}

            <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
                <div className="p-8">
                    <h2 className="text-center text-4xl font-bold">
                        {formatNumber(statistik.luas_wilayah)} km²
                    </h2>

                    <p className="mt-2 text-center text-slate-500">
                        Luas wilayah administratif
                    </p>
                </div>

                <div className="grid grid-cols-2 border-t bg-slate-50">
                    <div className="p-3 text-center">
                        <h3 className="text-3xl font-bold text-primary">
                            {statistik.kecamatan}
                        </h3>

                        <p>Kecamatan</p>
                    </div>

                    <div className="border-l p-3 text-center">
                        <h3 className="text-3xl font-bold text-primary">
                            {statistik.kelurahan}
                        </h3>

                        <p>Kelurahan</p>
                    </div>
                </div>
            </div>

            {/* Kecamatan */}

            <div className="grid gap-4 md:grid-cols-3">
                {kecamatan.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-2xl border bg-white p-6 text-center shadow-sm"
                    >
                        <Building2
                            size={36}
                            className="mx-auto mb-3 text-primary"
                        />

                        <h3 className="font-semibold">Kecamatan {item.nama}</h3>

                        <p className="mt-2 text-slate-500">
                            {item.jumlah_kelurahan} Kelurahan
                        </p>
                    </div>
                ))}
            </div>

            {/* Statistik */}

            <div className="rounded-3xl border bg-white p-8">
                <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold">Statistik Penduduk</h3>

                    <p className="mt-2 text-slate-500">
                        Berdasarkan data kependudukan Kota Kediri
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-6 text-center">
                        <Users
                            size={42}
                            className="mx-auto mb-4 text-primary"
                        />

                        <h4 className="text-3xl font-bold text-primary">
                            {formatNumber(jumlahPenduduk)}
                        </h4>

                        <p className="mt-2 text-slate-500">Total Penduduk</p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-6 text-center">
                        <UserRound
                            size={42}
                            className="mx-auto mb-4 text-primary"
                        />

                        <h4 className="text-3xl font-bold text-primary">
                            {formatNumber(statistik.laki_laki)}
                        </h4>

                        <p className="mt-2 text-slate-500">Laki-laki</p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-6 text-center">
                        <UserRoundCheck
                            size={42}
                            className="mx-auto mb-4 text-primary"
                        />

                        <h4 className="text-3xl font-bold text-primary">
                            {formatNumber(statistik.perempuan)}
                        </h4>

                        <p className="mt-2 text-slate-500">Perempuan</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
