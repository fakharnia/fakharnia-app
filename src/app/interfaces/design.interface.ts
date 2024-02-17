export interface IUiImage {
    priority: number;
    fileAlt: string;
    fileUrl: string;
    isCover: string;
}

export interface IDesign {
    fa_title: string;
    en_title: string;
    deu_title: string;
    priority: number;
    fa_description: string;
    en_description: string;
    deu_description: string;
    images: any;
    coverUrl: string;
    coverAlt: string;
    key: string;
}