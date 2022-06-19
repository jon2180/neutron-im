import { importUserInfo } from "@/utils/localStorage";
import WebSocketClient from "@/websocket/protocol/WebSocketClient";
import HeartBeatPlugin from "@/websocket/protocol/HeartBeatPlugin";
import type { NimSafeAny } from "@/types";
import { environment } from "@/environments/environment";
import { cookieStorage } from "@/components/storage/CookieStorage";

export function connectWebSocket(): WebSocketClient | undefined {
  // 在进入应用的时候开始读取 localStorage 中是否存在用户信息
  // 先检测是否存在授权
  const token =
    cookieStorage.getItem("authorization") || cookieStorage.getItem("Authorization");
  if (!token) {
    return;
  }
  // 如果存在用户信息，就将用户信息设置进 redux
  const userInfo = importUserInfo();

  if (userInfo && userInfo.id && userInfo.email) {
    return (
      new WebSocketClient(
        `${environment.network.baseWsUrl}/relay/${userInfo.id}`,
        {
          onClose(ev) {
            console.log("close ", ev);
          },
          onMessage(ev) {
            console.log("message ", ev);
          },
          onOpen(ev) {
            console.log("open ", ev);
          },
          onError(ev) {
            console.log("error ", ev);
          }
        }
      )
        // .addPlugin('reconnect', ReconnectPlugin())
        .addPlugin("heartbeat", HeartBeatPlugin())
    );
  } else {
    return undefined;
  }
}

const webSocketStore = (function createWebSocketStore() {
  const initialState = {
    relayServer: undefined as undefined | WebSocketClient
  };
  return {
    get websocket(): WebSocketClient | undefined {
      return initialState.relayServer;
    },

    set websocket(newWs: WebSocketClient | undefined) {
      if (newWs) initialState.relayServer = newWs;
    },

    getters: {
      get websocket() {
        return initialState.relayServer;
      }
    },

    reducers: {
      setRelayServer(websocket: WebSocketClient) {
        if (websocket) initialState.relayServer = websocket;
      }
    },

    /**
     * 发送消息
     * @param source 数据源
     * @returns 退出状态码，0 OK, 1 Empty Paramter, 2 WebSocket error 3 source type error
     */
    send(source: string | number | Record<string, NimSafeAny>): number {
      if (!source) return 1;
      if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN)
        return 2;

      let success = false;
      if (typeof source === "object") {
        this.websocket.send(source as NimSafeAny);
        success = true;
      }
      return success ? 0 : 3;
    }
  };
})();

export const { setRelayServer } = webSocketStore.reducers;
export const { getters, websocket } = webSocketStore;

export function connect(): void {
  if (!websocket) {
    const ws: WebSocketClient | undefined = connectWebSocket();
    if (ws) setRelayServer(ws);
  }
}

export default webSocketStore;
