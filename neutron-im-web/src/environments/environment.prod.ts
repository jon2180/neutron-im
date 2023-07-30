import { EnvironmentModel } from "./environment.model";

export const environment: EnvironmentModel = {
  production: true,

  network: {
    baseUrl: 'https://im.showmecode.cc',
    baseApiUrl: 'https://im.showmecode.cc/apis',
    baseWsUrl: 'wss://im.showmecode.cc'
  },

  // TODO
  assetUrls: {
    loginBackground: '/static/login-bg-hnpoppcv.jpeg',
    captcha: '/captcha-pic?id=${generateCaptcha()}',
    avatarUpload: '/accounts/avatar',
    pictureUpload: '/upload/chat-img',
    websocket: 'ws://${API_BASE_URL}'
  }
};
