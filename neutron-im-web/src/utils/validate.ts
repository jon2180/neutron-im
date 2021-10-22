/**

## Valid email address format

A valid email address consists of an email prefix and an email domain, both in acceptable formats.

The **prefix** appears to the **left** of the @ symbol.

The **domain** appears to the **right** of the @ symbol.

For example, in the address _example@mail.com_, "example" is the email prefix, and "mail.com" is the email domain.

#### Acceptable email prefix formats

- Allowed characters: letters (a-z), numbers, underscores, periods, and dashes.
- An underscore, period, or dash must be followed by one or more letter or number.

| Invalid email prefixes: | Valid email prefixes: |
| --- | --- |
| abc-@mail.com | abc-d@mail.com |
| abc..def@mail.com | abc.def@mail.com |
| .abc@mail.com | abc@mail.com |
| abc#def@mail.com | abc\_def@mail.com |

#### Acceptable email domain formats

- Allowed characters: letters, numbers, dashes.
- The last portion of the domain must be at least two characters, for example: .com, .org, .cc

| Invalid email domains: | Valid email domains: |
| --- | --- |
| abc.def@mail.c | abc.def@mail.cc |
| abc.def@mail#archive.com | abc.def@mail-archive.com |
| abc.def@mail | abc.def@mail.org |
| abc.def@mail..com | abc.def@mail.com |

 * 邮箱验证
 * @param email 待测试的邮箱
 */
import type { NimSafeAny } from '@/types';

export const isEmail = (email: string): boolean =>
  /^[A-Za-z0-9]+([.+-_][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,14}$/.test(
    email,
  );



/**
 * 验证密码格式
 * @param password 密码
 */
export const isPassword = (password: string): boolean => /^\w{6,16}$/.test(password);

/**
 * 验证用户昵称
 * @param nickname 用户昵称
 */
export const isNickName = (nickname: string): boolean => /[A-Za-z0-9_\-\u4e00-\u9fa5]+/.test(nickname);

/**
 * 验证值空
 * @param value 字符串
 */
export const isEmpty = (value: string): boolean => !!value;

export function isNumber(data: string | number): boolean {
  if (typeof data === "number") {
    return true;
  }
  return /^[0-9]+.?[0-9]*$/.test(data);
}

export function isMoney(data: string | number): boolean {
  if (typeof data === 'number')
    return /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(data.toString());
  return /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(data);
}

export function isInteger(data: string | number): boolean {
  if (typeof data === 'number')
    return /^[0-9]*$/.test(data.toString());
  return /^[0-9]*$/.test(data);
}

export function isPhone(data: string): boolean {
  return /^(13[0-9]{9})|(145[0-9]{8})|(147[0-9]{8})|(149[0-9]{8})|(15[0-3]{1}[0-9]{8})|(15[5-9]{1}[0-9]{8})|(166[0-9]{8})|(171[0-9]{8})|(173[0-9]{8})|(17[5-8]{9})|(18[0-9]{9})|(198[0-9]{8})|(199[0-9]{8})$/.test(data);
}

export function isCard(data: string): boolean {
  return /^(62[0-9]{17})|(356[0-9]{13})|(409[0-9]{13})(409[0-9]{13})(456[0-9]{16})(5[0-9]{15})$/.test(data);
}

export function isLandline(data: string): boolean {
  return /^(0[0-9]{10})$/.test(data);
}

export function isExist(data: NimSafeAny): boolean {
  return !(data === null || data === undefined || data === '');
}

export function strlen(str: string): number {
  let len = 0;
  for (let i = 0; i < str.length; i += 1) {
    const zf = str.charCodeAt(i);
    if ((zf >= 0x0001 && zf <= 0x007e) || (zf >= 0xff60 && zf <= 0xff9f)) {
      len += 1;
    } else {
      len += 2;
    }
  }
  return len;
}
