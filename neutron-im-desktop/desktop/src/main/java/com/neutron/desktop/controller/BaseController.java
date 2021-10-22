package com.neutron.desktop.controller;

import com.neutron.desktop.model.FramesManager;
import com.neutron.core.Controller;
import com.neutron.core.protocol.DataPacket;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;

/**
 * Controller 用来处理 接收到的来自服务端的数据
 */
public abstract class BaseController implements Controller {
    protected FramesManager framesManager;
    protected SocketChannel channel;

    public BaseController(FramesManager fm, SocketChannel channel) {
        framesManager = fm;
        this.channel = channel;
    }

    public void setFramesManager(FramesManager fm) {
        framesManager = fm;
    }

    public abstract void handle(DataPacket packet, SocketChannel channel);

    /**
     * 向服务端发送 byteBuffer消息
     *
     * @param bytes byte数组对象
     * @return The number of bytes written, possibly zero
     */
    protected int write(byte[] bytes) {
        if (bytes == null)
            throw new IllegalArgumentException("NullPointerParameter");
        if (bytes.length == 0)
            return 0;

        assert channel != null && channel.isConnected();

        ByteBuffer bb = ByteBuffer.wrap(bytes);
        int len = 0;
        while (bb.hasRemaining()) {
            try {
                len += channel.write(bb);
            } catch (IOException e) {
                e.printStackTrace();
                return -1;
            }
        }
        return len;
    }
}
