import { config } from '../../config';

test('Config should have items set in Config', () => {
  expect(config).toStrictEqual({
    app: {
      STOCK_API_URL: 'http://fake-stock-url',
      PROFILE_API_URL: 'http://fake-profile-url',
    },
  });
});
