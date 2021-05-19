import { Cookie } from "@/utils/cookie";
import { importUserInfo } from "@/utils/localStorage";
import AppConstants from "@/config/url.const";
import type { UserInfoSubstate } from "@/types/state";

import MyWebSocket from "./protocol/MyWebsocket";

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
      `${AppConstants.WEBSOCKET_URL}/relay/${userInfo.id}`,
      3000
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

    /**
     * 发送消息
     * @param source 数据源
     * @returns 退出状态码，0 OK, 1 Empty Paramter, 2 WebSocket error 3 source type error
     */
    send(source: string | number | Record<string, any>): number {
      if (!source) return 1;
      if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN)
        return 2;

      let success = false;
      if (typeof source === "string" || typeof source === "number") {
        this.websocket.send(String(source));
        success = true;
      } else if (typeof source === "object") {
        this.websocket.send(JSON.stringify(source));
        success = true;
      }
      return success ? 0 : 3;
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
