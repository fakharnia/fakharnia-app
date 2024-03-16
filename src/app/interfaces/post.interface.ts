export interface IPost {
    _id: string;
    fa_title: string;
    en_title: string;
    deu_title: string;
    createdAt: Date;
    updateAt: Date;
    coverUrl: string;
    coverAlt: string;
    fa_fileUrl: string;
    en_fileUrl: string;
    deu_fileUrl: string;
    estimateTimeInMinutes: number;
    tags: string[];
    Views: any[];
    Shares: number;
    Comments: any[]
}