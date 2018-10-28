import i18next from 'i18next';

/*
HOW TO USE?

On your .tsx-file:

-inclue: import i18next from '../Texts/i18n';

and then add texts similar than below, and use them as props:
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
