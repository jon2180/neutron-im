import { HTTP_BASE_URL_TOKEN } from '@/modules/http/http.token';
import { generateCaptcha } from '@/utils/generator';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'nim-captcha',
  template: `
    <img
      (click)="reloadCaptcha()"
      [ngSrc]="captchaUrl"
      fill
      alt="{{ ('alt.captcha' | i18n )}}"
      class="captchaPic"
    />
  `,
  styles: [
    `@import '../../../themes/index';

    .captchaPic {
      height: 32px;
    }
    `
  ]
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
