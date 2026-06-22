export interface FotoAlbum {
    id: number;
    nama_foto: string;
    foto: string;
}

export interface Album {
    id: number;
    judul: string;
    created_at: string;
    fotos?: FotoAlbum[];
}

export interface PaginatedAlbums {
    data: Album[];
    links: any;
    meta: any;
}