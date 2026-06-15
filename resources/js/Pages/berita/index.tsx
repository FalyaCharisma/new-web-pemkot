import { Head } from "@inertiajs/react";
import { HeaderSolid } from "@/Components/site/HeaderSolid";
import { Footer } from "@/Components/site/Footer";
import { HeroPage } from "@/Components/HeroPage";
import { ContentCTA } from "@/Components/ContentCTA";

import {
  FaInstagram,
} from "react-icons/fa6";

export default function AkomodasiIndex() {
  return (
    <>
    <Head title="Berita" />

    <div className="min-h-screen bg-slate-50 text-foreground">
        <HeaderSolid />

        <main className="pt-15">
            <HeroPage
                title="Berita Kota Kediri"
                breadcrumb="Berita"
                placeholder="Cari berita..."
                description="Pusat informasi resmi Kota Kediri yang menyajikan berita terkini, agenda daerah, dan berbagai informasi publik untuk masyarakat."
            />

            {/* CONTENT */}
            <section className="container mx-auto px-4 py-10">
                {/* CTA */}
                <ContentCTA
                    icon={<FaInstagram size={24} />}
                    title="Ikuti Informasi Terkini Kota Kediri"
                    description="Dapatkan update kegiatan, program pemerintah, pengumuman, dan berbagai informasi terbaru melalui Instagram resmi Pemerintah Kota Kediri."
                    buttonText="Kunjungi Instagram"
                    href="https://instagram.com/pemkotkediri"
                    external
                />
            </section>
        </main>

        <Footer />
    </div>
    </>
  )
}