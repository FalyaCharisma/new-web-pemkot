import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { User, Lock } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Login() {
    const [active, setActive] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post(route("login"), {
            onSuccess: () => {
                window.location.href = route("dashboard");
            },
        });
    };

    return (
        <>
            <Head title="Pemkot Kediri - Admin" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-cyan-200">
                <div
                    className={`relative w-[850px] h-[550px] bg-white rounded-[30px] shadow-2xl overflow-hidden ${
                        active ? "active" : ""
                    }`}
                >
                    {/* Login Form */}
                    <div className="absolute right-0 w-1/2 h-full flex items-center justify-center p-10 bg-white">
                        <form onSubmit={submit} className="w-full text-center">
                            <h1 className="text-4xl font-bold mb-8">Login</h1>

                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={data.username}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                    className="w-full rounded-lg bg-gray-100 px-5 py-3 pr-12 outline-none"
                                />
                                <User
                                    size={20}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                />
                                {errors.username && (
                                    <p className="mt-1 text-sm text-red-500 text-left">
                                        {errors.username}
                                    </p>
                                )}
                            </div>

                            <div className="relative mb-6">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full rounded-lg bg-gray-100 px-5 py-3 pr-12 outline-none"
                                />
                                <Lock
                                    size={20}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500 text-left">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-[#164E5B] py-3 text-white font-semibold hover:opacity-90 transition"
                            >
                                {processing ? "Loading..." : "Login"}
                            </button>
                        </form>
                    </div>

                    {/* Toggle Panel */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute left-0 w-1/2 h-full bg-[#164E5B] text-white flex flex-col items-center justify-center rounded-r-[150px]">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-32 mb-6"
                            />

                            <h1 className="text-4xl font-bold">
                                Hai Admin!
                            </h1>

                            <p className="mt-3">
                                Ingin Update Apa Hari Ini?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}