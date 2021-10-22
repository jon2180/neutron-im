import type WebSocketClient from './WebSocketClient';

export default function ReconnectPlugin() {
  let websocketClient: WebSocketClient;
  let timer = 0;
  let url = '';

  const resetTimer = () => {
    clearInterval(timer);
    timer = window.setInterval(() => {
      if (websocketClient) {
        console.log('TODO: should re-connect');
      }
    }, 10000);
  };

  const onClose = (ev: CloseEvent) => {};

  return (websocket: WebSocketClient) => {
    websocketClient = websocket;
    url = websocket.url;
    websocket.addEventListener('close', onClose);

    return () => {
      websocket.removeEventListener('close', onClose);
    };
  };
}
