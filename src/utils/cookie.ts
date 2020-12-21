export const Cookie = {
  getCookieMap() {
    const cookieMap: {
      [key: string]: string;
    } = {};
    // cookie`s format:  xxx=xxxx; yyy=yyyyy;
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; ++i) {
      let [key, val] = cookies[i].split("=");
      if (key && val) cookieMap[key.trim()] = val.trim();
    }
    return cookieMap;
  },
  getCookie(key: string) {
    let val = this.getCookieMap()[key];
    if (val !== null && val !== undefined) return val;
    return "";
  },
};
