import { generateAccountId } from "@/utils/generator";
import type { HttpResponseData } from "@/types/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

interface PostChatAudioParams {
  blob: Blob;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageRestService {

  constructor(private request: HttpClient) {

  }

  postChatAudio(body: PostChatAudioParams): Observable<HttpResponseData> {
    const data = new FormData();
    const isNameValid = body.name && body.name.lastIndexOf(".") !== -1;
    data.append(
      "file",
      body.blob,
      isNameValid ? body.name : `${generateAccountId({ length: 8 })}.webm`
    );
    return this.request.post<HttpResponseData>("/chat-audio", data);
  }
}
