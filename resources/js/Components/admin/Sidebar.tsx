import { Link, usePage } from "@inertiajs/react";

interface MenuItem {
    title: string;
    icon: string;
    href?: string;
    children?: MenuItem[];
}

export default function Sidebar() {
    const { url } = usePage();

    const menus: MenuItem[] = [
        {
            title: "Dashboard",
            icon: "fas fa-home",
            href: route("dashboard"),
        },
        {
            title: "Berita",
            icon: "fas fa-newspaper",
            href: "",
        },
        {
            title: "Agenda",
            icon: "fas fa-calendar",
            href: "",
        },
        {
            title: "Master Data",
            icon: "fas fa-database",
            children: [
                {
                    title: "Kategori Berita",
                    icon: "",
                    href: "",
                },
                {
                    title: "Kategori Agenda",
                    icon: "",
                    href: "",
                },
            ],
        },
    ];

    return (
        <div className="sidebar" data-background-color="dark">
            <div className="sidebar-logo">
                <div
                    className="logo-header"
                    data-background-color="dark"
                >
                    <Link href={route("dashboard")} className="logo">
                        <h4 style={{ color: "white" }}>ADMINPAGE</h4>
                    </Link>
                </div>
            </div>

            <div className="sidebar-wrapper scrollbar scrollbar-inner">
                <div className="sidebar-content">
                    <ul className="nav nav-secondary">
                        {menus.map((menu, index) => {
                            if (menu.children) {
                                return (
                                    <li
                                        key={index}
                                        className="nav-item submenu"
                                    >
                                        <a
                                            data-bs-toggle="collapse"
                                            href={`#menu-${index}`}
                                        >
                                            <i className={menu.icon}></i>
                                            <p>{menu.title}</p>
                                            <span className="caret"></span>
                                        </a>

                                        <div
                                            className="collapse"
                                            id={`menu-${index}`}
                                        >
                                            <ul className="nav nav-collapse">
                                                {menu.children.map(
                                                    (child) => (
                                                        <li
                                                            key={
                                                                child.title
                                                            }
                                                            className={
                                                                url ===
                                                                new URL(
                                                                    child.href!
                                                                )
                                                                    .pathname
                                                                    ? "active"
                                                                    : ""
                                                            }
                                                        >
                                                            <Link
                                                                href={
                                                                    child.href!
                                                                }
                                                            >
                                                                <span className="sub-item">
                                                                    {
                                                                        child.title
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </li>
                                );
                            }

                            return (
                                <li
                                    key={index}
                                    className={`nav-item ${
                                        url ===
                                        new URL(menu.href!)
                                            .pathname
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <Link href={menu.href!}>
                                        <i className={menu.icon}></i>
                                        <p>{menu.title}</p>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}