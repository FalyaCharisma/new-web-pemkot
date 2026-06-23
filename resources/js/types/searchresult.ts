export type SearchType = 'berita' | 'agenda' | 'fasilitas' | 'penghargaan';

export interface SearchResult {
    type: SearchType;

    title: string;
    description: string;
    image: string | null;

    date: string | null;
    location: string | null;

    url: string;
}

export interface SearchGroupedResult {
    berita: SearchResult[];
    agenda: SearchResult[];
    fasilitas: SearchResult[];
    penghargaan: SearchResult[];
}