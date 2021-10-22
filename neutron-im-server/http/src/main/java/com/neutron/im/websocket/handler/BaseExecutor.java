package com.neutron.im.websocket.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.neutron.im.websocket.WebSocketServerEndpoint;
import com.neutron.im.websocket.message.Message;
import com.neutron.im.websocket.util.MemoryUtil;

import java.util.Map;

public abstract class BaseExecutor<T extends Message> {

    private static final ObjectMapper mapper = new ObjectMapper();

    protected Map<String, WebSocketServerEndpoint> clientMap() {
        return MemoryUtil.clientMap();
    }

    protected WebSocketServerEndpoint session(String chatId) {
        return clientMap().get(chatId);
    }

    /**
     * 把对象 json 化
     *
     * @param object 待格式化的对象
     * @return 格式化后的 json 字符串
     * @throws JsonProcessingException json处理出错
     */
    protected String jsonify(Object object) throws JsonProcessingException {
        return mapper.writeValueAsString(object);
    }

    public abstract int execute(T message, WebSocketServerEndpoint server);

    public abstract String getType();
}
