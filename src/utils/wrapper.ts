
export async function hp<T>(promise: Promise<T>): Promise<[null, T] | [unknown, null]> {
  try {
    const res = await promise;
    return [null, res];
  } catch (err) {
    return [err, null];
  }
}
