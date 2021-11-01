export const Cookie = {
  getCookieMap(): Record<string, string> {
    const cookieMap: Record<string, string> = {};
    // cookie`s format:  xxx=xxxx; yyy=yyyyy;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; ++i) {
      const [key, val] = cookies[i].split('=');
      if (key && val) cookieMap[key.trim()] = val.trim();
    }
    return cookieMap;
  },
  getCookie(key: string): string {
    const val = this.getCookieMap()[key];
    if (val !== null && val !== undefined) return val;
    return '';
  },
};

export default Cookie;
