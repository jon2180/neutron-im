import request from "@/utils/request";

export * as chat from "./chat";
export * as friend from "./friend";
export * as user from "./user";

export const group = {
  postGroups() {
    return request.post("/groups/", {
      data: {
        keyw: "iamiron",
        time: Date.now(),
      },
    });
  },
};

export interface BingWallpaperResponse {
  images: {
    startdate: string;
    fullstartdate: string;
    enddate: string;
    url: string;
    urlbase: string;
    copyright: string;
    copyrightlink: string;
    title: string;
    quiz: string;
    wp: boolean;
    hsh: string;
    drk: number;
    top: number;
    bot: number;
    hs: any[];
  }[];
  tooltips: {
    loading: string;
    previous: string;
    next: string;
    walle: string;
    walls: string;
  };
}

export const getBingWallpaper = (): Promise<BingWallpaperResponse> => {
  return request.get("https://cn.bing.com/HPImageArchive.aspx", {
    credentials: "omit",
    mode: "cors",
    params: {
      // 返回数据格式，不存在返回xml格式
      // js (一般使用这个，返回json格式)
      // xml（返回xml格式）
      format: "js",

      //       请求图片截止天数
      // 0 今天
      // -1 截止中明天 （预准备的）
      // 1 截止至昨天，类推（目前最多获取到7天前的图片）
      idx: 0,

      //   1-8 返回请求数量，目前最多一次获取8张
      n: 1,

      // zh-CN
      // ...
      mkt: "zh-CN",
    },
  });
};

export function search(params: { keyword: string; type: string }) {
  return request.get("/search", {
    params,
  });
}
