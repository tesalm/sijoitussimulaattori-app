import i18next from 'i18next';
import RNLanguages from 'react-native-languages';

import translations_en from './locales/en/translations.json';

console.log('######', RNLanguages);

const i18nInstance = i18next.init({
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    // React already does escaping
    escapeValue: false,
  },
  lng: RNLanguages.locale || 'en', // 'en' | 'fi'
  preload: ['en'],
  ns: ['translations'],
  defaultNS: 'translations',
  resources: {
    en: {
      translations: translations_en,
    },
  },
  react: { wait: true },
});

const t = i18next.t.bind(i18nInstance);
export default t;
