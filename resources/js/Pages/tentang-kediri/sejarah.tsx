import { Landmark, Crown, Building2, History } from "lucide-react";
import { Sejarah } from "@/types/sejarah";

interface Props {
    sejarah: Sejarah[];
}

export default function SejarahKediri({ sejarah }: Props) {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold">Sejarah Kota Kediri</h2>

                <div className="mt-3 h-1 w-20 rounded-full bg-primary" />
            </div>

            {/* Hero */}
            <div className="rounded-3xl border bg-gradient-to-r from-primary/10 to-primary/5 p-8">
                <h3 className="text-2xl font-bold text-primary">
                    Kota dengan Jejak Sejarah Panjang
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                    Kota Kediri merupakan salah satu kota bersejarah di Jawa
                    Timur yang memiliki peranan penting dalam perkembangan
                    peradaban, perdagangan, dan kebudayaan Nusantara. Berbagai
                    peninggalan sejarah serta perjalanan panjang pembangunan
                    menjadikan Kediri sebagai kota yang terus berkembang tanpa
                    meninggalkan nilai-nilai budaya yang diwariskan oleh para
                    pendahulu.
                </p>
            </div>

            {/* Timeline */}
            <div className="relative">
                <div className="absolute left-5 top-0 h-full w-1 rounded-full bg-primary/20" />

                <div className="space-y-8">
                    {sejarah.map((item) => (
                        <div key={item.id} className="relative flex gap-6">
                            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                                <History size={20} />
                            </div>

                            <div className="flex-1 rounded-2xl border bg-white p-6 shadow-sm">
                                <span className="text-sm font-semibold text-primary">
                                    {item.tahun}
                                </span>

                                <h4 className="mt-1 text-lg font-semibold">
                                    {item.judul}
                                </h4>

                                <p className="mt-3 text-slate-600">
                                    {item.deskripsi}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
