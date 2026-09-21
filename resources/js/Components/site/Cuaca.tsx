import { useEffect, useState } from "react";

interface Kecamatan {
    kd_kecamatan: string;
    nm_kecamatan: string;
}

interface Kelurahan {
    kd_kelurahan: string;
    nm_kelurahan: string;
}

interface CuacaData {
    lokasi: {
        provinsi: string;
        kotkab: string;
        kecamatan: string;
        desa: string;
    };
    cuaca: {
        weather_desc: string;
        weather_desc_en: string;
        image: string;
        local_datetime: string;
        t: number;
        hu: number;
        ws: number;
        wd: string;
        vs_text: string;
    };
}

export default function Cuaca() {
    const [kecamatan, setKecamatan] = useState<Kecamatan[]>([]);
    const [kelurahan, setKelurahan] = useState<Kelurahan[]>([]);

    const [selectedKecamatan, setSelectedKecamatan] = useState("");
    const [selectedKelurahan, setSelectedKelurahan] = useState("");

    const [cuaca, setCuaca] = useState<CuacaData | null>(null);

    const [loadingKecamatan, setLoadingKecamatan] = useState(false);
    const [loadingKelurahan, setLoadingKelurahan] = useState(false);
    const [loadingCuaca, setLoadingCuaca] = useState(false);

    // =========================
    // AMBIL KECAMATAN
    // =========================
    useEffect(() => {
        const getKecamatan = async () => {
            try {
                setLoadingKecamatan(true);

                const response = await fetch("/api/cuaca/kecamatan");
                const data = await response.json();

                setKecamatan(data);
            } catch (error) {
                console.error("Gagal mengambil kecamatan:", error);
            } finally {
                setLoadingKecamatan(false);
            }
        };

        getKecamatan();
    }, []);

    // =========================
    // AMBIL KELURAHAN
    // =========================
    useEffect(() => {
        if (!selectedKecamatan) {
            setKelurahan([]);
            setSelectedKelurahan("");
            setCuaca(null);
            return;
        }

        const getKelurahan = async () => {
            try {
                setLoadingKelurahan(true);

                const response = await fetch(
                    `/api/cuaca/kelurahan/${selectedKecamatan}`
                );

                const data = await response.json();

                setKelurahan(data);
                setSelectedKelurahan("");
                setCuaca(null);
            } catch (error) {
                console.error("Gagal mengambil kelurahan:", error);
            } finally {
                setLoadingKelurahan(false);
            }
        };

        getKelurahan();
    }, [selectedKecamatan]);

    // =========================
    // AMBIL CUACA
    // =========================
    useEffect(() => {
        if (!selectedKelurahan) {
            setCuaca(null);
            return;
        }

        const getCuaca = async () => {
            try {
                setLoadingCuaca(true);

                const response = await fetch(
                    `/api/cuaca?kd_kelurahan=${selectedKelurahan}`
                );

                const data = await response.json();

                setCuaca(data.data);
            } catch (error) {
                console.error("Gagal mengambil cuaca:", error);
                setCuaca(null);
            } finally {
                setLoadingCuaca(false);
            }
        };

        getCuaca();
    }, [selectedKelurahan]);

    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-lg">

                    {/* HEADER */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            🌤️ Cuaca Kota Kediri
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Pilih wilayah untuk melihat kondisi cuaca terkini.
                        </p>
                    </div>

                    {/* FILTER */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        {/* KECAMATAN */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Kecamatan
                            </label>

                            <select
                                value={selectedKecamatan}
                                onChange={(e) =>
                                    setSelectedKecamatan(e.target.value)
                                }
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            >
                                <option value="">
                                    {loadingKecamatan
                                        ? "Memuat kecamatan..."
                                        : "Pilih Kecamatan"}
                                </option>

                                {kecamatan.map((item) => (
                                    <option
                                        key={item.kd_kecamatan}
                                        value={item.kd_kecamatan}
                                    >
                                        {item.nm_kecamatan}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* KELURAHAN */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Kelurahan
                            </label>

                            <select
                                value={selectedKelurahan}
                                disabled={!selectedKecamatan || loadingKelurahan}
                                onChange={(e) =>
                                    setSelectedKelurahan(e.target.value)
                                }
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-gray-100"
                            >
                                <option value="">
                                    {loadingKelurahan
                                        ? "Memuat kelurahan..."
                                        : "Pilih Kelurahan"}
                                </option>

                                {kelurahan.map((item) => (
                                    <option
                                        key={item.kd_kelurahan}
                                        value={item.kd_kelurahan}
                                    >
                                        {item.nm_kelurahan}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* LOADING CUACA */}
                    {loadingCuaca && (
                        <div className="mt-8 text-center text-gray-500">
                            Memuat data cuaca...
                        </div>
                    )}

                    {/* HASIL CUACA */}
                    {cuaca && !loadingCuaca && (
                        <div className="mt-8">

                            <div className="rounded-2xl bg-gray-50 p-6">

                                {/* LOKASI */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {cuaca.lokasi.desa}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {cuaca.lokasi.kecamatan},{" "}
                                        {cuaca.lokasi.kotkab}
                                    </p>
                                </div>

                                {/* KONDISI */}
                                <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-between">

                                    <div className="flex items-center gap-4">

                                        <img
                                            src={cuaca.cuaca.image}
                                            alt={cuaca.cuaca.weather_desc}
                                            className="h-20 w-20"
                                        />

                                        <div>
                                            <div className="text-4xl font-bold text-gray-800">
                                                {cuaca.cuaca.t}°C
                                            </div>

                                            <div className="text-lg text-gray-600">
                                                {cuaca.cuaca.weather_desc}
                                            </div>
                                        </div>

                                    </div>

                                    {/* DETAIL */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">

                                        <div>
                                            <div className="text-gray-400">
                                                Kelembapan
                                            </div>

                                            <div className="font-semibold">
                                                {cuaca.cuaca.hu}%
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-gray-400">
                                                Angin
                                            </div>

                                            <div className="font-semibold">
                                                {cuaca.cuaca.ws} km/jam
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-gray-400">
                                                Arah Angin
                                            </div>

                                            <div className="font-semibold">
                                                {cuaca.cuaca.wd}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-gray-400">
                                                Jarak Pandang
                                            </div>

                                            <div className="font-semibold">
                                                {cuaca.cuaca.vs_text}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* UPDATE */}
                                <div className="mt-6 text-center text-xs text-gray-400">
                                    Data diperbarui{" "}
                                    {cuaca.cuaca.local_datetime}
                                </div>

                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}