import store from '@/store';
import { setHasLogin, setUserInfo } from '@/store/userInfoSlice';
import type { UserInfoSubstate } from '@/types/state';
import { Cookie } from './cookie';
import type { NimSafeAny } from '@/types';

export enum LocalStorageKey {
  USERINFO = 'userInfo',
  FRIEND_LIST = 'friendList',
  RECENT_CHAT = 'recentChats',
}

/**
 * 读取 json 数据
 * @param key 键
 * @returns 对象
 */
export function readJSON<T extends Record<string, NimSafeAny>>(
  key: string,
): T | null {
  const str = localStorage.getItem(key);
  if (!str) return null;
  try {
    return JSON.parse(str) as T;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function writeJSON(key: string, val: NimSafeAny): void {
  localStorage.setItem(key, JSON.stringify(val));
}

export function importUserInfo(): UserInfoSubstate | null {
  return readJSON(LocalStorageKey.USERINFO);
}

export function exportUserInfo(data: Record<string, NimSafeAny>): void {
  localStorage.setItem(LocalStorageKey.USERINFO, JSON.stringify(data));
}

/**
 // 获取 登录 状态
 // 向服务端发出请求，用于验证 token 是否有效
 // 如果有效，直接进入主页
 // 否则保持登录状态
 */
export function initializeUserInfo(): void {
  // 在进入应用的时候开始读取 localStorage 中是否存在用户信息

  const token =
    Cookie.getCookie('authorization') || Cookie.getCookie('Authorization');
  if (!token) {
    console.log('There is NO authorization token, please re-login');
    store.dispatch(setHasLogin(false));
    return;
  }

  // 如果存在用户信息，就将用户信息设置进 redux
  const userInfo: UserInfoSubstate = readJSON(LocalStorageKey.USERINFO) as UserInfoSubstate;

  if (userInfo && userInfo.id && userInfo.email) {
    store.dispatch(setHasLogin(true));
    store.dispatch(setUserInfo(userInfo));
  } else {
    // 否则向远端发出请求获取用户数据
    console.log('TODO: Should fetch user`s information from remote server');
    // store.dispatch(fetchUserInfo({}));
    store.dispatch(setHasLogin(false));
  }
}

export function initializeFriends(): void {}

export function exportFriends(data: NimSafeAny): void {
  writeJSON(LocalStorageKey.FRIEND_LIST, data);
}

export function importFriends<T extends Record<string, NimSafeAny>>(): T | null {
  return readJSON<T>(LocalStorageKey.FRIEND_LIST);
}

export function exportRecentChat(data: NimSafeAny): void {
  writeJSON(LocalStorageKey.RECENT_CHAT, data);
}

export function importRecentChat<T extends Record<string, NimSafeAny>>(): T | null  {
  return readJSON(LocalStorageKey.RECENT_CHAT);
}
