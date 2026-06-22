import {
    FaFacebookF,
    FaXTwitter,
    FaWhatsapp,
    FaInstagram,
} from "react-icons/fa6";
import { Link2 } from "lucide-react";

type ShareButtonsProps = {
    url: string;
    title?: string;
};

export function ShareButtons({ url, title = "" }: ShareButtonsProps) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shares = [
        {
            icon: FaFacebookF,
            onClick: () =>
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
                    "_blank"
                ),
        },
        {
            icon: FaXTwitter,
            onClick: () =>
                window.open(
                    `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
                    "_blank"
                ),
        },
        {
            icon: FaWhatsapp,
            onClick: () =>
                window.open(
                    `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
                    "_blank"
                ),
        },
        {
            icon: FaInstagram,
            onClick: () => {
                // Instagram tidak punya share URL langsung
                navigator.clipboard.writeText(url);
                alert("Link disalin, silakan share ke Instagram manually");
            },
        },
    ];

    const copyLink = () => {
        navigator.clipboard.writeText(url);
        alert("Link berhasil disalin!");
    };

    return (
        <div className="flex items-center gap-2">
            <span className="mr-1 text-sm text-slate-500">Bagikan:</span>

            {shares.map((item, index) => (
                <button
                    key={index}
                    onClick={item.onClick}
                    className="
                        flex h-8 w-8 items-center justify-center
                        rounded-lg border
                        text-slate-500
                        transition-all
                        hover:border-primary
                        hover:bg-primary
                        hover:text-white
                    "
                >
                    <item.icon size={14} />
                </button>
            ))}

            {/* Copy link */}
            <button
                onClick={copyLink}
                className="
                    flex h-8 w-8 items-center justify-center
                    rounded-lg border
                    text-slate-500
                    transition-all
                    hover:border-primary
                    hover:bg-primary
                    hover:text-white
                "
            >
                <Link2 size={14} />
            </button>
        </div>
    );
}