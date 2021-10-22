package com.neutron.server.socket;

import lombok.Builder;
import lombok.Getter;

import java.nio.channels.SocketChannel;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

public class SocketChannelMap extends ConcurrentHashMap<String, SocketChannelMap.UserSocket> {

    public void refresh() {
        for (HashMap.Entry<String, UserSocket> el : entrySet()) {
            UserSocket userSocket = el.getValue();

            if (userSocket.getChannel() == null || !userSocket.getChannel().isOpen())
                remove(el.getKey());
        }
    }

    @Builder
    @Getter
    public static class UserSocket {
        /**
         * 用户id
         */
        private final String userId;

        /**
         * 与用户相绑定的通道
         */
        private final SocketChannel channel;
    }
}
