export interface HighlightPesona {
    id: number;

    kategori: {
        id: number;
        nama_kategori: string;
        icon: string;
    };

    judul: string;
    deskripsi: string;
    images: string[];

    highlight1_icon: string;
    highlight1_judul: string;
    highlight1_deskripsi: string;

    highlight2_icon: string;
    highlight2_judul: string;
    highlight2_deskripsi: string;

    highlight3_icon: string;
    highlight3_judul: string;
    highlight3_deskripsi: string;

    cta_judul: string;
    cta_deskripsi: string;
    cta_button: string;
    cta_kategori: number;
    cta_keyword: string;
}