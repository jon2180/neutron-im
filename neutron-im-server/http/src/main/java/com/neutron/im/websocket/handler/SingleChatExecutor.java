package com.neutron.im.websocket.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.neutron.im.websocket.WebSocketServerEndpoint;
import com.neutron.im.websocket.message.SingleChatMessage;
import com.neutron.im.websocket.util.WebSocketUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SingleChatExecutor extends BaseExecutor<SingleChatMessage> {

    public int execute(SingleChatMessage message, WebSocketServerEndpoint server) {
        WebSocketServerEndpoint targetConn = this.session(message.getToUser());
        // 保存至数据库
//        try {
//            WebsocketUtil.saveMessageToDatabase(message);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
        // 如果对方在线，转发消息
        if (targetConn != null) {
            try {
                WebSocketUtil.sendText(targetConn.session, jsonify(message));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return 0;
    }

    @Override
    public String getType() {
        return SingleChatMessage.TYPE;
    }
}
