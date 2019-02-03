import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

import { FirebaseGeneralMock } from '../tools/mocks/firebase';

import 'react-native-mock-render/mock';

configure({ adapter: new Adapter() });

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {
    RN_STOCK_API_URL: 'http://fake-stock-url',
    RN_PROFILE_API_URL: 'http://fake-profile-url',
  },
}));

jest.mock('react-native-firebase', () => {
  return {
    ...FirebaseGeneralMock,
  };
});

jest.mock('react-native-languages', () => ({
  __esModule: true,
  default: { locale: 'en' },
  Languages: {
    language: 'en',
    languages: ['en'],
  },
}));

// Mock react navigation dependency to avoid MockNativeMethods lib error
jest.mock('react-native-safe-area-view', () => ({ default: () => null }));

// Mock native animated helpor to avoid test warnings related to native dependencies
jest.mock('NativeAnimatedHelper');

// Set up jsdom with RN:
// (modified from https://github.com/kentcdodds/react-testing-library/issues/22)

// used to fully render native components as react components
const { window } = new JSDOM();

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

// React doesn't like some of the props that are set on native components
// (that eventually are set on DOM nodes), so suppress those warnings:
const suppressedErrors = [
  'React does not recognize the.*prop on a DOM element',
  'Unknown event handler property',
  'is using uppercase HTML',
  'Received `true` for a non-boolean attribute `accessible`',
  'The tag.*is unrecognized in this browser',
  '.*is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements',
  'Warning: Received `%s` for a non-boolean attribute `%s`.',
];
const realConsoleError = console.error;
console.error = (message) => {
  if (message.match(new RegExp(`(${suppressedErrors.join('|')})`))) {
    return;
  }
  realConsoleError(message);
};

// Copy props needed to render HTML from
// JSDOM window to node's global object:
function copyProps(src, target) {
  Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === 'undefined')
    .forEach((prop) => {
      target[prop] = src[prop];
    });
}
