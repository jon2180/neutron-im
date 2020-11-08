import request from "@/utils/request";
import { HttpResponseData, FriendListItemData } from "@/types/types";

export function getFriendList(): Promise<HttpResponseData<FriendListItemData[]>> {
  const params = {
    accountId: "fafdasfsdaf",
  };
  return request.get(`/friends/${params.accountId}`);
}
