import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, of } from 'rxjs';
import { HTTP_BASE_URL_TOKEN } from './http.token';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { I18nService } from '../i18n';

export const CODE_MESSAGES: Record<number, string> = {
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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    @Inject(HTTP_BASE_URL_TOKEN) private baseUrl: string,
    private messageService: NzMessageService,
    private routerService: ActivatedRoute,
    private router: Router,
    private modalService: NzModalService,
    private i18n: I18nService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({ url: `${this.baseUrl}${request.url}`, withCredentials: true });
    return next.handle(apiReq).pipe(
      catchError((err, caugt) => this.handleError(err as HttpErrorResponse, caugt as Observable<any>)),
    );
  }

  handleError(err: HttpErrorResponse, caugt: Observable<any>): Observable<any> {
    if (err.status === 401 && window.location.pathname !== '/login') {
      this.modalService.error({
        nzTitle: '登录授权信息变更',
        nzContent: '监测到您的登录授权信息已变更，将为您跳转至登录页面',
        nzClosable: false,
        nzMaskClosable: false,
        nzOnOk: () => this.router.navigate(['login'], {
          relativeTo: null
        })
      });
      return of(err.error);
    }

    if (CODE_MESSAGES[err.status]) {
      this.messageService.error(CODE_MESSAGES[err.status])
    }
    return of(err.error);
  }
}
