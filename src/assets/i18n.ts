import i18next from 'i18next';

/*
HOW TO USE?

On your .tsx-file:

-inclue: import i18next from '../assets/i18n';

Use translations as props:
{i18next.t('hello.hello')}
{i18next.t('hello.world')}

*/

i18next.init({
  interpolation: {
    // React already does escaping
    escapeValue: false,
  },
  lng: 'en', // 'en' | 'fi'
  resources: {
    en: {
      translation: {
        //View
        hello: {
          //Texts in view
          hello: 'Hello',
          world: 'world',
        },
      },
    },
  },
});

export default i18next;
