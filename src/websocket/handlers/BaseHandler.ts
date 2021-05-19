import { WebSocketMessage } from "../protocol/WebSocketMessage";

/**
 * 策略模式基类
 */
export interface BaseHandler {
  handle(message: WebSocketMessage<any>): number | boolean;
}
