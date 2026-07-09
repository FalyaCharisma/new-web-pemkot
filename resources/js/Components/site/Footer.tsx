import {
    MapPin,
    Phone,
    Mail,
    SmilePlus,
    Smile,
    Meh,
    Frown,
} from "lucide-react";

import {
    FaInstagram,
    FaFacebookF,
    FaYoutube,
    FaXTwitter,
    FaTiktok,
} from "react-icons/fa6";

import mapan from "@/assets/mapan.png";
import logo from "@/assets/logo.png";
import lapormbak from "@/assets/112.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import FeedbackModal from "./FeedbackModal";

const footerMenus = [
    {
        title: "Layanan Publik",
        children: [
            {
                title: "Lapor Mbak Wali",
                url: "https://lapormbakwali.kedirikota.go.id",
            },
            {
                title: "Perizinan Online",
                url: "https://kswi.kedirikota.go.id/",
            },
            {
                title: "Layanan Kependudukan",
                url: "https://disdukcapil.kedirikota.go.id/sakti/",
            },
            {
                title: "Pajak Daerah",
                url: "https://pajak.kedirikota.go.id/pbb/login",
            },
        ],
    },
    {
        title: "Informasi",
        children: [
            { title: "Berita Kota", url: "/berita" },
            { title: "Agenda & Event", url: "/agenda" },
            { title: "Fasilitas", url: "/fasilitas-kota" },
            {
                title: "Statistik Kota",
                url: "https://satudata.kedirikota.go.id",
            },
        ],
    },
];

const socials = [
    {
        icon: FaInstagram,
        url: "https://www.instagram.com/pemkotkediri/",
    },
    {
        icon: FaFacebookF,
        url: "https://www.facebook.com/pemkotkediri.nda/?locale=id_ID",
    },
    {
        icon: FaYoutube,
        url: "https://www.youtube.com/channel/UCX6KxXBUbivqWXTku0nnPbA",
    },
    {
        icon: FaTiktok,
        url: "https://www.tiktok.com/@pemkotkediri",
    },
];

