import { PhoneCall, MessageCircle, Share2, Link2 } from "lucide-react";
import {
    FaFacebookF,
    FaWhatsapp,
    FaInstagram,
    FaXTwitter,
} from "react-icons/fa6";

export default function FloatingReport() {
    const url = typeof window !== "undefined" ? window.location.href : "";

    return (
        <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-4">
            {/* 112 */}

            <div className="group relative">
                <a
                    href="tel:112"
                    className="h-16 w-16 rounded-full bg-white border-[3px] border-blue-500 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                    <PhoneCall size={28} className="text-blue-500" />
                </a>

                <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm text-white shadow-lg opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                    Telp Lapor Mbak Wali (112)
                </div>
            </div>

            {/* WA */}

            <div className="group relative">
                <a
                    href="https://wa.me/62811364112"
                    target="_blank"
                    className="h-16 w-16 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                    <FaWhatsapp size={30} className="text-white" />
                </a>

                <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm text-white shadow-lg opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                    WhatsApp Mbak Wali
                </div>
            </div>

            {/* SHARE */}

            <div className="group relative">
                <button className="h-16 w-16 rounded-full bg-slate-700 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Share2 size={28} className="text-white" />
                </button>

                {/* tooltip */}

                <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm text-white shadow-lg opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                    Bagikan Halaman
                </div>

                {/* submenu */}

                <div className="absolute right-20 bottom-0 w-56 rounded-2xl bg-white shadow-2xl border p-2 opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                        target="_blank"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
                    >
                        <FaFacebookF size={18} className="text-[#1877F2]" />
                        Facebook
                    </a>

                    <a
                        href={`https://twitter.com/intent/tweet?url=${url}`}
                        target="_blank"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
                    >
                        <FaXTwitter size={18} />X
                    </a>

                    <a
                        href={`https://wa.me/?text=${url}`}
                        target="_blank"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
                    >
                        <FaWhatsapp size={18} className="text-green-500" />
                        WhatsApp
                    </a>

                    <button
                        onClick={() => navigator.clipboard.writeText(url)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
                    >
                        <FaInstagram size={18} className="text-pink-500" />
                        Instagram
                    </button>

                    <button
                        onClick={() => navigator.clipboard.writeText(url)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
                    >
                        <Link2 size={18} />
                        Salin Tautan
                    </button>
                </div>
            </div>
        </div>
    );
}
