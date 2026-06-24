import { Head } from "@inertiajs/react";

import { Header } from "@/Components/site/Header";
import { Hero } from "@/Components/site/Hero";
import { Services } from "@/Components/site/Services";
import { Statistik } from "@/Components/site/Statistik";
// import { About } from "@/Components/site/About";
import { Agenda } from "@/Components/site/Agenda";
import { Culture } from "@/Components/site/Culture";
import { Tourism } from "@/Components/site/Tourism";
import { Harmony } from "@/Components/site/Harmony";
import { SmartCity } from "@/Components/site/SmartCity";
import { News } from "@/Components/site/News";
import { Footer } from "@/Components/site/Footer";
import { Berita } from "@/types/berita";
import { CityMap } from "@/Components/site/CityMap";

type Layanan = {
    id: number;
    title: string;
    desc: string;
    icon: string | null;
    url: string | null;
};


type Props = {
    berita: Berita[];
    layanan: Layanan[];
};

export default function LandingPage({
    berita, layanan
}: Props) {
    return (
        <>
            <Head
                title="Pemerintah Kota Kediri — Harmoni, Maju, dan Berbudaya"
            >
                <meta
                    name="description"
                    content="Portal resmi Pemerintah Kota Kediri. Layanan publik, agenda kota, wisata, budaya, dan inisiatif smart city untuk warga & pengunjung."
                />
            </Head>

            <div className="bg-background text-foreground">
                <Header />

                <main>
                    <Hero />
                    <Services layanan={layanan}/>
                    {/* <About /> */}
                    {/* <Statistik /> */}
                    <Agenda />
                    <Culture />
                    <CityMap />
                    <Tourism />
                    <Harmony />
                    <News berita={berita} />
                </main>

                <Footer />
            </div>
        </>
    );
}