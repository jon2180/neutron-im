/**
 * handlePromise 包裹 promise 错误，目的是避免在代码中重复使用 try...catch 语句块
 * @param promise Promise 对象
 * @returns 包含有错误信息和数据的元组 [错误信息，数据]
 */
export async function hp<T>(
  promise: Promise<T>
): Promise<[null, T] | [unknown, null]> {
  try {
    const res = await promise;
    return [null, res];
  } catch (err) {
    return [err, null];
  }
}

/**
 * 节流函数构造器
 * @param {Function} fn 原函数
 * @param {number} duration 时间间隔，在被调用后的此时长内不允许重复调用
 * @returns {Function}
 */
export function throttle(
  this: any,
  fn: Function,
  duration: number = 500
): Function {
  if (!fn || typeof fn !== "function") {
    console.trace("错误参数类型，不能节流");
    return fn;
  }

  let timeLast: number | null = null;
  return (...args: any[]) => {
    const timeNow: number = Date.now();
    if (!timeLast || timeNow - timeLast > duration) {
      fn.apply(this, args);
      timeLast = timeNow;
    }
  };
}

/**
 * 防抖函数构造器
 * @param {Function} fn 原函数
 * @param {number} delay 时间延迟，在被调用后的此时长后才开始运行，如果在此段时间，重复调用，则重新计时
 * @returns {Function}
 */
export function debounce(
  this: any,
  fn: Function,
  delay: number = 500
): Function {
  if (!fn || typeof fn !== "function") {
    console.trace("错误参数类型，不能进行防抖构造");
    return fn;
  }
  let timer: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * read files
 * @param file
 * @param fn handle function, will be executed after file loaded
 */
// export const readFile = (file: Blob, fn: (this: FileReader, ev: ProgressEvent<FileReader>) => any) => {
//   const fileHandle = new FileReader();
//   fileHandle.readAsDataURL(file);
//   fileHandle.onload = fn;
// };

/**
 * compress picture
 * @param file
 * @param fn parameters assignment
 * @example compressPicture(file, (data) => { this.images.push(data); });
 */
// export const compressPicture = (file: Blob, fn: (data: { base64: string, name: string }) => void) => {
//   console.log("compressing picture...");
//   readFile(file, (e) => {
//     if (!e || !e.target) {
//       console.error('图片处理失败，空事件');
//       return;
//     }
//     const base64 = e.target.result as string;
//     // 这里quality的范围是(0-1)
//     const quality = 0.1;
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const imgHandle = new Image();
//     imgHandle.src = base64;
//     imgHandle.onload = () => {
//       const { width } = imgHandle;
//       canvas.width = width;
//       canvas.height = width * (imgHandle.height / imgHandle.width);
//       if (!ctx) {
//         console.log('图片处理，canvas绘制失败');
//         return;
//       }
//       ctx.drawImage(imgHandle, 0, 0, canvas.width, canvas.height);
//       const data = canvas.toDataURL("image/jpeg", quality);
//       fn({ base64: data, name: file.name });
//     };
//   });
// };
