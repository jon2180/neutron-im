import zh_CN from "./zh_CN";
import en_US from "./en_US";

import type { OptionalIntlConfig } from "react-intl/src/components/provider";
export type LocaleNameType = "zh_CN" | "en_US";
export type LocaleConfig = Record<LocaleNameType, OptionalIntlConfig>;

const intlConfig: LocaleConfig = {
  zh_CN,
  en_US,
};

const LOCALE_KEY = "app.locale";

/**
 * 导入 locale 配置
 *
 * 已进行合法性校验，不用再检查键是否合法
 *
 * @returns locale 配置的键 | null
 */
export function importLocaleSetting() {
  const localeName = localStorage.getItem(LOCALE_KEY) as LocaleNameType | null;
  return localeName && intlConfig[localeName] ? localeName : null;
}

/**
 * 设置 / 更新 locale 配置
 * @param key locale 键值
 * @returns 是否保存成功，成功为键，失败为空
 */
export function exportLocaleSetting(key: LocaleNameType) {
  if (!key || !intlConfig[key]) return null;
  localStorage.setItem(LOCALE_KEY, key);
  return key;
}

export default intlConfig;
