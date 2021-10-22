import hash from 'hash.js';

/**
 * 返回随机获得的盐值，用于用户密码的组合加密
 * @param saltLength 盐值的长度
 * @return {string} 得到的字符串
 * @example 10 => afagdsgdsl
 */
function generateSalt(saltLength = 32):string {
  let salt = Math.random().toString(32).substring(2);
  while (salt.length !== saltLength) {
    if (salt.length > saltLength) {
      salt = salt.slice(salt.length - saltLength);
    } else {
      salt += Math.random().toString(32).substring(2);
    }
  }
  return salt;
}

/**
 * 加密密码
 */
export function encryptPwdAndSalt(password:string, salt:string):string {
  return hash.sha256().update(salt + password).digest('hex');
}

// TODO
/**
 * @param password 密码
 * @returns [salt, password]
 */
export default function encrypt(password: string):[string, string] {
  const salt = generateSalt();
  const encryptedPwd = encryptPwdAndSalt(password, salt);
  return [salt, encryptedPwd];
}
