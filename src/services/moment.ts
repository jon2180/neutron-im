import request from "@/utils/request";
import type { HttpResponseData } from "@/types/http";

export interface ActivitiesSearchParams {
  /**
   * 指定的用户 ID
   */
  uid?: string;
  keyword?: string;
  page_no?: number;
  page_size?: number;
}

export function getActivities(
  params?: ActivitiesSearchParams
): Promise<HttpResponseData> {
  return request.get("/moments/", {
    params: {
      ...params,
      type: "activity",
    },
  });
}

export function getCodesnips(
  params?: ActivitiesSearchParams
): Promise<HttpResponseData> {
  return request.get("/moments/", {
    params: {
      ...params,
      type: "codesnips",
    },
  });
}

export interface ActivityGetParams {
  id: string;
}
export function getActivity({
  id,
  ...params
}: ActivityGetParams): Promise<HttpResponseData> {
  return request.get(`/moments/${encodeURIComponent(id)}`, {
    params: {
      type: "activity",
      ...params,
    },
  });
}

export interface ActivityCommentsParams {
  id: string;
  page_no?: number;
  page_size?: number;
}
/**
 * 获取评论
 * @param params
 * @returns
 */
export function getActivityComments({
  id,
  ...params
}: ActivityCommentsParams): Promise<HttpResponseData> {
  return request.get(`/moments/${encodeURIComponent(id)}/comments`, {
    params: params,
  });
}

export interface ActivityUploadParams {}

export function postActivity(
  params: ActivityUploadParams
): Promise<HttpResponseData> {
  return request.post("/moments", { data: params });
}

export interface ActivityDeleteParams {
  id: string;
}

export function deleteActivity(
  params: ActivityDeleteParams
): Promise<HttpResponseData> {
  return request.delete(`/moments/${params.id}`);
}
