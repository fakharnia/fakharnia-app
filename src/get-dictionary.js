import 'server-only'

const dictionaries = {
    fa: () => import('./dictionaries/fa.json').then((module) => module.default),
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    de: () => import('./dictionaries/de.json').then((module) => module.default),
}

export const getDictionary = async (locale) => {
    return dictionaries[locale]() ?? dictionaries.en()
}
