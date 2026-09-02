import { Head } from "@inertiajs/react";

import { Header } from "@/Components/site/Header";
import { Hero } from "@/Components/site/Hero";
import { Services } from "@/Components/site/Services";
import { Statistik } from "@/Components/site/Statistik";
import { Agenda } from "@/Components/site/Agenda";
import { Culture } from "@/Components/site/Culture";
import { Tourism } from "@/Components/site/Tourism";
import { Harmony } from "@/Components/site/Harmony";
import { SmartCity } from "@/Components/site/SmartCity";
import { News } from "@/Components/site/News";
import { Footer } from "@/Components/site/Footer";
import { Berita } from "@/types/berita";
import { CityMap } from "@/Components/site/CityMap";
import { Peta } from "@/types/peta";
import { Layanan } from "@/types/layanan";
import { Agenda as AgendaType } from "@/types/agenda";
import { FasilitasKota } from "@/types/fasilitas";
import FloatingReport from "@/Components/site/Floating";
import logo from "@/assets/logo.png";

type BudayaWarisan = {
    id: number;
    kategori_id: number | null;
    tag: string | null;
    judul: string;
    deskripsi: string | null;
    gambar: string | null;
    urutan: number;
    status: boolean;
};

type Props = {
    beritaProkopim: Berita[];
    beritaKominfo: Berita[];
    layanan: Layanan[];
    peta: Peta[];
    agenda: AgendaType[];
    hero: string | null;
    wisata: FasilitasKota[];
    budayaWarisan: BudayaWarisan[];
};

export default function LandingPage({
    beritaKominfo,
    beritaProkopim,
    layanan,
    peta,
    agenda,
    hero,
    wisata,
    budayaWarisan,
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
                    <Hero hero={hero} />

                    <Services layanan={layanan} />

                    <Agenda agenda={agenda} />

                    <Culture budayaWarisan={budayaWarisan} />

                    <CityMap peta={peta} />

                    <Tourism wisata={wisata} />

                    <Harmony />

                    <News
                        beritaProkopim={beritaProkopim}
                        beritaKominfo={beritaKominfo}
                    />
                </main>

                <FloatingReport />

                <Footer />
            </div>
        </>
    );
}