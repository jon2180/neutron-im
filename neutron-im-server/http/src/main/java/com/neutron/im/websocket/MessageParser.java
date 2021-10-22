package com.neutron.im.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.neutron.im.websocket.message.Message;
import com.neutron.im.websocket.message.WebSocketMessage;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MessageParser {
    public static final ObjectMapper mapper;

    static {
        mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    }

    @SuppressWarnings("unchecked")
    public <T extends Message> WebSocketMessage<T> decode(String message) throws JsonProcessingException {
        return (WebSocketMessage<T>) mapper.readValue(message, WebSocketMessage.class);
    }

    public <T extends Message> String encode(WebSocketMessage<T> webSocketMessage) throws JsonProcessingException {
        return mapper.writeValueAsString(webSocketMessage);
    }
}
