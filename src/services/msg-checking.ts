import { HttpResponseData } from "@/types/http";
import request from "@/utils/request";

export interface UpdateCheckingTimeParams {
  targetId: string;
}

export function update({
  targetId,
}: UpdateCheckingTimeParams): Promise<HttpResponseData> {
  return request.put(`/mchecks/${targetId}`);
}

export interface GetCheckingTimeParams {
  targetId: string;
}

export function get({
  targetId,
}: GetCheckingTimeParams): Promise<HttpResponseData> {
  return request.get(`/mchecks/${encodeURIComponent(targetId)}`);
}

export interface GetEntriesParams {
  viewerId: string;
}

export function getEntries(): Promise<HttpResponseData> {
  return request.get(`/mchecks/`);
}
