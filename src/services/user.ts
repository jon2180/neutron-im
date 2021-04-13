import request from "@/utils/request";
import { HttpResponseData /* IFriendListItem */ } from "@/types/http";

/**
 * 登录接口
 * @param data 登录参数
 */
export function postAccountLogin(params: {
  email: string;
  password: string;
  captcha: string;
}): Promise<HttpResponseData> {
  return request.post("/login", { data: params });
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
 * 注册
 */
export function postAccount(params: {
  // TODO 设计接口
  email: string;
  nickname: string;
  password: string;
  captcha: string;
}): Promise<HttpResponseData> {
  return request.post("/register", { data: params });
}

export function getUserInfo(): Promise<HttpResponseData> {
  return request.get("/accounts/");
}

/**
 * 获取用户信息
 */
export function getAccountInfo(params: {
  uid?: string;
}): Promise<HttpResponseData> {
  // TODO
  if (params.uid) return request.get(`/accounts/${params.uid}`);
  return request.get(`/accounts/`);
}

/**
 * 更新用户信息
 * @param params 更新用户信息
 */
export function putUserInfo(params: {
  id: string;
  username?: string;
  avatar?: string;
  signature?: string;
}) {
  return request.put(`/accounts/${params.id}`, {
    data: params,
  });
}

export function deleteUser(params: { id: string }) {
  return request.delete(`/accounts/${params.id}`);
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
 * 用户信息更新参数
 */
export interface UserInfoUpdateParamsType {
  id: string;
  username?: string;
  avatar?: string;
  signature?: string;
}

export interface UserinfoQueryParamsType {
  uid?: string;
}

/**
 * 登录参数类型
 */
export interface LoginParamsType {
  email: string;
  password: string;
  captcha: string;
}
