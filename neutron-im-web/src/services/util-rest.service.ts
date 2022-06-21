import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpResponseData } from "@/types";
import { Observable } from "rxjs";

interface BingWallpaperImage {
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
}

interface BingWallpaperTooltips {
  loading: string;
  previous: string;
  next: string;
  walle: string;
  walls: string;
}

export interface BingWallpaperResponse {
  images: BingWallpaperImage[];
  tooltips: BingWallpaperTooltips;
}

interface SearchParams {
  keyword: string;
  type: string;
}

@Injectable({
  providedIn: "root"
})
export class UtilRestService {

  constructor(private request: HttpClient) {

  }

  postGroups() {
    return this.request.post("/groups/", {
        keyw: "iamiron",
        time: Date.now()
      }
    );
  }

  getBingWallpaper(): Observable<BingWallpaperResponse> {
    return this.request.get<BingWallpaperResponse>("https://cn.bing.com/HPImageArchive.aspx", {
      withCredentials: false,
      // credentials: "omit",
      // mode: "cors",
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
        mkt: "zh-CN"
      }
    });
  };

  search(params: SearchParams): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>("/search", { params: { ...params } });
  }
}

@Injectable({
  providedIn: "root"
})
export class MessageCheckingRestService {

  constructor(private request: HttpClient) {

  }

  update(targetId: string): Observable<HttpResponseData> {
    return this.request.put<HttpResponseData>(`/mchecks/${targetId}`, {});
  }

  get(targetId: string): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>(`/mchecks/${encodeURIComponent(targetId)}`);
  }

  getEntries(): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>("/mchecks/");
  }

}
