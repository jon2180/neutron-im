import { generateCaptcha } from "@/utils/generator";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "//localhost:3001";
// TODO for seperate static file server
// const STATIC_FILE_SERVER = process.env.REACT_APP_STATIC_FILE_SERVER || "//localhost:3002"

const AppConstants = {
  get API_BASE_URL() {
    return API_BASE_URL;
  },

  /**
   * 登录页面背景壁纸
   */
  get LOGIN_BG_URL() {
    return `${API_BASE_URL}/login-bg-hnpoppcv.jpeg`;
  },

  /**
   * 验证码获取地址
   */
  get CAPTCHA_URL() {
    return `${API_BASE_URL}/captcha-pic?id=${generateCaptcha()}`;
  },

  /**
   * 头像上传地址
   */
  get AVATAR_UPLOAD_URL() {
    return `${API_BASE_URL}/accounts/avatar`;
  },

  /**
   * 聊天图片上传地址
   */
  get PIC_UPLOAD_URL() {
    return `${API_BASE_URL}/upload/chat-img`;
  },

  get WEBSOCKET_URL() {
    return `ws://${API_BASE_URL}`;
  },
};

export default AppConstants;
