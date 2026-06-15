export interface Kecamatan {
    kd_kecamatan: string;
    nm_kecamatan: string;
}

export interface Kelurahan {
    id: number;
    kd_kecamatan: string;
    nm_kelurahan: string;
    jml_penduduk?: string;
    link?: string;

    kecamatan?: Kecamatan;
}