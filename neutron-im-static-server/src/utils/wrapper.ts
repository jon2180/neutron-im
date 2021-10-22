/**
 * 包装 promise，用于处理promise的错误
 * @param {Promise} promise 待包装的promise
 */
export async function hp<T>(
  promise: Promise<T>,
): Promise<[unknown, T | null]> {
  try {
    const res = await promise;
    return [null, res];
  } catch (err: unknown) {
    return [err, null];
  }
}

export async function hpa<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends any[]
>(promise: Promise<T>): Promise<[null, ...T] | [unknown]> {
  try {
    const res = await promise;
    return [null, ...res];
  } catch (err: unknown) {
    return [err];
  }
}
