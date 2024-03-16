export interface IDictionary {
    welcome: IWelcomeDictionary;
    menu: IMenuDictionary[];
    landing: ILandingDictionary;
    portfolio: IPortfolioDictionary;
    projects: IProjectDictionary;
    blog: IBlogDictionary;
    resume: string;
    service: string;
    panel: string;
}

export interface IWelcomeDictionary {
    title: string;
    text: string;
    button: string;
}

export interface IMenuDictionary {
    title: string;
    link: string;
}

export interface ILandingDictionary {
    statusButton: string;
    readButton: string;
    contact: string;
    blog: string;
}

export interface IPortfolioDictionary {
    title: string;
    projectTitle: string;
    designTitle: string;
    moreButton: string;
    downloadtext: string;
    project: string;
    design: string;
}

export interface IProjectDictionary {
    domain: string;
    tech: string;
    button: string;
}

export interface IBlogDictionary {
    tag: string;
    search: string;
    sort: string;
    sorts: ISortDictionary;
    page: string;
    counter: string;
    view: string;
    time: string;
    read: string;
}

export interface ISortDictionary {
    title: IKeyValue;
    view: IKeyValue;
    date: IKeyValue;
}

export interface IKeyValue {
    key: string;
    value: string
}

