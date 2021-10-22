/**
 * check
 * @param {string} email
 */
export function isEmail(email: string): boolean {
  return /^[A-Za-z0-9]+([.+-_][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,14}$/.test(email);
  // return /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(email);
}

export function isNickName(nickname: string): boolean {
  return /[A-Za-z0-9_\-\u4e00-\u9fa5]+/.test(nickname);
}

export function isPassword(password: string):boolean {
  return /^\w{6,16}$/.test(password);
}

export default function check(param: string | number): {
  email: () => boolean;
  nickname: () => boolean,
  password: () => boolean,
} | {

} | null {
  if (typeof param === 'number') {
    return {};
  }

  if (typeof param === 'string') {
    return {
      email() {
        return isEmail(param);
      },
      nickname() {
        return isNickName(param);
      },
      password() {
        return isPassword(param);
      },
    };
  }

  return null;
}
