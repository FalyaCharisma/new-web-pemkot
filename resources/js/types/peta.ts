export interface Peta {
    id: number;
    name: string;
    slug: string;
    desc: string;

    category_id: number | null;
    category: string | null;
    icon: string;

    lat: number;
    lng: number;
    foto?: string | null;

    jam_buka?: string | null;
    jam_tutup?: string | null;
    map?: string | null;

    has_video: boolean;
    video_url?: string | null;
}