
import {
    PhoneCall,
    Share2,
    Link2,
    Accessibility,
    X,
} from "lucide-react";
import {
    FaFacebookF,
    FaWhatsapp,
    FaInstagram,
    FaXTwitter,
} from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

export default function FloatingReport() {
    const url =
        typeof window !== "undefined" ? window.location.href : "";

    const [isOpen, setIsOpen] = useState(false);
    const [activePanel, setActivePanel] = useState<
        "report" | "share" | null
    >(null);

    const floatingRef = useRef<HTMLDivElement>(null);

    // USERWAY ACCESSIBILITY
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

    // KLIK DI LUAR FLOATING MENU
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                floatingRef.current &&
                !floatingRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setActivePanel(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const toggleMainMenu = () => {
        if (isOpen) {
            setIsOpen(false);
            setActivePanel(null);
        } else {
            setIsOpen(true);
        }
    };

    const togglePanel = (panel: "report" | "share") => {
        setIsOpen(true);

        setActivePanel((current) =>
            current === panel ? null : panel
        );
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            alert("Link berhasil disalin");
        } catch {
            alert("Gagal menyalin link");
        }
    };

    return (
        <div
            ref={floatingRef}
            className="fixed right-5 bottom-5 z-[9999]"
            onMouseEnter={() => setIsOpen(true)}
        >
            {/* SUB MENU */}
            <div
                className={`absolute bottom-20 right-0 flex flex-col items-end gap-3 transition-all duration-300 ${
                    isOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible translate-y-4 pointer-events-none"
                }`}
            >
                {/* LAPOR MBAK WALI */}
                <div className="relative flex items-center gap-3">
                    {/* PANEL LAPOR */}
                    <div
                        className={`absolute right-16 bottom-0 w-64 rounded-2xl bg-white shadow-2xl border p-2 transition-all duration-300 ${
                            activePanel === "report"
                                ? "opacity-100 visible translate-x-0"
                                : "opacity-0 invisible translate-x-3 pointer-events-none"
                        }`}
                    >
                        <a
                            href="tel:112"
                            className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-100 transition"
                        >
                            <PhoneCall
                                size={20}
                                className="text-blue-600"
                            />
                            <span>Telepon 112</span>
                        </a>

                        <a
                            href="https://wa.me/62811364112"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-100 transition"
                        >
                            <FaWhatsapp
                                size={20}
                                className="text-green-500"
                            />
                            <span>WhatsApp Mbak Wali</span>
                        </a>
                    </div>

                    {/* LABEL */}
                    <span className="whitespace-nowrap rounded-xl bg-white px-4 py-2 text-sm shadow-lg">
                        Lapor Mbak Wali
                    </span>

                    {/* BUTTON */}
                    <button
                        type="button"
                        onClick={() => togglePanel("report")}
                        className={`h-14 w-14 rounded-full bg-white border-[3px] border-blue-500 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                            activePanel === "report"
                                ? "scale-110"
                                : ""
                        }`}
                        aria-label="Lapor Mbak Wali"
                    >
                        <img
                            src="/assets/images/112.jpg"
                            alt="Lapor Mbak Wali"
                            className="h-9 w-9 object-contain"
                        />
                    </button>
                </div>

                {/* AKSESIBILITAS */}
                <div className="relative flex items-center gap-3">
                    {/* LABEL */}
                    <span className="whitespace-nowrap rounded-xl bg-white px-4 py-2 text-sm shadow-lg">
                        Aksesibilitas
                    </span>

                    {/* BUTTON */}
                    <button
                        type="button"
                        id="myCustomTrigger"
                        className="h-14 w-14 rounded-full bg-[#F0B100] shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                        aria-label="Aksesibilitas"
                    >
                        <Accessibility
                            size={28}
                            className="text-white"
                        />
                    </button>
                </div>

                {/* SHARE */}
                <div className="relative flex items-center gap-3">
                    {/* PANEL SHARE */}
                    <div
                        className={`absolute right-16 bottom-0 w-60 rounded-2xl bg-white shadow-2xl border p-2 transition-all duration-300 ${
                            activePanel === "share"
                                ? "opacity-100 visible translate-x-0"
                                : "opacity-0 invisible translate-x-3 pointer-events-none"
                        }`}
                    >
                        {/* FACEBOOK */}
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                url
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition"
                        >
                            <FaFacebookF
                                size={18}
                                className="text-[#1877F2]"
                            />
                            Facebook
                        </a>

                        {/* X */}
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                url
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition"
                        >
                            <FaXTwitter size={18} />
                            X
                        </a>

                        {/* WHATSAPP */}
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                                url
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition"
                        >
                            <FaWhatsapp
                                size={18}
                                className="text-green-500"
                            />
                            WhatsApp
                        </a>

                        {/* INSTAGRAM */}
                        <button
                            type="button"
                            onClick={copyLink}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition"
                        >
                            <FaInstagram
                                size={18}
                                className="text-pink-500"
                            />
                            Instagram
                        </button>

                        {/* COPY LINK */}
                        <button
                            type="button"
                            onClick={copyLink}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition"
                        >
                            <Link2 size={18} />
                            Salin Tautan
                        </button>
                    </div>

                    {/* LABEL */}
                    <span className="whitespace-nowrap rounded-xl bg-white px-4 py-2 text-sm shadow-lg">
                        Bagikan Halaman
                    </span>

                    {/* BUTTON */}
                    <button
                        type="button"
                        onClick={() => togglePanel("share")}
                        className={`h-14 w-14 rounded-full bg-slate-700 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                            activePanel === "share"
                                ? "scale-110"
                                : ""
                        }`}
                        aria-label="Bagikan Halaman"
                    >
                        <Share2
                            size={26}
                            className="text-white"
                        />
                    </button>
                </div>
            </div>

            {/* MAIN FLOATING BUTTON */}
            <button
                type="button"
                onClick={toggleMainMenu}
                className={`h-16 w-16 rounded-full bg-[#28559E] shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 ${
                    isOpen ? "rotate-90" : ""
                }`}
                aria-label="Menu Floating"
            >
                {isOpen ? (
                    <X size={28} />
                ) : (
                    <Accessibility size={30} />
                )}
            </button>
        </div>
    );
}
