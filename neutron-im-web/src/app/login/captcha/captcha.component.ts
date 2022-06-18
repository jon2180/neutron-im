import { HTTP_BASE_URL_TOKEN } from '@/components/http/http.token';
import { generateCaptcha } from '@/utils/generator';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'nim-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.less']
})
export class CaptchaComponent {
  captchaUrl = ''

  constructor(@Inject(HTTP_BASE_URL_TOKEN) private baseUrl: string) {
    this.setCaptchaUrl()
  }

  setCaptchaUrl() {
    this.captchaUrl = `${(this.baseUrl ? this.baseUrl : '')}/captcha-pic?id=${generateCaptcha()}`
  }

  reloadCaptcha() {
    this.setCaptchaUrl();
  }
}
