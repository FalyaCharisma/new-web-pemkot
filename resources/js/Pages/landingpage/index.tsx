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
import {Peta} from "@/types/peta";
import { Layanan } from "@/types/layanan";
import { Agenda as AgendaType } from "@/types/agenda";
import { FasilitasKota } from "@/types/fasilitas";
import FloatingReport from '@/Components/site/Floating';
import logo from "@/assets/logo.png";

type Props = {
    berita: Berita[];
    layanan: Layanan[];
    peta: Peta[];
    agenda: AgendaType[];
    hero: string | null;
    wisata: FasilitasKota[];
};

export default function LandingPage({
    berita, layanan, peta, agenda, hero, wisata
}: Props) {
    return (
        <>
            <Head
                title="Pemerintah Kota Kediri — Maju, Agamis, Produktif, Aman, Ngangeni"
            >
                <meta
                    name="description"
                    content="Portal resmi Pemerintah Kota Kediri. Layanan publik, agenda kota, wisata, budaya, dan inisiatif smart city untuk warga & pengunjung."
                />
            </Head>

               <link rel="icon" href={logo} />

            <div className="bg-background text-foreground">
                <Header />

                <main>
                    <Hero hero={hero}/>
                    <Services layanan={layanan}/>
                    {/* <About /> */}
                    {/* <Statistik /> */}
                    <Agenda agenda={agenda} />
                    <Culture />
                    <CityMap peta={peta} />
                    <Tourism wisata={wisata}/>
                    <Harmony />
                    <News berita={berita} />
                </main>
                <FloatingReport />
                <Footer />
            </div>
        </>
    );
}