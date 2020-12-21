import { isEmail } from './validate';

// 1、正确数据
// 2、错误数据-只输入空白、空或者回车
// 3、错误数据-只输入字母
// 4、错误数据-只输入数字
// 5、错误数据-只输入特殊字符
// 6、错误数据-输入以上数据的组合
// 7、错误数据-缺少@符号，例如email163.com
// 8、错误数据-缺少黑点“.”，例如email@163com
// 9、错误数据-缺少com、cn、net、hotmail等，例如：email@163.
// 10、错误数据-@符号位置不正确，例如：email163@.com、email163.@com、email163.com@等
// 11、错误数据-黑点“.”位置不正确，例如：email.@163.com、email@.163com、email@163com.
// 12、错误数据-邮箱名长度小于最小值，或者大于最大值
describe('check Email format', () => {
  test('email address must contain the \'@\' character', () => {
    expect(isEmail('zxcvb.com')).toBeFalsy();
    expect(isEmail('zx_cvbnm')).toBeFalsy();
    expect(isEmail('zx13cvb4-nm')).toBeFalsy();
    expect(isEmail('12457852369')).toBeFalsy();
  })

  test('@ character must be in the middle of email address', () => {
    expect(isEmail('email163.com@')).toBeFalsy();
    expect(isEmail('@email163.com')).toBeFalsy();
  })

  test('email should only contain numbers, letters, periods, underscore and dashes', () => {
    expect(isEmail('exc%ffa@foo.com')).toBeFalsy();
    expect(isEmail('exc&ffa@foo#dd.com')).toBeFalsy();
    expect(isEmail('exc*ffa@foo*dd.com')).toBeFalsy();
    expect(isEmail('exc!ffa@foo!dd.com')).toBeFalsy();
    expect(isEmail('exc#ffa@foo#dd.com')).toBeFalsy();
    expect(isEmail('exc=ffa@foo=dd.com')).toBeFalsy();
  })

  test('prefix should begin and end with numbers or letters', () => {
    // abc@abc.com is a email address
    expect(isEmail('_abc@abc.com')).toBeFalsy();
    expect(isEmail('abc_@abc.com')).toBeFalsy();
    expect(isEmail('_abc_@abc.com')).toBeFalsy();
    expect(isEmail('.abc@abc.com')).toBeFalsy();
    expect(isEmail('abc.@abc.com')).toBeFalsy();
    expect(isEmail('_abc.@abc.com')).toBeFalsy();
    expect(isEmail('-abc@abc.com')).toBeFalsy();
    expect(isEmail('abc-@abc.com')).toBeFalsy();
    expect(isEmail('-abc-@abc.com')).toBeFalsy();
  })

  test('prefix should not have continuous periods, dashes and underscores', () => {
    expect(isEmail('exa__mple@fa.com')).toBeFalsy();
    expect(isEmail('exa..mple@fa.com')).toBeFalsy();
    expect(isEmail('exa--mple@fa.com')).toBeFalsy();
    expect(isEmail('exa-.mple@fa.com')).toBeFalsy();
    expect(isEmail('exa._mple@fa.com')).toBeFalsy();
    expect(isEmail('exa_-mple@fa.com')).toBeFalsy();
    expect(isEmail('exa_*mple@fa.com')).toBeFalsy();
  })

  test('domain must be complete', () => {
    expect(isEmail('email@163')).toBeFalsy();
    expect(isEmail('email@com')).toBeFalsy();
    expect(isEmail('email@163com')).toBeFalsy();
    // pass
    expect(isEmail('email@163.com')).toBeTruthy();
    expect(isEmail('email@vip.163.com')).toBeTruthy();
  })

  test('domain should begin with numbers or letters and end with letteers', () => {
    // abc@abc.com is a email address
    expect(isEmail('abc@_abc.com')).toBeFalsy();
    expect(isEmail('abc@abc.com_')).toBeFalsy();
    expect(isEmail('abc@_abc.com_')).toBeFalsy();
    expect(isEmail('abc@abc.com.')).toBeFalsy();
    expect(isEmail('abc@.abc.com')).toBeFalsy();
    expect(isEmail('abc@_abc.com.')).toBeFalsy();
    expect(isEmail('abc@abc.com-')).toBeFalsy();
    expect(isEmail('abc@-abc.com')).toBeFalsy();
    expect(isEmail('abc@-abc.com-')).toBeFalsy();
  })

  test('domain should not have continuous periods, dashes and underscores', () => {
    expect(isEmail('example@fa.foo__com')).toBeFalsy();
    expect(isEmail('example@fa.foo..com')).toBeFalsy();
    expect(isEmail('example@fa.foo--com')).toBeFalsy();
    expect(isEmail('example@fa.foo-.com')).toBeFalsy();
    expect(isEmail('example@fa.foo._com')).toBeFalsy();
    expect(isEmail('example@fa.foo_-com')).toBeFalsy();
    expect(isEmail('example@fa.foo_*com')).toBeFalsy();
  })
})