import { router, usePage } from "@inertiajs/react";
import type { PageProps } from "@/types/inertia";

export default function Navbar() {
    const { auth } = usePage<PageProps>().props;

    const logout = () => {
        router.post(route("logout"));
    };

    return (
        <div className="main-header" style={{ backgroundColor: "#1A2035" }}>
            <nav className="navbar navbar-header navbar-expand-lg border-bottom">
                <div className="container-fluid">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item dropdown">
                            <a
                                className="dropdown-toggle profile-pic"
                                data-bs-toggle="dropdown"
                                href="#"
                            >
                                <span className="fw-bold text-white">
                                    Hi, {auth.user.name}
                                </span>
                            </a>

                            <ul className="dropdown-menu">
                                <li className="dropdown-item">
                                    {auth.user.username}
                                </li>

                                <li>
                                    <button
                                        onClick={logout}
                                        className="dropdown-item"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}