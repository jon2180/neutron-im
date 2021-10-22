package com.neutron.im.websocket.handler;

import com.neutron.im.websocket.WebSocketServerEndpoint;
import com.neutron.im.websocket.message.GroupChatMessage;
import org.springframework.stereotype.Component;

@Component
public class GroupChatExecutor extends BaseExecutor<GroupChatMessage> {
    @Override
    public int execute(GroupChatMessage message, WebSocketServerEndpoint server) {
        return 0;
    }

    @Override
    public String getType() {
        return GroupChatMessage.TYPE;
    }
}
