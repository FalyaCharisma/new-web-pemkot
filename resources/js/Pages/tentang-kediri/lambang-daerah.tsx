import lambangKediri from "@/assets/logo.png";
export default function LambangDaerah() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold">
                    Lambang Daerah Kota Kediri
                </h2>

                <div className="mt-3 h-1 w-20 rounded-full bg-primary" />
            </div>

            {/* Sejarah */}
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="flex items-center justify-center rounded-3xl border bg-white p-8 shadow-sm">
                    <img
                        src={lambangKediri}
                        alt="Lambang Kota Kediri"
                        className="max-h-[400px] object-contain"
                    />
                </div>

                <div>
                    <h3 className="mb-4 text-xl font-semibold">
                        Sejarah Lambang Daerah
                    </h3>

                    <ol className="space-y-4 text-slate-600">
                        <li>
                            Berdasarkan Surat Keputusan DPRD Sementara Kota
                            Besar Kediri tanggal 30 Maret 1952 Nomor
                            22/DPRD-S/52 dan tanggal 21 September 1953 Nomor
                            16/DPRD-S/53 yang menetapkan lambang (Wapen)
                            Daerah Kota Besar Kediri.
                        </li>

                        <li>
                            Lambang tersebut kemudian disahkan melalui Surat
                            Keputusan Presiden Republik Indonesia Nomor
                            127 Tahun 1954 yang dimuat dalam Berita Negara
                            Tahun 1954 Nomor 57.
                        </li>

                        <li>
                            Pada tahun 1959 ditetapkan pula panji daerah
                            dalam dua bentuk, yaitu panji berbentuk bendera
                            dan panji berbentuk perisai.
                        </li>
                    </ol>
                </div>
            </div>

            {/* Panji */}
            <div>
                <h3 className="mb-6 text-2xl font-semibold">
                    Bentuk Panji Daerah
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <h4 className="mb-4 text-lg font-semibold text-primary">
                            Panji Berbentuk Bendera
                        </h4>

                        <ul className="space-y-3 text-slate-600">
                            <li>
                                <strong>Ukuran:</strong> 2 : 3
                            </li>
                            <li>
                                <strong>Warna Dasar:</strong> Hijau Agak Tua
                            </li>
                            <li>
                                <strong>Garis Tepi:</strong> Kuning
                            </li>
                            <li>
                                <strong>Isi:</strong> Lambang Kota Kediri di
                                bagian tengah
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <h4 className="mb-4 text-lg font-semibold text-primary">
                            Panji Berbentuk Perisai
                        </h4>

                        <ul className="space-y-3 text-slate-600">
                            <li>
                                <strong>Ukuran:</strong> 7 : 8
                            </li>
                            <li>
                                <strong>Warna Dasar:</strong> Hijau Agak Tua
                            </li>
                            <li>
                                <strong>Garis Tepi:</strong> Kuning
                            </li>
                            <li>
                                <strong>Isi:</strong> Lambang Kota Kediri di
                                bagian tengah
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Makna Lambang */}
            <div>
                <h3 className="mb-6 text-2xl font-semibold">
                    Makna Lambang Daerah
                </h3>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h4 className="mb-3 font-semibold text-primary">
                            Buto Locoyo (Ki Ageng Dhoho)
                        </h4>

                        <p className="text-slate-600">
                            Patih yang setia, teguh, dan jujur dari Sri Aji
                            Joyoboyo. Melambangkan kesetiaan, keteguhan,
                            serta kejujuran.
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h4 className="mb-3 font-semibold text-primary">
                            Perisai
                        </h4>

                        <p className="text-slate-600">
                            Melambangkan pertahanan dan kekuatan dalam menjaga
                            daerah serta masyarakat Kota Kediri.
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h4 className="mb-3 font-semibold text-primary">
                            Macan Putih (Sri Aji Joyoboyo)
                        </h4>

                        <p className="text-slate-600">
                            Melambangkan kewaspadaan, kebijaksanaan, dan
                            kepemimpinan Sri Aji Joyoboyo sebagai Raja Kediri.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}