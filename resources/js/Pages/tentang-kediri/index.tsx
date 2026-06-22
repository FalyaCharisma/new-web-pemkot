import { Head } from "@inertiajs/react";
import LambangDaerah from "./lambang-daerah";
import ProfilPimpinan from "./profil-pimpinan";
import SejarahKediri from "./sejarah";
import Sekilas from "./sekilas";
import VisiMisi from "./visi-mis";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { HeroPage } from "@/Components/HeroPage";
import { Footer } from "@/Components/site/Footer";
import SidebarItem from "@/Components/site/SidebarItem";

export default function Index({
    kategori,
    kategoriList,

    sekilas,
    visi,
    misi,
    lambang,
    sejarah,
    pimpinan,
    statistik,
}: any) {
    const renderContent = () => {
        switch (kategori.slug) {
            case "sekilas":
                return <Sekilas data={sekilas} statistik={statistik} />;

            case "visi-misi":
                return <VisiMisi visi={visi} misi={misi} />;

            case "lambang-daerah":
                return <LambangDaerah />;

            case "sejarah-kediri":
                return <SejarahKediri />;

            case "profil-pimpinan":
                return <ProfilPimpinan pimpinan={pimpinan} />;

            default:
                return null;
        }
    };

    return (
        <>
            <Head title="Tentang Kediri" />

            <div className="min-h-screen bg-slate-50">
                <HeaderSolid />

                <main className="pt-15">
                    <HeroPage
                        title="Tentang Kota Kediri"
                        breadcrumb="Tentang Kota Kediri"
                        enableSearch={false}
                        description="Mengenal lebih dekat Kota Kediri, mulai dari sejarah, identitas daerah, visi dan misi pembangunan, hingga profil pimpinan daerah."
                    />

                    <section className="container mx-auto px-4 py-10">
                        <div className="grid gap-10 lg:grid-cols-4">
                            <div>
                                <SidebarItem
                                    title="Tentang Kota Kediri"
                                    items={kategoriList}
                                    activeSlug={kategori.slug}
                                    baseUrl="/tentang-kediri"
                                />
                            </div>

                            <div className="lg:col-span-3 rounded-2xl border bg-white p-8 shadow-sm">
                                {renderContent()}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
