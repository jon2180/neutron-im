package com.neutron.core.socket;

import com.neutron.core.protocol.DataPacket;

import java.nio.channels.SocketChannel;

/**
 * 事件分发器
 * <p>将请求转发至对应的处理函数</p>
 */
public interface EventDispatcher {

    /**
     * 处理事件，将字节数组解析为 MessagePacket 并把请求分发到对应的 Controller 中
     *  @param packet         存放消息包的字节数组
     * @param socketChannel 对应的套接字频道
     */
    void dispatch(DataPacket packet, SocketChannel socketChannel);
}
