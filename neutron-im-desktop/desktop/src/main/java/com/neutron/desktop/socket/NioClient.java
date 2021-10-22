package com.neutron.desktop.socket;

import com.neutron.core.socket.SelectionKeyHandler;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.SocketChannel;

/**
 * 基于NIO实现客户端连接的主类
 *
 * @version v191204
 */
@Slf4j
public class NioClient {

    private final SocketChannel socketChannel;
    private final ReceiveThread receiverThread;
    private final Selector selector;
    private final InetSocketAddress inetSocketAddress;


    public NioClient(InetSocketAddress address, SelectionKeyHandler keyHandler) throws IOException {
        inetSocketAddress = address;
        socketChannel = SocketChannel.open(inetSocketAddress);
        socketChannel.configureBlocking(false);

        selector = Selector.open();
        socketChannel.register(selector, SelectionKey.OP_READ);
        // 接受服务器响应
        receiverThread = new ReceiveThread(selector, keyHandler);
    }

    public SocketChannel getSocketChannel() {
        return socketChannel;
    }

    public Thread getReceiverThread() {
        return receiverThread;
    }

    public InetSocketAddress getInetSocketAddress() {
        return inetSocketAddress;
    }

    public void shutdown() {
        receiverThread.shutdown();
        try {
            socketChannel.close();
            selector.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static class ReceiveThread extends Thread {
        private final SelectionKeyHandler keyHandler;
        private final Selector selector;
        private boolean isRunning = true;

        public ReceiveThread(Selector selector, SelectionKeyHandler keyHandler) {
            this.keyHandler = keyHandler;
            this.selector = selector;
        }

        @Override
        public void run() {
            log.info("Receiver thread has stared successfully");
            // 循环等待新消息
            while (selector.isOpen() && isRunning) {
                try {
                    // 获取可用channel数量，避免进行下列无效操作
                    if (selector.select() == 0)
                        continue;
                } catch (Exception e) {
                    e.printStackTrace();
                    break;
                }

                // 获取可用channel的集合
                keyHandler.handle(selector.selectedKeys());
            }
        }

        public void shutdown() {
            isRunning = false;
        }
    }

}
