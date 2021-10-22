package com.neutron.server.socket;

import java.io.IOException;
import java.nio.channels.SelectionKey;
import java.util.Set;

/**
 * selectionKey 处理器
 */
public interface SelectionKeyHandler {
    /**
     * 处理连接事件
     *
     * @param selectionKey selector中的selectionKey
     * @throws IOException 出现连接错误时抛出
     */
    void handleAccept(SelectionKey selectionKey) throws IOException;

    /**
     * 处理读取事件
     *
     * @param selectionKey selector中的selectionKey
     * @throws IOException 出现连接错误时抛出
     */
    void handleRead(SelectionKey selectionKey) throws IOException;

    /**
     * 处理写入事件
     *
     * @param selectionKey selector中的selectionKey
     * @throws IOException 出现连接错误时抛出
     */
    void handleWrite(SelectionKey selectionKey) throws IOException;

    /**
     * 处理事件
     *
     * @param key selector中的selectionKey
     * @throws IOException 出现连接错误时抛出
     */
    void handle(SelectionKey key) throws IOException;

    void handle(Set<SelectionKey> selectedKeys);
}
