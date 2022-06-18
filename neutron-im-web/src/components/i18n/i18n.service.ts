import { Inject, Injectable } from '@angular/core';
import { I18nKey, LOCALE_CONF_TOKEN } from "./i18n.token";
import { LocaleInfo } from "./i18n.model";
import { SafeAny } from "@/types";

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor(@Inject(LOCALE_CONF_TOKEN) private localeInfo: LocaleInfo) { }

  setLocale(localeInfo: LocaleInfo) {
    // TODO write to cookie
    this.localeInfo = localeInfo;
    document.cookie = `language=${localeInfo.locale};Expired=None`;
    window.location.reload();
  }

  get(key: I18nKey, ...params: SafeAny[]) {
    if (!key) {
      return key;
    }
    let message = this.localeInfo.messages[key];
    if (params && params.length > 0) {
      // TODO 格式化国际化字符串
      message = this.localeInfo.messages[key];
    }
    return message;
  }
}
