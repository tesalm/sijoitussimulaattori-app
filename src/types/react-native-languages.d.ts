declare module 'react-native-languages' {
  import I18n from 'i18n-js';

  export default I18n;

  export const getLanguages: () => Promise<string[]>;
}
