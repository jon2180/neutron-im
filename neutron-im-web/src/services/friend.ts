import request from '@/utils/request';
import type { HttpResponseData } from '@/types/http';

export function getFriends(): Promise<HttpResponseData> {
  return request.get('/friends/');
}

export function getFriendDetail(data: {
  /** 用户 id */
  uid: string;
}): Promise<HttpResponseData> {
  return request.get(`/friends/${data.uid}`);
}

export function searchAccount(data: {
  keyword: string;
  type: string;
}): Promise<HttpResponseData> {
  return request.get('/accounts/search', { params: data });
}

export function getMyFriendRequests(): Promise<HttpResponseData> {
  return request.get('/requests/friends/$');
}

export function getFriendsRequests(): Promise<HttpResponseData> {
  return request.get('/requests/friends/');
}

export function postAddFriendRequest({
  id,
  reason,
}: {
  id: string;
  reason: string;
}): Promise<HttpResponseData> {
  return request.post('/requests/friends', {
    data: { reason, oppositeId: id },
  });
}

export function putAddFriendConfirm({
  id,
  type,
  reason,
}: {
  id: string;
  type: 'accept' | 'reject';
  reason: string;
}): Promise<HttpResponseData> {
  return request.put(`/requests/friends/${id}`, {
    data: {
      type,
      reason,
    },
  });
}
