import { notification } from "antd";
import store from "@/store/store";
import { pushLastMessage } from "@/store/recentChatsSlice";
import { MessageData } from "@/types/http";
import { UserInfoSubstate } from "@/types/state";
import { Cookie } from "@/utils/cookie";
import { importUserInfo } from "@/utils/localStorage";
import { pushMessage } from "@/store/chatsHistoriesSlice";

export interface WebSocketMessage {
  sender: string;
  receiver: string;
  type: "group" | "notify" | "requests" | "single";
  timestamp: string;
  body: any;
}

class MessageHandler {
  handle(message: WebSocketMessage) {
    console.log(message);
    switch (message.type) {
      case "single":
        this.handleSingleMessage(message);
        break;
      case "group":
        this.handleGroupMessage(message);
        break;
      case "notify":
        this.handleNotify(message);
        break;
      case "requests":
        this.handleRequests(message);
        break;
      default:
        console.log("error message type");
    }
  }

  handleNotify(message: WebSocketMessage) {
    store.dispatch(pushLastMessage(message.body as MessageData));
    store.dispatch(pushMessage(message.body));
    notification.info({
      message: `收到来自 ${message.body["sender_id"]} 新${message.body["content_type"]}消息`,
      description: message.body["content"],
    });
  }

  handleSingleMessage(message: WebSocketMessage) {
    store.dispatch(pushLastMessage(message.body as MessageData));
    store.dispatch(pushMessage(message.body));
    notification.info({
      message: `收到来自 ${message.body["sender_id"]} 新${message.body["content_type"]}消息`,
      description: message.body["content"],
    });
  }

  handleGroupMessage(message: WebSocketMessage) {
    store.dispatch(pushLastMessage(message.body as MessageData));
    notification.info({
      message: `收到来自 ${message.body["sender_id"]} 新${message.body["content_type"]}消息`,
      description: message.body["content"],
    });
  }

  handleRequests(message: WebSocketMessage) {
    store.dispatch(pushLastMessage(message.body as MessageData));
    notification.info({
      message: `收到来自 ${message.body["sender_id"]} 新${message.body["content_type"]}消息`,
      description: message.body["content"],
    });
  }
}

export class MyWebSocket {
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
      // console.log(mev);
      // console.log(mev.data);
      try {
        // const data = JSON.parse(mev.data);
        this.messageHandler.handle(JSON.parse(mev.data) as WebSocketMessage);
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

export function connectWebSocket() {
  // 在进入应用的时候开始读取 localStorage 中是否存在用户信息
  // 先检测是否存在授权
  const token =
    Cookie.getCookie("authorization") || Cookie.getCookie("Authorization");
  if (!token) {
    return;
  }
  // 如果存在用户信息，就将用户信息设置进 redux
  const userInfo = importUserInfo() as UserInfoSubstate | null;
  if (userInfo && userInfo.id && userInfo.email) {
    return new MyWebSocket(
      `${process.env.REACT_APP_WS_BASE_URL || "ws://localhost:3001"}/relay/${
        userInfo.id
      }`
    );
  } else {
    return undefined;
  }
}

const webSocketStore = (function createWebSocketStore() {
  const initialState = {
    relayServer: undefined as undefined | MyWebSocket,
  };
  return {
    get websocket(): MyWebSocket | undefined {
      return initialState.relayServer;
    },

    set websocket(newWs: MyWebSocket | undefined) {
      if (newWs) initialState.relayServer = newWs;
    },

    getters: {
      get websocket() {
        return initialState.relayServer;
      },
    },

    reducers: {
      setRelayServer(websocket: MyWebSocket) {
        if (websocket) initialState.relayServer = websocket;
      },
    },
  };
})();

export const { setRelayServer } = webSocketStore.reducers;
export const { getters, websocket } = webSocketStore;

export function connect() {
  if (!websocket) {
    let ws: MyWebSocket | undefined = connectWebSocket();
    if (ws) setRelayServer(ws);
  }
}

export default webSocketStore;
