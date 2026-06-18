interface Dokumen {
    id:number
    judul:string
    dokumen:string
    tanggal:string
}


interface Props{
    dokumen:any

    totalDokumen:number

    rentang:{
        awal:number
        akhir:number
    }
}