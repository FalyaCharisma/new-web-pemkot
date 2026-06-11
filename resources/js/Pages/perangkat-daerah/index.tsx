import { Footer } from "@/Components/site/Footer";
import KepalaDaerah from "./kepala-daerah";
import SekretarisDaerah from "./sekda";
import SidebarKategori from "./sidebar-kategori";
import OpdGrid from "./staf-ahli";
import StrukturOrganisasi from "./struktur-organisasi";

export default function Index({ kategori, kategoriList }: any) {
    const renderContent = () => {
        switch (kategori.slug) {
            case "kepala-daerah":
                return <KepalaDaerah opd={kategori.opd} />;

            case "sekretaris-daerah":
                return <SekretarisDaerah opd={kategori.opd} />;
            case "struktur-organisasi":
                return <StrukturOrganisasi opd={kategori.opd} />;

            default:
                return <OpdGrid opd={kategori.opd} />;
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="mb-20">
                <section className="bg-white py-20">
                    <div className="container mx-auto">
                        <h1 className="text-6xl font-bold">Perangkat Daerah</h1>

                        <p className="mt-4 text-xl text-gray-500">
                            Kenali struktur organisasi dan pimpinan Pemerintah
                            Kota Kediri
                        </p>
                    </div>
                </section>

                <div className="container mx-auto -mt-8">
                    <div className="bg-white rounded-3xl p-8 shadow-lg">
                        <div className="grid lg:grid-cols-4 gap-10">
                            <div>
                                <SidebarKategori
                                    kategoriList={kategoriList}
                                    activeSlug={kategori.slug}
                                />
                            </div>

                            <div className="lg:col-span-3">
                                <h2 className="text-3xl font-bold mb-4">
                                    {kategori.nama}
                                </h2>
                                <div className="w-16 h-1 bg-[#D8A21D] mb-6 rounded-full" />

                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
