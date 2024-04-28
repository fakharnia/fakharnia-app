export interface IResume {
    fa_aboutMe: string;
    en_aboutMe: string;
    deu_aboutMe: string;
    fa_text: string;
    en_text: string;
    deu_text: string;
    fa_education: string;
    en_education: string;
    deu_education: string;
    fileUrl: string;
    avatarUrl: string;
    fa_hobbies: string;
    en_hobbies: string;
    deu_hobbies: string;
    contacts: IContact[],
    languages: ILanguage[],
    skills: ISkill[]
}

export interface IContact {
    link: string;
    priority: number;
    iconClass: string;
}

export interface ILanguage {
    title: string;
    speakingRate: number;
    readingRate: number;
    writingRate: number;
    listeningRate: number;
}

export interface ISkill {
    title: string;
    priority: number;
    fileAlt: string;
    fileUrl: string;
    fa_description: string;
    en_description: string;
    deu_description: string;
    rate: number;
}