import type { HttpResponseData } from "@/types/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

export interface ActivitiesSearchParams {
  /**
   * 指定的用户 ID
   */
  uid?: string;
  keyword?: string;
  page_no?: number;
  page_size?: number;
}

export interface ActivityGetParams {
  id: string;
}

export interface ActivityCommentsParams {
  page_no?: number;
  page_size?: number;
}

export interface ActivityUploadParams {
}

export interface ActivityDeleteParams {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class MomentRestService {

  constructor(private request: HttpClient) {

  }

  getActivities(params: ActivitiesSearchParams): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>("/moments/", {
      params: {
        ...params,
        type: "activity"
      }
    });
  }

  getCodeSnips(params: ActivitiesSearchParams): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>("/moments/", {
      params: {
        ...params,
        type: "codesnips"
      }
    });
  }

  getActivity(id: string, params: ActivityGetParams): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>(`/moments/${encodeURIComponent(id)}`, {
      params: {
        type: "activity",
        ...params
      }
    });
  }

  /**
   * 获取评论
   * @param id
   * @param queryParams
   * @returns
   */
  getActivityComments(id: string, queryParams: ActivityCommentsParams): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>(`/moments/${encodeURIComponent(id)}/comments`, { params: { ...queryParams } });
  }


  postActivity(params: ActivityUploadParams): Observable<HttpResponseData> {
    return this.request.post<HttpResponseData>("/moments", params);
  }

  deleteActivity(params: ActivityDeleteParams): Observable<HttpResponseData> {
    return this.request.delete<HttpResponseData>(`/moments/${params.id}`);
  }
}
