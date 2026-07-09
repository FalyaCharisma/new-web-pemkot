export interface Peta {
    id: number;
    name: string;
    desc: string;
    category: string;
    icon?: string;
    lat: number;
    lng: number;
    foto?: string;
    slug: string;

    jam_buka: string | null;

    jam_tutup: string | null;

    has_video: boolean;

    video_url: string | null;
}
