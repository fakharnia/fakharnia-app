export interface IService {
    _id: string;
    fa_title: string;
    en_title: string;
    deu_title: string;

    priority: number;

    coverUrl: string;
    coverAlt: string;

    fa_fileUrl: string;
    en_fileUrl: string;
    deu_fileUrl: string;
}