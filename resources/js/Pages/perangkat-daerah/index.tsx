import { Footer } from "@/Components/site/Footer";
import KepalaDaerah from "./kepala-daerah";
import SekretarisDaerah from "./sekda";
import OpdGrid from "./staf-ahli";
import StrukturOrganisasi from "./struktur-organisasi";
import { Head } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { HeroPage } from "@/Components/HeroPage";
import SidebarItem from "@/Components/site/SidebarItem";

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
        <>
            <Head title="Perangkat Daerah" />
            <div className="min-h-screen bg-slate-50 text-foreground">
                <HeaderSolid />
                <main className="pt-15">
                    <HeroPage
                        title="Perangkat Daerah"
                        breadcrumb="Perangkat Daerah"
                        placeholder="Cari nama OPD atau Kepala Daerah..."
                        enableSearch={false}
                        description="Jelajahi informasi Perangkat Daerah Kota Kediri untuk mengenal struktur organisasi, tugas pokok dan fungsi, serta peran masing-masing perangkat daerah dalam penyelenggaraan pemerintahan daerah."
                    />
                    <section className="container mx-auto px-4 py-10">
                        <div className="mb-20">
                            <div className="container mx-auto -mt-8">
                                <div className="mt-10">
                                    <div className="grid lg:grid-cols-4 gap-10">
                                        <div>
                                            <SidebarItem
                                                title="Struktur Organisasi"
                                                items={kategoriList}
                                                activeSlug={kategori.slug}
                                                baseUrl="/perangkat-daerah"
                                            />
                                        </div>

                                        <div className="lg:col-span-3 border rounded-lg p-6 bg-white shadow">
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
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}