const surveyTemplate = [
    {
        label: "Sangat Puas",
        icon: SmilePlus,
        color: "text-green-600",
    },
    {
        label: "Puas",
        icon: Smile,
        color: "text-emerald-500",
    },
    {
        label: "Cukup Puas",
        icon: Meh,
        color: "text-amber-500",
    },
    {
        label: "Tidak Puas",
        icon: Frown,
        color: "text-red-500",
    },
];
export function Footer() {
    const [showFeedback, setShowFeedback] = useState(false);
    const [stats, setStats] = useState({
        online: 0,
        totalVisitors: 0,
    });

    const [loadingStats, setLoadingStats] = useState(true);
    const [survey, setSurvey] = useState<
        {
            label: string;
            percent: number;
        }[]
    >([]);

    useEffect(() => {
        axios
            .get("/analytics/statistics")
            .then((res) => {
                setStats(res.data);
            })
            .catch((err) => {
                console.error("Analytics:", err);
            })
            .finally(() => {
                setLoadingStats(false);
            });
        axios
            .get("/feedback/statistics")
            .then((res) => {
                setSurvey(res.data.survey);
            })
            .catch(console.error);
    }, []);

    return (
        <footer className="border-t border-primary/10 bg-primary/5">
            <div className="container-page py-6">
                {/* Logo */}
                <div className="mb-6 flex items-center gap-6">
                    <img
                        src={logo}
                        alt="Logo Pemerintah Kota Kediri"
                        className="h-14 w-auto object-contain"
                    />

                    <img
                        src={mapan}
                        alt="Logo MAPAN"
                        className="h-14 w-auto object-contain"
                    />

                    <img
                        src={lapormbak}
                        alt="Logo MAPAN"
                        className="h-14 w-14 rounded-full object-cover"
                    />
                </div>

                <div className="grid gap-6 lg:grid-cols-12">
                    {/* Kontak */}
                    <div className="lg:col-span-4">
                        <h6 className="mb-5 text-base font-semibold text-primary">
                            Alamat dan Kontak
                        </h6>

                        <div className="space-y-4 text-sm text-muted-foreground">
                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={18}
                                    className="mt-0.5 shrink-0 text-primary"
                                />

                                <span>
                                    Jalan Basuki Rahmad No. 15, Kelurahan
                                    Pocanan, Kota Kediri, Jawa Timur 64123
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-primary" />

                                <span>(0354) 682955</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-primary" />

                                <span>info@kedirikota.go.id</span>
                            </div>

                            <div className="flex gap-3 pt-2">
                                {socials.map((social, index) => {
                                    const Icon = social.icon;

                                    return (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                rounded-full
                                                border
                                                border-primary/15
                                                bg-white
                                                p-2.5
                                                text-primary
                                                shadow-sm
                                                transition-all
                                                hover:-translate-y-0.5
                                                hover:border-primary
                                                hover:bg-primary
                                                hover:text-white
                                            "
                                        >
                                            <Icon size={23} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="lg:col-span-4">
                        <div className="grid gap-8 sm:grid-cols-2">
                            {footerMenus.map((menu) => (
                                <div key={menu.title}>
                                    <h6 className="mb-5 text-base font-semibold text-primary">
                                        {menu.title}
                                    </h6>

                                    <ul className="space-y-3">
                                        {menu.children.map((item) => (
                                            <li key={item.title}>
                                                <a
                                                    href={item.url}
                                                    className="
                            text-sm
                            text-muted-foreground
                            transition-colors
                            hover:text-primary
                          "
                                                >
                                                    {item.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Statistik */}
                    <div className="lg:col-span-4">
                        <h6 className="mb-5 text-base font-semibold text-primary">
                            Statistik Kunjungan
                        </h6>

                        <div
                            className="
        rounded-2xl
        border
        border-primary/10
        bg-white
        p-5
        shadow-sm
    "
                        >
                            <div
                                className="
            mb-5
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-primary/10
            p-3
            text-sm
            font-medium
            text-primary
        "
                            >
                                <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />

                                {loadingStats ? (
                                    "Memuat..."
                                ) : (
                                    <>
                                        <strong>{stats.online}</strong>
                                        &nbsp;Online
                                    </>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Total Visitor
                                </span>

                                <span className="text-lg font-bold text-primary">
                                    {loadingStats
                                        ? "..."
                                        : stats.totalVisitors.toLocaleString(
                                              "id-ID",
                                          )}
                                </span>
                            </div>

                            <p className="mt-3 text-center text-xs text-gray-400">
                                Data Google Analytics
                            </p>
                        </div>
                        <h6 className="mb-4 mt-4 text-base font-semibold text-primary">
                            Survey Kepuasan
                        </h6>

                        <div className="grid grid-cols-4 gap-2">
                            {surveyTemplate.map((item, index) => {
                                const data = survey.find(
                                    (s) => s.label === item.label,
                                );

                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.label}
                                        className="
                rounded-xl
                border
                border-primary/10
                bg-white
                p-3
                text-center
                shadow-sm
            "
                                    >
                                        <Icon
                                            className={`mx-auto h-8 w-8 ${item.color}`}
                                        />

                                        <p className="mt-2 text-[10px] leading-tight text-muted-foreground">
                                            {item.label}
                                        </p>

                                        <p className="mt-1 text-xs font-semibold text-primary">
                                            {data?.percent ?? 0}%
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm mt-4">
                            <p className="text-sm text-muted-foreground mb-4">
                                Bantu kami meningkatkan kualitas website
                                Pemerintah Kota Kediri dengan memberikan
                                penilaian.
                            </p>

                            <button
                                onClick={() => setShowFeedback(true)}
                                className="w-full rounded-xl bg-primary px-4 py-3 text-white transition hover:bg-primary/90"
                            >
                                Beri Penilaian
                            </button>
                        </div>

                        <FeedbackModal
                            open={showFeedback}
                            onClose={() => setShowFeedback(false)}
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-primary/10 py-4">
                <div className="container-page text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Pemerintah Kota Kediri. Semua
                    Hak Dilindungi.
                </div>
            </div>
        </footer>
    );
}
