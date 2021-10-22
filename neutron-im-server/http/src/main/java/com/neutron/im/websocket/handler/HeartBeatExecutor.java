package com.neutron.im.websocket.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.neutron.im.websocket.WebSocketServerEndpoint;
import com.neutron.im.websocket.message.HeartBeatMessage;
import com.neutron.im.websocket.message.HeartBeatResponse;
import com.neutron.im.websocket.message.WebSocketMessage;
import com.neutron.im.websocket.util.WebSocketUtil;
import org.springframework.stereotype.Component;

/**
 * 心跳响应
 */
@Component
public class HeartBeatExecutor extends BaseExecutor<HeartBeatMessage> {
    @Override
    public int execute(HeartBeatMessage message, WebSocketServerEndpoint server) {
        WebSocketMessage<HeartBeatResponse> res = new WebSocketMessage<>();
        res.setType(HeartBeatResponse.TYPE);
        res.setBody(new HeartBeatResponse());
        try {
            WebSocketUtil.sendText(server.session, this.jsonify(res));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public String getType() {
        return HeartBeatMessage.TYPE;
    }
}
