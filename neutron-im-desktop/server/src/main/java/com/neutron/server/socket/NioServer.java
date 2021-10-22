package com.neutron.server.socket;

import lombok.extern.slf4j.Slf4j;
//import com.neutron.core.socket.EventDispatcher;
import com.neutron.server.socket.impl.SelectionKeyHandlerImpl;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.util.Iterator;

/**
 * 创建 TCP 服务器
 * 关键类：Channels ServerSocketChannel, Selector, SelectorKey
 *
 * @version 191211
 */
@Slf4j
public class NioServer {
    private final int port;
    private final SelectionKeyHandler keyHandler;
    private Selector selector;
    private ServerSocketChannel serverSocketChannel;

    public NioServer(EventDispatcher dispatcher, int port) {
        this.keyHandler = new SelectionKeyHandlerImpl(dispatcher);
        this.port = port;
    }

    public void start() throws IOException {
        // 通过 ServerSocketChannel 创建channel通道ss
        serverSocketChannel = ServerSocketChannel.open();
        // 为channel 通道绑定监听端口
        serverSocketChannel.socket().bind(new InetSocketAddress(port));
        // 设置channel为非阻塞模式
        serverSocketChannel.configureBlocking(false);

        // 创建一个 selector
        selector = Selector.open();
        // 将channel 注册到selector上，监听连接事件
        serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

        log.debug("Server running at port :" + port);

        // 服务器启动成功
        while (selector.isOpen()) {
            // 获取可用channel数量
            try {
                if (selector.select() == 0) {
                    continue;
                }
            } catch (IOException ioE) {
                log.warn("In NioServer::run", ioE);
                ioE.printStackTrace();
                break;
            }

            // 获取所有可用channel的集合
            Iterator<SelectionKey> it = selector.selectedKeys().iterator();
            while (it.hasNext()) {
                // selectionKey实例
                SelectionKey key = it.next();
                // [!] 移除set中的当前的selectionKey
                it.remove();

                // 根据就绪状态来判断相应的逻辑
                try {
                    keyHandler.handle(key);
                } catch (IOException cce) {
                    // If current socketChannel is disconnected, close the socketChanel
                    try {
                        key.channel().close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }

            }
        }
    }

    public void stop() {
        try {
            serverSocketChannel.close();
            selector.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
