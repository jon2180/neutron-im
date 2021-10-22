import type WebSocketClient from './WebSocketClient';
import { buildHeartBeatMessage } from './messageHelper';

export default function HeartBeatPlugin() {
  let lastMsgTime = Date.now();
  let sendHeartBeatTimer = 0;
  let websocketClient: WebSocketClient | null = null;

  const resetTimer = () => {
    lastMsgTime = Date.now();
    clearInterval(sendHeartBeatTimer);
    sendHeartBeatTimer = window.setInterval(() => {
      if (websocketClient) {
        console.log('send a heart beat pocket');
        websocketClient
          .sendSync(buildHeartBeatMessage())
          .then(() => {
            console.log('finished a heart beat');
            resetTimer();
          })
          .catch((err) => {
            websocketClient?.dispatchEvent(new Event('close', {}));
            console.error(err);
          });
      }
    }, 10000);
  };

  const onSend = (event: Event) => {
    resetTimer();
  };

  const onMessage = (ev: MessageEvent) => {
    resetTimer();
  };

  return (websocket: WebSocketClient) => {
    websocketClient = websocket;
    websocket.addEventListener('send', onSend);
    websocket.addEventListener('message', onMessage);

    return () => {
      websocket.removeEventListener('send', onSend);
      websocket.removeEventListener('message', onMessage);
    };
  };
}
