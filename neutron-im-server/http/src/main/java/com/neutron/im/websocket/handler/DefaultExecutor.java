package com.neutron.im.websocket.handler;

import com.neutron.im.websocket.WebSocketServerEndpoint;
import com.neutron.im.websocket.message.HeartBeatMessage;
import com.neutron.im.websocket.message.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DefaultExecutor extends BaseExecutor<Message> {

    @Override
    public int execute(Message message, WebSocketServerEndpoint server) {
        log.warn(message.toString());
        return 0;
    }

    @Override
    public String getType() {
        return HeartBeatMessage.TYPE;
    }
}
