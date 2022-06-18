import { EnvironmentModel } from "./environment.model";

export const environment: EnvironmentModel = {
  production: true,

  network: {
    baseUrl: 'https://im.showmecode.cc',
    baseApiUrl: 'https://im.showmecode.cc/apis',
    baseWsUrl: 'wss://im.showmecode.cc'
  }
};
