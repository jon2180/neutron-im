
export type Locale = 'zh-CN' | 'zh' | 'en-US' | 'en'

export const SUPPORTED_LOCALE: Locale[] = ["en-US", "zh-CN", 'zh', 'en'];

export const DEFAULT_LOCALE: Locale = 'zh-CN';

export type LocaleMessages = Record<string, string>;

export interface LocaleInfo {
  locale: Locale;
  messages: LocaleMessages;
}
