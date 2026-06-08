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

const footerMenus = [
  {
    title: "Layanan Publik",
    children: [
      { title: "Lapor Mbak Wali", url: "#" },
      { title: "Perizinan Online", url: "#" },
      { title: "PPDB Kediri", url: "#" },
      { title: "Pajak Daerah", url: "#" },
    ],
  },
  {
    title: "Informasi",
    children: [
      { title: "Berita Kota", url: "#" },
      { title: "Agenda & Event", url: "#" },
      { title: "Pengumuman", url: "#" },
      { title: "Statistik Kota", url: "#" },
    ],
  },
];

const socials = [
  {
    icon: FaInstagram,
    url: "#",
  },
  {
    icon: FaFacebookF,
    url: "#",
  },
  {
    icon: FaYoutube,
    url: "#",
  },
  {
    icon: FaXTwitter,
    url: "https://x.com/kedirikota",
  },
  {
    icon: FaTiktok,
    url: "https://tiktok.com/@kedirikota",
  },
];

const survey = [
  {
    label: "Sangat Puas",
    percent: 60,
    icon: SmilePlus,
    color: "text-green-600",
  },
  {
    label: "Puas",
    percent: 25,
    icon: Smile,
    color: "text-emerald-500",
  },
  {
    label: "Cukup Puas",
    percent: 10,
    icon: Meh,
    color: "text-amber-500",
  },
  {
    label: "Tidak Puas",
    percent: 5,
    icon: Frown,
    color: "text-red-500",
  },
];

export function Footer() {
  const liveVisitors = 12;
  const totalVisitors = 128745;

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
                <Phone
                  size={18}
                  className="text-primary"
                />

                <span>(0354) 682955</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-primary"
                />

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
                      <Icon size={16} />
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
                {liveVisitors} Online
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Visitor
                </span>

                <span className="text-lg font-bold text-primary">
                  {totalVisitors.toLocaleString()}
                </span>
              </div>
            </div>

            <h6 className="mt-6 mb-4 text-base font-semibold text-primary">
              Survey Kepuasan
            </h6>

            <div className="grid grid-cols-4 gap-2">
              {survey.map((item) => {
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
                      {item.percent}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary/10 py-4">
        <div className="container-page text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Pemerintah Kota Kediri.
          Semua Hak Dilindungi.
        </div>
      </div>
    </footer>
  );
}