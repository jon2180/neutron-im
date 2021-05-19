import MessageHandler from "./MessageHandler";
import { WebSocketMessage } from "./WebSocketMessage";

export default class MyWebSocket {
  static HEARTBEAT = "HEARTBEAT";
  static QUIT = "QUIT";
  messageHandler: MessageHandler;
  url: string;
  websocket: WebSocket | undefined;
  reconnectDelay: number;
  lastMsgTimestamp: number;

  constructor(url: string, reconnectDelay = 3000) {
    this.url = url;
    this.reconnectDelay = reconnectDelay;
    this.messageHandler = new MessageHandler();
    this.websocket = this.connect();
    this.lastMsgTimestamp = Date.now();
    this.heartbeatHandle = null;

    window.onbeforeunload = () => {
      this.close();
    };
  }

  get readyState() {
    if (this.websocket) return this.websocket.readyState;
    else return WebSocket.CLOSED;
  }

  connect(): WebSocket {
    const ws = new WebSocket(this.url);
    ws.onopen = this.onopen;
    ws.onclose = this.onclose;
    ws.onerror = this.onerror;
    ws.onmessage = this.onmessage;
    this.lastMsgTimestamp = Date.now();
    return ws;
  }

  updateTimestamp(timestamp: number = Date.now()) {
    this.lastMsgTimestamp = timestamp;
  }

  onopen = (ev: Event) => {
    console.log("建立连接", ev);
  };

  onclose = (cev: CloseEvent) => {
    this.close();
    setTimeout(() => {
      this.websocket = this.connect();
    }, this.reconnectDelay);
    console.log("连接关闭", cev);
  };

  reconnect() {
    if (this.websocket) this.send(MyWebSocket.QUIT);
  }

  onerror = (ev: Event) => {
    console.log("连接错误", ev);
  };

  onmessage = (mev: MessageEvent<any>) => {
    this.updateTimestamp();
    this.refreshInterval();

    if (mev.data === MyWebSocket.HEARTBEAT) {
      console.log("心跳包");
      return;
    } else if (mev.data === MyWebSocket.QUIT) {
      console.log("退出消息");
    } else {
      try {
        this.messageHandler.handle(new WebSocketMessage(JSON.parse(mev.data)));
      } catch (err) {
        console.error(err);
        console.log("解析失败");
      }
    }
  };

  heartbeatHandle: NodeJS.Timeout | null;

  refreshInterval() {
    if (this.heartbeatHandle) clearInterval(this.heartbeatHandle);
    this.heartbeatHandle = setInterval(() => {}, this.reconnectDelay);
  }

  send(data: string) {
    if (this.websocket && this.readyState === WebSocket.OPEN)
      this.websocket.send(data);
    else console.log("连接不存在或连接已关闭");
  }
  // clearTimeout() {
  //   clearInterval()
  // }

  close() {
    if (this.heartbeatHandle) clearInterval(this.heartbeatHandle);
    if (this.websocket) this.websocket.close();
  }

  // public heartbeat() {
  //   setInterval(, 5000);
  // }
}
