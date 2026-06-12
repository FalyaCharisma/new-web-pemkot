import {
MapPinned,
Building2,
Users,
UserRound,
UserRoundCheck,
} from "lucide-react";

interface Props {
data: any;
statistik: any;
}

export default function Sekilas({ data, statistik }: Props) {
return (
<div className="space-y-10">
    {/* Header */}
    <div>
        <h2 className="text-3xl font-bold">Sekilas Tentang Kediri</h2>

        <div className="mt-3 h-1 w-20 rounded-full bg-primary" />
    </div>

    {/* Profil */}
    <div className="grid gap-8 lg:grid-cols-2">
        <div>
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VkaXJpfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                alt="Kota Kediri" className="h-full w-full rounded-3xl object-cover shadow-md" />
        </div>

        <div>

            <div className="mt-6 space-y-3">
                <div className="prose max-w-none text-slate-600">
                    Kota Kediri adalah kota yang terletak di Provinsi Jawa Timur dan dikenal sebagai pusat perdagangan,
                    jasa, pendidikan, serta industri. Didukung oleh potensi ekonomi yang kuat, kekayaan sejarah dan
                    budaya, serta pembangunan yang berkelanjutan, Kota Kediri terus berkembang menjadi kota yang maju,
                    nyaman, dan berdaya saing. Melalui semangat MAPAN (Maju, Agamis, Produktif, Aman, dan Ngangeni),
                    Kota Kediri berkomitmen mewujudkan kesejahteraan masyarakat dan kualitas hidup yang lebih baik.
                </div>
                <div className="flex items-center gap-3">
                    <MapPinned size={20} className="text-primary" />
                    <span>Posisi antara 111°05' - 112°03' BT</span>
                </div>

                <div className="flex items-center gap-3">
                    <MapPinned size={20} className="text-primary" />
                    <span>Posisi antara 7°45' - 7°55' LS</span>
                </div>

                <div className="flex items-center gap-3">
                    <MapPinned size={20} className="text-primary" />
                    <span>Ketinggian rata-rata 67 Mdpl</span>
                </div>

                <div className="flex items-center gap-3">
                    <MapPinned size={20} className="text-primary" />
                    <span>Tingkat kemiringan 0 - 40%</span>
                </div>
            </div>
        </div>
    </div>

    {/* Luas Wilayah */}
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        <div className="p-8">
            <h2 className=" text-4xl text-center font-bold">
                63,40 km²
            </h2>

            <p className="mt-2 text-slate-500 text-center">
                Luas wilayah administratif
            </p>
        </div>

        <div className="grid grid-cols-2 border-t bg-slate-50">
            <div className="p-2 text-center">
                <h3 className="text-3xl font-bold text-primary">
                    3
                </h3>

                <p>Kecamatan</p>
            </div>

            <div className="border-l p-2 text-center">
                <h3 className="text-3xl font-bold text-primary">
                    46
                </h3>

                <p>Kelurahan</p>
            </div>
        </div>
    </div>

    {/* Kecamatan */}
    <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <Building2 size={36} className="mx-auto mb-3 text-primary" />

            <h3 className="font-semibold">Kecamatan Mojoroto</h3>

            <p className="mt-2 text-slate-500">14 Kelurahan</p>
        </div>

        <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <Building2 size={36} className="mx-auto mb-3 text-primary" />

            <h3 className="font-semibold">Kecamatan Kota</h3>

            <p className="mt-2 text-slate-500">17 Kelurahan</p>
        </div>

        <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
            <Building2 size={36} className="mx-auto mb-3 text-primary" />

            <h3 className="font-semibold">Kecamatan Pesantren</h3>

            <p className="mt-2 text-slate-500">15 Kelurahan</p>
        </div>
    </div>

    {/* Statistik Penduduk */}
    <div className="rounded-3xl border bg-white p-8">
        <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold">Statistik Penduduk</h3>

            <p className="mt-2 text-slate-500">
                Berdasarkan data kependudukan Kota Kediri
            </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-6 text-center">
                <Users size={42} className="mx-auto mb-4 text-primary" />

                <h4 className="text-3xl font-bold text-primary">
                    {statistik.jumlah_penduduk}
                </h4>

                <p className="mt-2 text-slate-500">Total Penduduk</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 text-center">
                <UserRound size={42} className="mx-auto mb-4 text-primary" />

                <h4 className="text-3xl font-bold text-primary">
                    {statistik.laki_laki}
                </h4>

                <p className="mt-2 text-slate-500">Laki-laki</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 text-center">
                <UserRoundCheck size={42} className="mx-auto mb-4 text-primary" />

                <h4 className="text-3xl font-bold text-primary">
                    {statistik.perempuan}
                </h4>

                <p className="mt-2 text-slate-500">Perempuan</p>
            </div>
        </div>
    </div>
</div>
);
}
