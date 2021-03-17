import request from "@/utils/request";
import { HttpResponseData } from "@/types/http";

export function getFriendList(params: { accountId: string; }): Promise<HttpResponseData> {
  return request.get(`/friends/${params.accountId}`);
}
