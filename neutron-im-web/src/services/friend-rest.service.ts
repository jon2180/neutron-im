import type { HttpResponseData } from "@/types/http";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface FriendRequestParams {
  id: string;
  type: "accept" | "reject";
  reason: string;
}

@Injectable({
  providedIn: 'root'
})
export class FriendRestService {

  constructor(private request: HttpClient) {

  }

  getFriends(): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>("/friends/");
  }

  getFriendDetail(data: {
    /** 用户 id */
    uid: string;
  }): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>(`/friends/${data.uid}`);
  }

  searchAccount(data: {
    keyword: string;
    type: string;
  }): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>("/accounts/search", { params: data });
  }

  getMyFriendRequests(): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>("/requests/friends/$");
  }

  getFriendsRequests(): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>("/requests/friends/");
  }

  postAddFriendRequest(id: string, reason: string): Observable<HttpResponseData> {
    return this.request.post<HttpResponseData>("/requests/friends", {
      data: { reason, oppositeId: id }
    });
  }

  putAddFriendConfirm(id: string, data: FriendRequestParams): Observable<HttpResponseData> {
    return this.request.put<HttpResponseData>(`/requests/friends/${id}`, data);
  }
}
