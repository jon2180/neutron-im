/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend, ResponseError } from "umi-request";
import { notification } from "antd";

const codeMessage: {
  [id: number]: string;
} = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

type A = keyof typeof codeMessage;

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError<any>) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });

    if (response.status === 401) {
      setTimeout(() => {
        window.location.replace("/login");
      }, 200);
    }
  } else if (!response) {
    notification.error({
      description: "您的网络发生异常，无法连接服务器",
      message: "网络异常",
    });
  }
  return response;
};

export const Cookie = {
  getCookieMap() {
    const cookieMap: {
      [key: string]: string;
    } = {};
    // cookie`s format:  xxx=xxxx; yyy=yyyyy;
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; ++i) {
      let [key, val] = cookies[i].split("=");
      if (key && val) cookieMap[key.trim()] = val.trim();
    }
    return cookieMap;
  },
  getCookie(key: string) {
    let val = this.getCookieMap()[key];
    if (val !== null && val !== undefined) return val;
    return "";
  },
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix: "http://localhost:3001",
  timeout: 2000,
  errorHandler, // 默认错误处理
  mode: "cors",
  credentials: "include", // 默认请求是否带上cookie
  // headers: {
    // 根据 https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
    // Authorization 头的格式如下：
    // Authorization: <type> <credentials>
  //   Authorization: Cookie.getCookie("Authorization"),
  // },
});

// request.interceptors.response.use(async (response) => {
//   // 克隆响应对象做解析处理
//   // 这里的res就是我们请求到的数据
//   const res = await response.clone().json();
//   const { code, desc } = res;
//   if (code !== 0) {
//     console.log("error", res);
//     notification.error({
//       message: "请求错误",
//       description: `${code}: ${desc}`,
//     });
//     // 在处理结果时判断res是否有值即可
//     return;
//   }
//   return res;
// });

export default request;
