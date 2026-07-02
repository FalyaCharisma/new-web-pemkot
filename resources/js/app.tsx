import "../css/app.css";
import "./bootstrap";
import "leaflet/dist/leaflet.css";

import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Pemkot Kediri";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx"),
        ),

    setup({ el, App, props }) {
        router.on("navigate", () => {
            if (!window.gtag) return;

            window.gtag("event", "page_view", {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname,
            });
        });

        createRoot(el).render(<App {...props} />);

        requestAnimationFrame(() => {
            if (!window.gtag) return;

            window.gtag("event", "page_view", {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname,
            });
        });
    },

    progress: {
        color: "#4B5563",
    },
});
