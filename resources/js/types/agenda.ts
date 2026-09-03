export interface Agenda {
    id: number;
    tanggal_mulai: string;
    tanggal_selesai: string;
    judul_acara: string;
    lokasi_acara: string;
    maps_lokasi: string | null;
    banner: string | null;
    deskripsi: string;
    status_enabled: number;
    created_at: string;
    updated_at: string;

    // Field tambahan dari controller
    is_ongoing?: boolean;
    is_upcoming?: boolean;
    is_finished?: boolean;
    status_label?: string;

    tanggal_mulai_formatted?: string;
    tanggal_selesai_formatted?: string;
}