package com.neutron.im.websocket.util;

import com.neutron.im.websocket.WebSocketServerEndpoint;

import jakarta.websocket.Session;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 关键数据结构
 */
public class MemoryUtil {

    public static final ConcurrentHashMap<String, List<Session>> groupMap = new ConcurrentHashMap<>();
    private static final ConcurrentHashMap<String, WebSocketServerEndpoint> endpointMap = new ConcurrentHashMap<>();

    public static ConcurrentHashMap<String, WebSocketServerEndpoint> clientMap() {
        return endpointMap;
    }
}
