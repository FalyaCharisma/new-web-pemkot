export interface TentangKota {
    id: number;
    title: string;
    deskripsi: string;
    gambar?: string;
}

export interface SejarahKota {
    id: number;
    tahun: string;
    judul: string;
    deskripsi: string;
    gambar?: string;
}

export interface Pimpinan {
    id: number;
    nama_pimpinan: string;
    foto: string;
    deskripsi?: string;
    jabatan: {
        id: number;
        nama_jabatan: string;
    };
}

export interface StatistikKota {
    kecamatan: number;
    kelurahan: number;
    luas_wilayah: string;
    jumlah_penduduk: string;
}