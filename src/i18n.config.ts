export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fa']
};
export type Locale = (typeof i18n)['locales'][number]