
type layoutPropType = {
    children: React.ReactNode,
    params: { lang: any }
}

type ssrPropType = {
    params: { lang: any, id: string },
    searchParams: filterType,
}

type paginationPropType = {
    lang: string,
    dic: any,
    params: filterType,
    pages: number,
    activePage: number,
    perPage: number,
    total: number
}

type wrapperPropType = {
    lang: string,
    dic: any,
    params: filterType,
    tags: string[],
}

type readButtonPropType = {
    lang: string;
    cssClasses: string;
    post: any;
    searchParams: filterType;
    text: string;
}

type filterType = {
    page: number,
    perPage: number,
    tags: string,
    search: string,
    sort: string,
    sortFlow: string
}
