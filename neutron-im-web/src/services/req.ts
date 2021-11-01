import request from '@/utils/request';

export function getFriendRequest() {
  return request.get('/requests/friends');
}

export function getGroupRequest() {
  return request.get('/requests/groups');
}

export function postFriendRequest() {}
