package com.neutron.im.websocket.handler;

import com.neutron.im.websocket.WebSocketServerEndpoint;
import com.neutron.im.websocket.message.ExitMessage;
import com.neutron.im.websocket.util.MemoryUtil;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class ExitExecutor extends BaseExecutor<ExitMessage> {

    @Override
    public int execute(ExitMessage message, WebSocketServerEndpoint server) {
        // 服务端断开连接
        MemoryUtil.clientMap().remove(server.id);
        try {
            server.session.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public String getType() {
        return ExitMessage.TYPE;
    }
}
