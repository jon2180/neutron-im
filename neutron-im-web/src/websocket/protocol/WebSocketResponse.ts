import type { NimSafeAny } from '@/types';

export class WebSocketResponse<T = NimSafeAny> {
  readonly requestId: string;
  readonly type: string;
  readonly body: T;

  constructor(requestId: string, type: string, body: T) {
    this.requestId = requestId;
    this.type = type;
    this.body = body;
  }
}
