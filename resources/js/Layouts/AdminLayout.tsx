import { PropsWithChildren } from "react";
import { Head } from "@inertiajs/react";

import Sidebar from "@/Components/admin/Sidebar"
import Navbar from "@/Components/admin/Navbar";
import Footer from "@/Components/admin/Footer";

interface Props extends PropsWithChildren {
    title?: string;
}

export default function AdminLayout({
    children,
    title,
}: Props) {
    return (
        <>
            <Head title={title} />

            <div className="wrapper">
                <Sidebar />

                <div className="main-panel">
                    <Navbar />

                    {children}

                    <Footer />
                </div>
            </div>
        </>
    );
}