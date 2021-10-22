import type { NimSafeAny } from '@/types';
import { generateUUID } from './generator';
import type { WebSocketResponse } from './WebSocketResponse';

export type WebSocketRequestCallback<T = NimSafeAny> = (
  res: WebSocketResponse<T>,
) => void;

export class WebSocketRequest<T = NimSafeAny> {
  readonly requestId: string;
  readonly type: string;
  body: T;

  constructor(type: string, body: T) {
    this.requestId = generateUUID(type);
    this.type = type;
    this.body = body;
    this._callback = (body): void => {
    };
  }

  private _callback: WebSocketRequestCallback;

  get callback(): WebSocketRequestCallback {
    return this._callback;
  }

  set callback(fn: WebSocketRequestCallback) {
    this._callback = fn;
  }
}
