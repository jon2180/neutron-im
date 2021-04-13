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

export default function connectWebSocket() {
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
    return new MyWebSocket(`${process.env.REACT_APP_WS_BASE_URL || 'ws://localhost:3001'}/relay/${userInfo.id}`);
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

// export default webSocketStore;

// import { websocket } from "./Websocket"

// class createWebSocket extends WebSocket {
//   myUrl: string;
//   ws: WebSocket;
//   status: string;
//   lockReconnect: boolean;
//   messageList: string;
//   pingPong: string;
//   pingInterval: NodeJS.Timeout;
//   pongInterval: NodeJS.Timeout;

//   constructor(url: string) {
//     this.connect(url)
//// console.log(url)
//     this.myUrl = url
//     //this.getMessage()
//   }

//   connect(url) {//连接服务器
//     this.ws = new WebSocket(url)
//     this.ws.onopen = (e) => {
//       this.status = 'open'
//       message.info('link succeed')
//       console.log("connection to server is opened")
//       //this.heartCheck.reset().start()
//       this.ws.send('succeed')
//       this.heartCheck()
//     }
//   }
//   async getMessage() {//异步获取数据
//     this.lockReconnect = true
//     this.messageList = '';
//     await new Promise((resolve) => {
//       this.ws.onmessage = (e) => {
//         //console.log(e.data)
//         this.messageList = e.data
//         //console.log(this.messageList)
//         resolve(e.data)
//       }
//     })
//     console.log(this.messageList)
//     return this.messageList
//   }

//   heartCheck() {//心跳
//     this.pingPong = 'ping'
//     this.pingInterval = setInterval(() => {
//       if (this.ws.readyState === 1) {
//         this.ws.send('ping')
//       }
//     }, 10000);
//     this.pongInterval = setInterval(() => {
//       if (this.pingPong === 'ping') {
//         this.closeHandle('pingPong没有改为pong')
//       }
//       console.log('return the pong')
//     }, 20000)
//   }

//   closeHandle(res: string) {
//     if (this.status !== 'close') {
//       console.log('断开，重连websocket', res)
//       if (this.pongInterval !== undefined && this.pingInterval !== undefined) {
//         clearInterval(this.pongInterval)
//         clearInterval(this.pingInterval)
//       }
//       this.connect(this.myUrl)
//     } else {
//       console.log('websocket手动关闭了，或者正在连接')
//     }
//   }

//   close() {//关闭连接
//     clearInterval(this.pingInterval)
//     clearInterval(this.pongInterval)
//     this.ws.send('close')
//     this.status = 'close'
//     this.ws.onclose = e => {
//       console.log('close')
//     }
//   }
// }
// export default createWebSocket
// ————————————————
// 版权声明：本文为CSDN博主「月大侠」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/weixin_41400375/article/details/108629917

// export default connectWebSocket;

// export function createWebSocket(id: number) {
//   let ws = new WebSocket(`${process.env.REACT_APP_WS_BASE_URL || 'ws://localhost:3001'}/relay/${id}`);
//   ws.onopen = (ev: Event) => {
//     console.log('建立连接', ev);
//   }

//   ws.onclose = (cev: CloseEvent) => {
//     setTimeout(() => {

//     })
//     console.log('连接关闭', cev);
//   }

//   ws.onerror = (ev: Event) => {
//     console.log('连接错误', ev);
//   }

//   ws.onmessage = (mev: MessageEvent<any>) => {
//     console.log(mev);
//     console.log(mev.data)
//     let data = null;
//     try {
//       data = JSON.parse(mev.data);
//     } catch (err) {
//       console.error(err);
//       return;
//     }
//     if (data.type === 'single') {
//       console.log(data.body)
//     } else if (data.type === 'notify') {
//     }
//   }

// }
