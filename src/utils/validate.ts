/**
 * 邮箱验证
 * @param email 待测试的邮箱
 */
export const isEmail = (email: string) =>
  /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(email);

/**
 * 验证密码格式
 * @param password 密码
 */
export const isPassword = (password: string) => /^\w{6,16}$/.test(password);

/**
 * 验证用户昵称
 * @param nickname 用户昵称
 */
export const isNickName = (nickname: string) =>
  /[A-Za-z0-9_\-\u4e00-\u9fa5]+/.test(nickname);

/**
 * 验证值空
 * @param value 字符串
 */
export const isEmpty = (value: string) => !!value;
