export type SearchType = 'berita' | 'agenda' | 'fasilitas' | 'penghargaan' | 'dokumen'| 'galeri';

export interface SearchResult{
    type:string
    title:string
    description:string
    image?:string | null
    images?:string[]
    date:string
    location?:string | null
    url:string
}


export interface SearchSection{
    items: SearchResult[]
    total:number
}

export interface SearchGroupedResult{

    berita:SearchSection

    agenda:SearchSection

    fasilitas:SearchSection

    penghargaan:SearchSection

    dokumen:SearchSection

    galeri:SearchSection

}