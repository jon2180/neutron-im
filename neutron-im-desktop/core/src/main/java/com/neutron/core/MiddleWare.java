package com.neutron.core;

import com.neutron.core.protocol.DataPacket;

import java.nio.channels.SocketChannel;

public abstract class MiddleWare {

    protected MiddleWare nextMiddleWare = null;

    public void setNext(MiddleWare nextMiddleWare) {
        this.nextMiddleWare = nextMiddleWare;
    }

//    public MiddleWare getNext() {
//        return nextMiddleWare;
//    }

    public void handleRequest(DataPacket packet, SocketChannel channel) {
        boolean doNext = handle(packet, channel);
        if (nextMiddleWare != null && doNext) {
            nextMiddleWare.handleRequest(packet, channel);
        }
    }

    /**
     * @return 返回是否应该传递到下一个中间件
     */
    public abstract boolean handle(DataPacket packet, SocketChannel channel);
}
