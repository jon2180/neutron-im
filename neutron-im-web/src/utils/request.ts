/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import { Cookie } from './cookie';
import AppConstants from '@/config/url.const';
import type { HttpResponseData } from '@/types/http';

export const codeMessage: {
  [id: number]: string;
} = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const UNAUTHORITED_NOTICE_KEY = 'UNAUTHORITED_NOTICE_KEY';
// const UNCONNECTTED_NOTICE_KEY = "UNCONNECTTED_NOTICE_KEY";
const REDIRECT_WAIT_TIME_IN_MS = 300;

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix: AppConstants.API_BASE_URL,
  timeout: 10000,
  mode: 'cors',
  credentials: 'include', // 默认请求是否带上cookie
  // 默认错误处理
  headers: {
    Authorization: Cookie.getCookie('Authorization'),
  },
  errorHandler(error): HttpResponseData {
    const { response } = error;
    console.error(error);
    // 网络错误
    if (!response) {
      // message.error({
      //   key: UNCONNECTTED_NOTICE_KEY,
      //   content: "连接服务器失败，可能是您的网络发生异常，或后台服务器未开启",
      // });
      return {
        status: 600 * 100,
        data: {},
        timestamp: Date.now(),
        message: '连接服务器失败，可能是您的网络发生异常，或后台服务器未开启',
      } as HttpResponseData;
    }

    // 未知原因
    if (!response.status) {
      return {
        status: 500,
        data: {},
        timestamp: Date.now(),
        message: '访问接口失败, 原因未知',
      } as HttpResponseData;
    }

    // 未授权页面
    if (response.status === 401 && window.location.pathname !== '/login') {
      // FIXME 测试设置了 key 之后 antd 会不会自动消除重复
      // message.destroy(NOTICE_KEY);
      message.destroy();
      message.error({
        content: '登录验证失败，请登录',
        key: UNAUTHORITED_NOTICE_KEY,
      });
      setTimeout(() => {
        notification.destroy();
        message.destroy();
        window.location.replace('/login');
      }, REDIRECT_WAIT_TIME_IN_MS);
    }

    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    message.error({
      content: `${status} ${errorText}`,
    });

    return {
      status: status * 100,
      data: {
        url,
      },
      timestamp: Date.now(),
      message: errorText,
    } as HttpResponseData;
  },
});

request.interceptors.response.use((handler, options) => {
  console.log(handler, options);
  return handler;
});

export default request;
