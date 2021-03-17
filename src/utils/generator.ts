export const upperCaseStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const lowerCaseStr = 'abcdefghijklmnopqrstuvwxyz';
export const numbersStr = '0123456789';

export const baseStr = upperCaseStr + lowerCaseStr + numbersStr;

export function generateAccountId({
  prefix = '',
  length = 10,
  ext = '',
}: {
  prefix?: string;
  length?: number;
  ext?: string;
}): string {
  let uid = prefix || '';
  for (let i = 0; i < (length || 10); i += 1) {
    uid += baseStr[Math.floor(Math.random() * baseStr.length)];
  }
  uid += ext;
  return uid;
}

export function generatePassword(): string {
  return '';
}

export function generateCaptcha(length = 6): string {
  let res = '';
  for (let i = 0; i < length; i += 1) {
    res += baseStr[Math.floor(Math.random() * baseStr.length)];
  }
  return res;
}