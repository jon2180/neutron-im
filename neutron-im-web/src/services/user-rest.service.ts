import type { HttpResponseData } from "@/types/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

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

@Injectable({
  providedIn: "root"
})
export class UserRestService {

  constructor(private request: HttpClient) {

  }

  /**
   * 登录接口
   * @param params 登录参数
   */
  postAccountLogin(params: LoginParams): Observable<HttpResponseData> {
    return this.request.post<HttpResponseData>("/login", params);
  }

  /**
   * 退出登录
   */
  postLogout(): Observable<HttpResponseData> {
    return this.request.post<HttpResponseData>("/logout", {});
  }

  /**
   * 注册
   */
  postAccount(params: RegisterParams): Observable<HttpResponseData> {
    return this.request.post<HttpResponseData>("/register", params);
  }

  getSelfUserInfo(): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>("/accounts/");
  }

  /**
   * 获取用户信息
   */
  getUserInfo(queryParams: UserinfoQueryParams): Observable<HttpResponseData> {
    if (!queryParams.uid) {
      return this.getSelfUserInfo();
    }
    return this.request.get<HttpResponseData>(`/accounts/${encodeURIComponent(queryParams.uid)}`);
  }

  /**
   * 更新用户信息
   * @param params 更新用户信息
   */
  putUserInfo(params: UserInfoUpdateParams): Observable<HttpResponseData> {
    return this.request.put<HttpResponseData>("/accounts/", params);
  }

  deleteUser() {
    return this.request.delete("/accounts/");
  }
}
