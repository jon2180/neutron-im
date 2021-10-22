import { generateCaptcha } from '@/utils/generators';

describe('test generate captcha', () => {
  test('test captcha', () => {
    expect(generateCaptcha(6).length).toEqual(6);
    // expect(generateCaptcha(6)).
  });
});
