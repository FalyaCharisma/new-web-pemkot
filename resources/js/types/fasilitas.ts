export interface FasilitasKota {
    id: number;

    nama: string;
    slug?: string;

    foto: string | null;

    alamat: string | null;
    telp: string | null;

    kategori_id: number;
    sub_kategori_id: number;

    kategori?: {
        id: number;
        nama_kategori: string;
    };

    sub_kategori?: {
        id: number;
        nama_sub: string;
    };

    rating?: number;
    total_ulasan?: number;

    status_enabled?: number;
    map: string;
}