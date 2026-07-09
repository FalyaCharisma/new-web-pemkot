import {
    PhoneCall,
    MessageCircle,
    Share2,
    Link2,
    Accessibility,
} from "lucide-react";
import {
    FaFacebookF,
    FaWhatsapp,
    FaInstagram,
    FaXTwitter,
} from "react-icons/fa6";
import { useEffect, useState  } from "react";

export default function FloatingReport() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const [activePanel, setActivePanel] = useState<"report" | "share" | null>(null);
    useEffect(() => {
        if (document.getElementById("userway-widget")) return;

        const script = document.createElement("script");

        script.id = "userway-widget";
        script.src = "https://cdn.userway.org/widget.js";
        script.async = true;

        script.setAttribute("data-account", "FCl1e8LsIe");
        script.setAttribute("data-trigger", "myCustomTrigger");
        script.setAttribute("data-hide-icon", "true");
        script.setAttribute("data-color", "#28559E");

        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, []);

    return (
        <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-4">
            {/* 112 */}

            {/* LAPOR MBAK WALI */}
            <div className="group relative">
                <button
                    onClick={() =>
                        setActivePanel(
                            activePanel === "report" ? null : "report"
                        )
                    }
                    className="h-16 w-16 rounded-full bg-white border-[3px] border-blue-500 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                    <img
                        src="/assets/images/112.jpg"
                        alt="Lapor Mbak Wali"
                        className="h-10 w-10 object-contain"
                    />
                </button>

                {/* Tooltip */}
                <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm text-white shadow-lg opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                    Lapor Mbak Wali
                </div>

                {/* Submenu */}
                <div className={`absolute right-20 top-0 w-60 rounded-2xl bg-white shadow-2xl border p-2 transition-all duration-300 ${
                    activePanel === "report"
                        ? "opacity-100 visible translate-x-0"
                        : "opacity-0 invisible translate-x-3"
                }`}>
                    <a
                        href="tel:112"
                        className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-100"
                    >
                        <PhoneCall size={20} className="text-blue-600" />
                        Telepon 112
                    </a>

                    <a
                        href="https://wa.me/62811364112"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-100"
                    >
                        <FaWhatsapp size={20} className="text-green-500" />
                        WhatsApp Mbak Wali
                    </a>
                </div>
            </div>
            <div className="group relative">
                <button
                    id="myCustomTrigger"
                    className="h-16 w-16 rounded-full bg-[#F0B100] shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                    <Accessibility size={30} className="text-white" />
                </button>

                <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl  px-4 py-2  bg-white shadow-lg opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                    Aksesibilitas
                </div>
            </div>

            {/* SHARE */}

            <div className="group relative">
                <button
                    onClick={() =>
                        setActivePanel(
                            activePanel === "share" ? null : "share"
                        )
                    }
                    className="h-16 w-16 rounded-full bg-slate-700 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                    <Share2 size={28} className="text-white" />
                </button>

                {/* tooltip */}

                <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm text-white shadow-lg opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                    Bagikan Halaman
                </div>

                {/* submenu */}

                <div className={`absolute right-20 bottom-0 w-56 rounded-2xl bg-white shadow-2xl border p-2 transition-all duration-300 ${
                    activePanel === "share"
                        ? "opacity-100 visible translate-x-0"
                        : "opacity-0 invisible translate-x-3"
                }`}>
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
