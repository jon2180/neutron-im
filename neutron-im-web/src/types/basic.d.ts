// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NimSafeAny = any;

export type PickedWebSocket = Pick<
  WebSocket,
  | 'url'
  | 'readyState'
  | 'addEventListener'
  | 'removeEventListener'
  | 'dispatchEvent'
>;
