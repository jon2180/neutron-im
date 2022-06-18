import { InjectionToken } from "@angular/core";
import { DEFAULT_LOCALE, Locale, LocaleInfo, LocaleMessages, SUPPORTED_LOCALE } from "./i18n.model";
import zh_CN from "./zh-cn/zh_CN";
import en_US from "./en-us/en_US";
import Cookie from "@/utils/cookie";

export type I18nKey = keyof typeof zh_CN;

function isCorrectLocale(locale: string) {
  return SUPPORTED_LOCALE.includes(locale as Locale);
}

function getMessages(locale: Locale) {
  switch (locale) {
    case "zh-CN":
    case 'zh':
      return zh_CN;
    case "en-US":
    case 'en':
      return en_US;
    default:
      throw new Error('Unexpected locale configuration');
  }
}

/**
 * 先读 cookie，读不到就读 navigator，再读不到就设为默认
 */
function readLocaleConfig(): Locale {
  const langFromCookie = Cookie.getCookie('language');
  if (langFromCookie && isCorrectLocale(langFromCookie)) {
    return langFromCookie as Locale;
  }

  const langFromNavigator = window.navigator.language;
  if (langFromNavigator && isCorrectLocale(langFromNavigator)) {
    return langFromNavigator as Locale;
  }

  return DEFAULT_LOCALE;
}

export const LOCALE_CONF_TOKEN = new InjectionToken<LocaleInfo>('locale info token injector', {
  factory() {
    const lang = readLocaleConfig();
    return {
      locale: lang,
      messages: getMessages(lang)
    }
  }
})
