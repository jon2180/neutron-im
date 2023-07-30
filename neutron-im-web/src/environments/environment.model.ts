interface NetworkConfig {
  /**
     * 前端部署的基础地址
     */
  baseUrl: string,

  /**
   * 服务端部署的基础地址
   */
  baseApiUrl: string,

  /**
   * websocket 服务运行地址
   */
  baseWsUrl: string;
}

interface AssetUrlsConfig  {
  loginBackground: string;
  captcha: string;
  avatarUpload: string;
  pictureUpload: string;
  websocket: string;
}

export interface EnvironmentModel {
  /**
   * 是否是生产版本
   */
  production: boolean;

  /**
   * 网络 api 配置
   */
  network: NetworkConfig;

  assetUrls: AssetUrlsConfig;
}
