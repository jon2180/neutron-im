package com.neutron.server.socket.impl;

import com.neutron.server.socket.EventDispatcher;
import lombok.extern.slf4j.Slf4j;
import com.neutron.core.Controller;
import com.neutron.core.ControllerMapper;
import com.neutron.core.api.MessageHeaderProto;
import com.neutron.core.protocol.DataPacket;

import java.nio.channels.SocketChannel;

/**
 * 统一分发处理路由，此实现需要用到 ControllerMapper 来映射 处理对象，实现请求分发
 *
 * @version 191215
 */
@Slf4j
public class EventDispatcherImpl<T extends Controller> implements EventDispatcher {

    protected ControllerMapper<T> handlerMap;

    public EventDispatcherImpl(ControllerMapper<T> handlerMap) {
        this.handlerMap = handlerMap;
    }

    @Override
    public void dispatch(DataPacket packet, SocketChannel socketChannel) {
        if (handlerMap != null && handlerMap.containsKey(packet.getContentType())) {
            handlerMap.get(packet.getContentType())
                .handle(packet, socketChannel);
        } else {
            log.info("No such message handler");
        }
    }

    private int readHeader(MessageHeaderProto.MessageHeader header) {
        String token = header.getToken();
        if (!verifyToken(token))
            return 1;

        return 0;
    }

    private boolean verifyToken(String token) {
        return true;
    }
}
