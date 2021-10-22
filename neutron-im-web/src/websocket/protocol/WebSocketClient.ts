import { parse, stringify } from './serializer';
import type {
  WebSocketRequest,
  WebSocketRequestCallback,
} from './WebSocketRequest';
import type { WebSocketResponse } from './WebSocketResponse';
import type { NimSafeAny } from '@/types';

class WebsocketError extends Error {}

interface WebSocketClientOption {
  /**
   * 同步等待超时时长(ms)
   */
  timeout?: number;
  onOpen: (ev: Event) => void;
  onMessage: (ev: MessageEvent) => void;
  onClose: (ev: CloseEvent) => void;
  onError: (ev: Event) => void;
  protocols?: string | string[];
}

type PluginTeardownCallback = () => void;

interface WebSocketClientEventMap extends WebSocketEventMap {
  send: Event;
}

interface ClientOptions {
  heartbeatProtocol: {
    request: string;
    response(): void;
  };
}

export default class WebSocketClient {
  private requestMap: Map<string, WebSocketRequest>;

  private plugins: Map<string, PluginTeardownCallback>;

  private reconnectDelay = 0;
  private websocket!: WebSocket;

  constructor(url: string, private options: WebSocketClientOption) {
    if (!url) {
      throw new ReferenceError('url should not be empty');
    }
    this._url = url;
    this.requestMap = new Map();
    this.plugins = new Map();
    this.setup();
  }

  private _url: string;

  get url(): Readonly<WebSocket['url']> {
    return this._url;
  }

  get readyState(): Readonly<WebSocket['readyState']> {
    return this.websocket.readyState;
  }

  public setup(): void {
    this.websocket = new WebSocket(this.url, this.options.protocols);
    this.websocket.onopen = this.options.onOpen;
    this.websocket.onmessage = (event: MessageEvent) => {
      const data = parse<WebSocketResponse>(event.data);
      if (data?.requestId && this.requestMap.has(data?.requestId)) {
        const req: WebSocketRequest | undefined = this.requestMap.get(
          data.requestId,
        );
        if (req && typeof req.callback === 'function') {
          req.callback(data);
          return;
        }
      }
      if (data) {
        this.options.onMessage(event);
      }
    };

    this.websocket.onclose = this.options.onClose;
    this.websocket.onerror = this.options.onError;
  }

  public send<Req>(msg: WebSocketRequest<Req>): void {
    if (this.websocket.readyState !== WebSocket.OPEN) {
      return;
    }
    this.websocket.send(stringify(msg));
    const ev = new Event('send');
    console.log(ev);
    this.dispatchEvent(ev);
  }

  public sendSync<Res, Req>(
    msg: WebSocketRequest<Req>,
  ): Promise<WebSocketResponse<Res>> {
    return new Promise<WebSocketResponse<Res>>((resolve, reject) => {
      const seq = msg.requestId;

      // will be called when receive the response has same property requestId
      msg.callback = ((res) => {
        // remove this request in requestsMap
        if (this.requestMap.has(seq)) {
          this.requestMap.delete(seq);
        }
        resolve(res);
      }) as WebSocketRequestCallback<Res>;

      this.requestMap.set(seq, msg);

      if (this.readyState !== WebSocket.OPEN) {
        reject(new WebsocketError('Websocket`readyState should be open'));
        return;
      }

      try {
        this.send(msg);
      } catch (error) {
        this.requestMap.delete(seq);
        reject(error);
      }
    });
  }

  /**
   * @see  WebSocket.addEventListener;
   */
  public addEventListener<K extends keyof WebSocketClientEventMap>(
    type: K,
    listener: (ev: WebSocketClientEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.websocket.addEventListener(type, listener as NimSafeAny, options);
  }

  removeEventListener<K extends keyof WebSocketClientEventMap>(
    type: K,
    listener: (ev: WebSocketClientEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void {
    this.websocket.removeEventListener(type, listener as NimSafeAny, options);
  }

  /**
   * @see WebSocket.dispatchEvent
   * @param event
   */
  dispatchEvent(event: Event): boolean {
    return this.websocket.dispatchEvent(event);
  }

  public addPlugin(
    name: string,
    plugin: (websocket: WebSocketClient) => PluginTeardownCallback,
  ): WebSocketClient {
    if (typeof plugin !== 'function') {
      throw new WebsocketError('Plugin Function should be a valid function');
    }
    const teardown = plugin(this);
    if (typeof teardown !== 'function') {
      throw new WebsocketError(
        'Plugin Function should return a valid teardown function',
      );
    }
    this.plugins.set(name, teardown);
    return this;
  }

  public removePlugin(name: string): void {
    if (!this.plugins.has(name)) {
      return;
    }
    const teardown = this.plugins.get(name);
    if (typeof teardown === 'function') {
      teardown();
    }
    this.plugins.delete(name);
  }
}
