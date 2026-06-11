export interface Jabatan {
    id: number;
    nama_jabatan: string;
}

export interface Pimpinan {
    id: number;
    nama_pimpinan: string;
    foto: string;
    deskripsi?: string;
    jabatan?: Jabatan;
}

export interface Opd {
    id: number;
    nama: string;
    logo?: string;
    alamat?: string;
    website?: string;
    kategori: number;
    detail_opd?: string;
    pimpinan?: Pimpinan;
}

export interface KategoriOpd {
    id: number;
    nama: string;
    slug: string;
    opd: Opd[];
}