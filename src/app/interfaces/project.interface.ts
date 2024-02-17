export interface ITechnology {
    _id: string;
    name: string;
    fa_description: string;
    en_description: string;
    deu_description: string;

}

export interface IProject {
    _id: string;
    fa_name: string;
    en_name: string;
    deu_name: string;
    key: string;
    priorityd: string;

    fa_descriptione: string;
    en_descriptione: string;
    deu_description: string;

    url: string;
    lightLogoUrl: string;
    darkLogoUrl: string;

    logoAlt: string;
    fa_techDescription: string;

    en_techDescription: string;

    deu_techDescription: string;

    technologies: ITechnology[];

}
