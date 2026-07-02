import { useState } from "react";
import axios from "axios";
import {
    Frown,
    Meh,
    Smile,
    Laugh,
    X,
    Send,
} from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
}

const ratings = [
    {
        value: 1,
        label: "Tidak Puas",
        icon: Frown,
        color: "text-red-500",
        border: "border-red-500",
    },
    {
        value: 2,
        label: "Cukup Puas",
        icon: Meh,
        color: "text-yellow-500",
        border: "border-yellow-500",
    },
    {
        value: 3,
        label: "Puas",
        icon: Smile,
        color: "text-blue-500",
        border: "border-blue-500",
    },
    {
        value: 4,
        label: "Sangat Puas",
        icon: Laugh,
        color: "text-green-600",
        border: "border-green-600",
    },
];

export default function FeedbackModal({
    open,
    onClose,
}: Props) {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        rating: 0,
        infoEase: "",
        infoAccuracy: "",
        infoClarity: "",
        infoCategory: "",
        infoSuggestion: "Tidak",
        name: "",
        email: "",
        message: "",
    });

    if (!open) return null;

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submit = async () => {

        if (form.rating === 0) {
            alert("Silakan pilih rating.");
            return;
        }

        setLoading(true);

        try {

            await axios.post("/feedback", form);

            alert("Terima kasih atas penilaian Anda.");

            setForm({
                rating: 0,
                infoEase: "",
                infoAccuracy: "",
                infoClarity: "",
                infoCategory: "",
                infoSuggestion: "Tidak",
                name: "",
                email: "",
                message: "",
            });

            onClose();

        } catch (err) {
            console.error(err);
            alert("Terjadi kesalahan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4">

            <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">

                {/* HEADER */}

                <div className="flex items-center justify-between border-b p-6">

                    <div>

                        <h2 className="text-2xl font-bold text-primary">
                            Survey Kepuasan Website
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Berikan masukan untuk meningkatkan kualitas website Pemerintah Kota Kediri.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* BODY */}

                <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">

                    {/* Rating */}

                    <div>

                        <label className="mb-4 block font-semibold">
                            Seberapa puas Anda dengan website ini?
                        </label>

                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                            {ratings.map((item) => {

                                const Icon = item.icon;

                                return (

                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() =>
                                            setForm({
                                                ...form,
                                                rating: item.value,
                                            })
                                        }
                                        className={`
                                            rounded-2xl
                                            border-2
                                            p-4
                                            transition
                                            hover:scale-105
                                            ${
                                                form.rating === item.value
                                                    ? item.border
                                                    : "border-gray-200"
                                            }
                                        `}
                                    >

                                        <Icon
                                            size={42}
                                            className={`mx-auto ${item.color}`}
                                        />

                                        <p className="mt-3 text-sm font-medium">
                                            {item.label}
                                        </p>

                                    </button>

                                );

                            })}

                        </div>

                    </div>

                    {/* Kemudahan */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Apakah informasi mudah ditemukan?
                        </label>

                        <select
                            name="infoEase"
                            value={form.infoEase}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3"
                        >
                            <option value="">Pilih</option>
                            <option>Sangat Mudah</option>
                            <option>Cukup Mudah</option>
                            <option>Sulit</option>
                            <option>Sangat Sulit</option>
                        </select>

                    </div>

                    {/* Akurasi */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Apakah informasi akurat dan terbaru?
                        </label>

                        <select
                            name="infoAccuracy"
                            value={form.infoAccuracy}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3"
                        >
                            <option value="">Pilih</option>
                            <option>Selalu up to date</option>
                            <option>Kadang perlu diperbarui</option>
                            <option>Sering tidak akurat</option>
                            <option>Tidak Tahu</option>
                        </select>

                    </div>

                    {/* Kejelasan */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Apakah informasi mudah dipahami?
                        </label>

                        <select
                            name="infoClarity"
                            value={form.infoClarity}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3"
                        >
                            <option value="">Pilih</option>
                            <option>Sangat Jelas</option>
                            <option>Cukup Jelas</option>
                            <option>Kurang Jelas</option>
                            <option>Sulit Dimengerti</option>
                        </select>

                    </div>

                    {/* Kategori */}

                    <div>

                        <label className="mb-2 block font-medium">
                            Informasi yang sering dicari
                        </label>

                        <select
                            name="infoCategory"
                            value={form.infoCategory}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3"
                        >
                            <option value="">Pilih</option>
                            <option>Agenda Kota</option>
                            <option>Pengumuman Pemerintah</option>
                            <option>Layanan Publik</option>
                            <option>Berita</option>
                            <option>Lainnya</option>
                        </select>

                    </div>

                    {/* Saran */}

                    <div>

                        <label className="mb-3 block font-medium">
                            Apakah ada informasi yang perlu ditambahkan?
                        </label>

                        <div className="flex gap-6">

                            <label className="flex items-center gap-2">

                                <input
                                    type="radio"
                                    name="infoSuggestion"
                                    value="Ya"
                                    checked={form.infoSuggestion === "Ya"}
                                    onChange={handleChange}
                                />

                                Ya

                            </label>

                            <label className="flex items-center gap-2">

                                <input
                                    type="radio"
                                    name="infoSuggestion"
                                    value="Tidak"
                                    checked={form.infoSuggestion === "Tidak"}
                                    onChange={handleChange}
                                />

                                Tidak

                            </label>

                        </div>

                    </div>

                    {/* Nama Email */}

                    <div className="grid gap-4 md:grid-cols-2">

                        <input
                            name="name"
                            placeholder="Nama Lengkap"
                            value={form.name}
                            onChange={handleChange}
                            className="rounded-xl border p-3"
                        />

                        <input
                            name="email"
                            placeholder="Alamat Email"
                            value={form.email}
                            onChange={handleChange}
                            className="rounded-xl border p-3"
                        />

                    </div>

                    {/* Pesan */}

                    {form.infoSuggestion === "Ya" && (

                        <textarea
                            name="message"
                            rows={5}
                            placeholder="Kritik dan saran..."
                            value={form.message}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3"
                        />

                    )}

                </div>

                {/* FOOTER */}

                <div className="flex justify-end gap-3 border-t p-6">

                    <button
                        onClick={onClose}
                        className="rounded-xl border px-6 py-3"
                    >
                        Batal
                    </button>

                    <button
                        disabled={loading}
                        onClick={submit}
                        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-white"
                    >
                        <Send size={18} />

                        {loading ? "Mengirim..." : "Kirim Penilaian"}

                    </button>

                </div>

            </div>

        </div>
    );
}