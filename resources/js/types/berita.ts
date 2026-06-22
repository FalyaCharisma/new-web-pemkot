export interface KategoriBerita {
    id: number;
    nama_kategori: string;
}

export interface Berita {
    id: number;
    id_kategori: number;
    kategori: KategoriBerita | null;
    judul: string;
    slug: string;
    tanggal: string;
    author: string;
    deskripsi: string;
    images: string;
}

