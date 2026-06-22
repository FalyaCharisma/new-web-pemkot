import { Kategori } from "./kategori";

export interface Berita {
    id: number;
    id_kategori: number;
    kategori: Kategori | null;
    judul: string;
    slug: string;
    tanggal: string;
    author: string;
    deskripsi: string;
    images: string;
    created_at_formatted: string;
}

