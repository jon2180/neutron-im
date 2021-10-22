import type { ResponseError } from "umi-request";

/**
 * handlePromise 包裹 promise 错误，目的是避免在代码中重复使用 try...catch 语句块
 * @param promise Promise 对象
 * @returns 包含有错误信息和数据的元组 [错误信息，数据]
 */
export async function hp<T, E extends Error>(
  promise: Promise<T>
): Promise<[null, T] | [E, null]> {
  try {
    const res = await promise;
    return [null, res];
  } catch (err) {
    return [err as E, null];
  }
}

export async function hpre<T>(promise: Promise<T>): Promise<
  | [null, T]
  | [
      ResponseError<{
        error: string;
        message: string;
        detail: any;
      }>,
      null
    ]
> {
  try {
    const res = await promise;
    return [null, res];
  } catch (err) {
    return [err as ResponseError, null];
  }
}

interface LoadingStatus {
  loading: "idle" | "pending";
  error?: any;
}

/**
 * 信号量工厂
 * @returns 信号量工厂
 */
export function createSemaphore(): LoadingStatus {
  const loadingStatus: LoadingStatus = {
    loading: "idle",
    error: "",
  };

  return {
    get loading() {
      return loadingStatus.loading;
    },
    set loading(loading: LoadingStatus["loading"]) {
      loadingStatus.loading =
        loading !== "idle" && loading !== "pending" ? "idle" : loading;
    },
    get error() {
      return loadingStatus.error;
    },
    set error(error: any) {
      loadingStatus.error = error;
    },
  };
}
