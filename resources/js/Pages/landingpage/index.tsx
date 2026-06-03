import { Head } from "@inertiajs/react";

import { Header } from "@/Components/site/Header";
import { Hero } from "@/Components/site/Hero";
import { Services } from "@/Components/site/Services";
// import { About } from "@/Components/site/About";
import { Agenda } from "@/Components/site/Agenda";
import { Culture } from "@/Components/site/Culture";
import { Tourism } from "@/Components/site/Tourism";
import { Harmony } from "@/Components/site/Harmony";
import { SmartCity } from "@/Components/site/SmartCity";
import { News } from "@/Components/site/News";
import { Footer } from "@/Components/site/Footer";

export default function LandingPage() {
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
                    <Services />
                    {/* <About /> */}
                    <Agenda />
                    <Culture />
                    <Tourism />
                    <Harmony />
                    <SmartCity />
                    <News />
                </main>

                <Footer />
            </div>
        </>
    );
}