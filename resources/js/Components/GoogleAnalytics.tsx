import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

declare global {
    interface Window {
        dataLayer: any[];
        gtag?: (...args: any[]) => void;
    }
}

export default function GoogleAnalytics() {
    const { url } = usePage();
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

    // Load Google Tag sekali saja
    useEffect(() => {
        if (!measurementId) return;

        if (document.getElementById("google-gtag")) return;

        const script = document.createElement("script");
        script.id = "google-gtag";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];

        window.gtag = function (...args: any[]) {
            window.dataLayer.push(args);
        };

        window.gtag("js", new Date());

        window.gtag("config", measurementId, {
            send_page_view: false,
        });
    }, []);

    // Track setiap pindah halaman Inertia
    useEffect(() => {
        if (!window.gtag || !measurementId) return;

        window.gtag("event", "page_view", {
            page_title: document.title,
            page_location: window.location.href,
            page_path: url,
        });
    }, [url]);

    return null;
}