package com.neutron.server.socket.impl;

import com.neutron.server.socket.EventDispatcher;
import com.neutron.server.socket.SelectionKeyHandler;
import lombok.extern.slf4j.Slf4j;
import com.neutron.core.protocol.DataPacket;
import com.neutron.core.protocol.DataSlice;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Set;

@Slf4j
public class SelectionKeyHandlerImpl implements SelectionKeyHandler {

    private final EventDispatcher eventDispatcher;

    private int bufferSize = 256;

    private String charset = "UTF-8";

    public SelectionKeyHandlerImpl(EventDispatcher eventDispatcher) {
        this.eventDispatcher = eventDispatcher;
    }

    public SelectionKeyHandlerImpl(EventDispatcher eventDispatcher, int bufferSize, String charset) {
        this.eventDispatcher = eventDispatcher;

        if (bufferSize > 0)
            this.bufferSize = bufferSize;
        if (charset != null)
            this.charset = charset;
    }

    /**
     * 处理接入事件
     *
     * @param selectionKey 选择键
     * @throws IOException 发生IOException时抛出
     */
    @Override
    public void handleAccept(SelectionKey selectionKey) throws IOException {
        // 如果是接入事件，创建 SocketChannel
        SocketChannel socketChannel = ((ServerSocketChannel) selectionKey.channel()).accept();
        // 将socketChannel设置为非阻塞工作模式
        socketChannel.configureBlocking(false);
        // 将channel注册到selector上，监听可读事件
        // 将选择器注册到连接到的客户端信道，并指定该信道key值的属性为OP_READ，同时为该信道指定关联的附件
        socketChannel.register(selectionKey.selector(), SelectionKey.OP_READ, ByteBuffer.allocate(bufferSize));
    }

    /**
     * 处理可读事件
     *
     * @param selectionKey 该请求的SocketChannel实体
     */
    @Override
    public void handleRead(SelectionKey selectionKey) throws IOException {
        SocketChannel socketChannel = (SocketChannel) selectionKey.channel();

        // 创建buffer
        ByteBuffer byteBuffer;
        if (selectionKey.attachment() == null) {
            byteBuffer = ByteBuffer.allocate(bufferSize);
        } else {
            byteBuffer = (ByteBuffer) selectionKey.attachment();
            byteBuffer.clear();
        }

        var ds = DataSlice.fromSocketChannel(socketChannel, byteBuffer);
        var dp = DataPacket.fromDataSlice(ds, Boolean.class);

//            ByteArrayOutputStream baos = new ByteArrayOutputStream();
//
//            int sz;       // 获取到的字节长度
//            byte[] bytes; // 暂存
//            // 循环读取数据，放入到 ByteArrayOutputStream
//            while ((sz = socketChannel.read(byteBuffer)) > 0) {
//                byteBuffer.flip();
//                bytes = new byte[sz];
//                byteBuffer.get(bytes);
//                baos.write(bytes);
//                byteBuffer.clear();
//            }
//
//            System.out.println("Size: " + baos.size());

        if (eventDispatcher != null) {
            eventDispatcher.dispatch(dp, socketChannel);
        }
//            baos.close();

//        selectionKey.interestOps(selectionKey.interestOps() | SelectionKey.OP_WRITE);
//        selectionKey.attach(byteBuffer);
    }

    @Override
    public void handleWrite(SelectionKey selectionKey) throws IOException {
        log.info("SelectionKey.OP_WRITE...");
//        ByteBuffer buffer = (ByteBuffer) selectionKey.attachment();
//        SocketChannel channel = (SocketChannel) selectionKey.channel();
//        if (buffer.hasRemaining()) {
//            channel.write(buffer);
//        } else {
//            // 发送完了就取消写事件，否则下次还会进入该分支
//            selectionKey.interestOps(selectionKey.interestOps() & ~SelectionKey.OP_WRITE);
//        }
    }

    @Override
    public void handle(SelectionKey key) throws IOException {
        if (key.isAcceptable()) {
            handleAccept(key);
        }
        if (key.isReadable()) {
            handleRead(key);
        }
        if (key.isWritable()) {
            handleWrite(key);
        }
    }

    @Override
    public void handle(Set<SelectionKey> selectedKeys) {
        // 迭代器遍历 selectionKey 的 set
        Iterator<SelectionKey> iterator = selectedKeys.iterator();
        while (iterator.hasNext()) {

            // selectionKey实例
            SelectionKey selectionKey = iterator.next();

            // [!] 移除set中的当前的selectionKey
            iterator.remove();

            // 根据就绪状态来判断相应的逻辑
            try {
                handle(selectionKey);
            } catch (IOException e) {
                log.info("handle selectionKey error");
                try {
                    selectionKey.channel().close();
                } catch (IOException ioException) {
                    ioException.printStackTrace();
                }
            }
        }
    }
}
