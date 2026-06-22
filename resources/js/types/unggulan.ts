import { Kategori } from "./kategori";

export interface PesonaUnggulan {
    id: number;
    cover: string | null;
    judul: string;
    slug: string;
    id_kategori: number;
    kategori: Kategori | null;
    deskripsi: string;
    view: number;
    fyi: string;
    judul_video: string;
    deskripsi_video: string;
    url_video: string;
    created_at: string;
    updated_at: string;
    created_at_formatted: string;
}