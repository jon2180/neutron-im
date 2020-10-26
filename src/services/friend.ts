import request from "../utils/request";
import { Random } from "mockjs";
import { IHTTPResponse, IFriendListItem } from "../types";

export function getFriendList(): Promise<IHTTPResponse<IFriendListItem[]>> {
  const params = {
    accountId: "fafdasfsdaf",
  };
  return request.get(`/friends/${params.accountId}`);
}
