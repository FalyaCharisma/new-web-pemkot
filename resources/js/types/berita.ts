export interface KategoriBerita {
    id: number;
    nama_kategori: string;
}

export interface Berita {
    id: number;
    judul: string;
    slug: string;
    tanggal: string;
    author: string;
    deskripsi: string;
    images: string;

    id_kategori: number;
    eksklusif: number;

    kategori?:{
        id:number;
        nama_kategori:string;
    };
}