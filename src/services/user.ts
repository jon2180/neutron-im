import request from "@/utils/request";
import type { HttpResponseData } from "@/types/http";

/**
 * 登录参数类型
 */
export interface LoginParams {
  email: string;
  password: string;
  captcha: string;
}

/**
 *
 * @param params 注册参数类型
 */
export interface RegisterParams {
  // TODO 设计接口
  email: string;
  nickname: string;
  password: string;
  captcha: string;
}

/**
 * 用户信息更新参数
 */
export interface UserInfoUpdateParams {
  nickname?: string;
  signature?: string;
  gender?: string;
  birthday?: string;
}

export interface UserinfoQueryParams {
  uid?: string;
}

/**
 * 登录接口
 * @param data 登录参数
 */
export function postAccountLogin(
  params: LoginParams
): Promise<HttpResponseData> {
  return request.post("/login", { data: params, credentials: "include" });
}

/**
 * 退出登录
 */
export function postLogout(): Promise<HttpResponseData> {
  return request.post("/logout", { credentials: "include" });
}

/**
 * 注册
 */
export function postAccount(params: RegisterParams): Promise<HttpResponseData> {
  return request.post("/register", { data: params, credentials: "include" });
}

export function getUserInfo(): Promise<HttpResponseData> {
  return request.get("/accounts/");
}

/**
 * 获取用户信息
 */
export function getAccountInfo({
  uid,
  ...params
}: UserinfoQueryParams): Promise<HttpResponseData> {
  // TODO
  if (uid)
    return request.get(`/accounts/${encodeURIComponent(uid)}`, { params });
  return request.get(`/accounts/`);
}

/**
 * 更新用户信息
 * @param params 更新用户信息
 */
export function putUserInfo(params: UserInfoUpdateParams) {
  return request.put(`/accounts/`, {
    data: params,
  });
}

export function deleteUser() {
  return request.delete(`/accounts/`);
}
