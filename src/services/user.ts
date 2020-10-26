import request from "../utils/request";
// import { Random } from "mockjs";
import { LoginStateType /* CurrentUser */ } from "./api";
import { IHTTPResponse /* IFriendListItem */ } from "../types";

/**
 * 登录参数类型
 */
export interface LoginParamsType {
  email: string;
  password: string;
  captcha: string;
}

/**
 * 登录接口
 * @param data 登录参数
 */
export function postAccountLogin(
  params: LoginParamsType
): Promise<IHTTPResponse<LoginStateType>> {
  return request.post("/login", {
    data: params,
  });
}

/**
 * 获取验证码
 */
export function getCaptcha() {
  return request.get("/login/captcha", {
    params: {},
  });
}

/**
 * 退出登录
 */
export function getOutLogin() {
  return request.get("/login/outLogin");
}

/**
 *
 * @param params 注册参数类型
 */
export interface RegisterParamsType {
  // TODO 设计接口
  username: string;
  password: string;
  captcha: string;
}

/**
 * 注册
 */
export function postAccount(
  params: RegisterParamsType
): Promise<IHTTPResponse<any>> {
  return request.post("/account", {
    data: params,
  });
}

export interface UserinfoQueryParamsType {
  id: string;
}

/**
 * 获取用户信息
 */
export function getUserInfo(
  params: UserinfoQueryParamsType
): Promise<IHTTPResponse<any>> {
  // TODO
  return request.get(`/account/${params.id}`);
}

/**
 * 用户信息更新参数
 */
export interface UserInfoUpdateParamsType {
  id: string;
  username?: string;
  avatar?: string;
  signature?: string;
}

/**
 * 更新用户信息
 * @param params 更新用户信息
 */
export function putUserInfo(params: UserInfoUpdateParamsType) {
  return request.put(`/account/${params.id}`, {
    data: params,
  });
}

export function deleteUser(params: UserinfoQueryParamsType) {
  return request.delete(`/account/${params.id}`);
}
