import type { HttpResponseData } from "@/types/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SafeAny } from "@/types";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RequestRestService {

  constructor(private request: HttpClient) {

  }

  getFriendRequest(): Observable<HttpResponseData<SafeAny>> {
    return this.request.get<HttpResponseData<SafeAny>>("/requests/friends");
  }

  getGroupRequest(): Observable<HttpResponseData<SafeAny>> {
    return this.request.get<HttpResponseData<SafeAny>>("/requests/groups");
  }

  postFriendRequest(): Observable<HttpResponseData<SafeAny>> {
    return this.request.post<HttpResponseData<SafeAny>>("/requests/friends", {});
  }
}
