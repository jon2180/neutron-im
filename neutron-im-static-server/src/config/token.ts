import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { dirRoot } from './paths';

/** 私钥，签发 toke 时使用私钥 */
const privateKey = fs.readFileSync(path.join(dirRoot, 'config/rsa_private_key.pem'));
/** 公钥，解密 token 时使用公钥 */
const publicKey = fs.readFileSync(path.join(dirRoot, 'config/rsa_public_key.pem'));

/** token配置，可考虑放到 config 中 */
const tokenConfig: jwt.SignOptions = {
  algorithm: 'RS256',
  expiresIn: '7d',
  issuer: 'jon2180@outlook.com',
  subject: 'neutron-im',
};

/**
 * 给用户发布 token，假定参入参数是正确有效的
 * @param data 参数
 */
export function sign(data: string | Record<string, unknown> | Buffer):string {
  return jwt.sign({
    data,
  }, privateKey, tokenConfig);
}
/**
 * 验证 token 的合法性，不合法时会抛出一个错误
 * @param {string} token 用户传递过来的 token
 */
export function verify(token: string): string | Record<string | number | symbol, unknown> {
  return jwt.verify(token, publicKey, tokenConfig) as
    string | Record<string | number | symbol, unknown>;
}
