export class CookieStorage implements Storage {
  // [name: string]: any;

  private static getCookieMap(): Record<string, string> {
    const cookieMap: Record<string, string> = {};
    // cookie`s format:  xxx=xxxx; yyy=yyyyy;
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; ++i) {
      const [key, val] = cookies[i].split("=");
      if (key && val) cookieMap[key.trim()] = val.trim();
    }
    return cookieMap;
  }

  private cookieMap: Record<string, string> = {};

  private cookieNames: string[] = [];

  get length() {
    return this.cookieNames.length;
  }

  clear(): void {
  }

  getItem(key: string): string | null {
    this.refreshCookieMap();
    const val = this.cookieMap[key];
    return (val !== null && val !== undefined) ? val : null;
  }

  key(index: number): string | null {
    this.refreshCookieMap();
    return (index >= 0 && index < this.cookieNames.length) ? this.cookieNames[index] : null;
  }

  removeItem(key: string): void {
  }

  setItem(key: string, value: string): void {
  }

  refreshCookieMap() {
    this.cookieMap = CookieStorage.getCookieMap();
    this.cookieNames = Object.keys(this.cookieMap);
  }

}

export const cookieStorage = new CookieStorage();
