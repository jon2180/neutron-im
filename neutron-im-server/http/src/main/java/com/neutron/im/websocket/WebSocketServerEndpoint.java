package com.neutron.im.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.neutron.im.util.StringUtil;
import com.neutron.im.websocket.handler.BaseExecutor;
import com.neutron.im.websocket.message.HeartBeatMessage;
import com.neutron.im.websocket.message.Message;
import com.neutron.im.websocket.message.WebSocketMessage;
import com.neutron.im.websocket.util.MemoryUtil;
import com.neutron.im.websocket.util.WebSocketUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopProxyUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Date;
import java.util.HashMap;
import java.util.Objects;

/**
 * WebSocket 入口类，通过 ServerEndPoint 指定了连接路径
 *
 * @version v20210418
 * @since 11
 */
@Slf4j
@ServerEndpoint("/relay/{query}")
@Controller
public class WebSocketServerEndpoint implements InitializingBean {

    public static final MessageParser messageParser = new MessageParser();

    @SuppressWarnings("rawtypes")
    public static HashMap<String, BaseExecutor> executorHashMap = new HashMap<>();

    public static ApplicationContext applicationContext;

    /**
     * 记录当前在线连接数
     */
    public Session session;
    public String id;

    /**
     * 用于解决 心跳
     */
    private long lastReceiveTime;

    public Session getSession() {
        return session;
    }

    public String getId() {
        return id;
    }

    public long getLastReceiveTime() {
        return lastReceiveTime;
    }

    @Autowired
    public void setApplicationContext(ApplicationContext context) {
        applicationContext = context;
    }

    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, EndpointConfig endpointConfig, @PathParam("query") String param) {
        log.info("[onOpen][session({}) 接入]: {}", session, endpointConfig);
        if (param == null || param.equals("") || param.equals("-1")) {
            log.error("客户端没有关键参数传入，将关闭连接");
            try {
                if (session != null) {
                    session.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            return;
        }

        log.info("map:{}", session.getRequestParameterMap());

        this.id = param;
        this.session = session;
        this.lastReceiveTime = System.currentTimeMillis();
        MemoryUtil.clientMap().put(param, this);

        log.info("session #{} param: {}", session.getId(), param);
        log.info("有新连接 #{} 加入：当前在线人数为：{}", param, MemoryUtil.clientMap().size());
    }

    @OnError
    public void onError(Session session, Throwable error) {
        log.info("[onClose][session({}) 发生异常]", session, error);
        log.error("有一连接发生错误: {},当前在线人数为 {}", this.id, MemoryUtil.clientMap().size());
        error.printStackTrace();
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        log.info("[onClose][session({}) 连接关闭。关闭原因是({})}]", session, closeReason);
        MemoryUtil.clientMap().remove(id);
        try {
            if (session != null)
                session.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        log.info("有一连接关闭：{}，当前在线人数为：{}", id, MemoryUtil.clientMap().size());
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     */
    @OnMessage
    @SuppressWarnings({"rawtypes", "unchecked"})
    public void onMessage(Session session, String message) {
        log.info("[onMessage][session({}) 接收到一条消息({})]", session, message); // 生产环境下，请设置成 debug 级别
        lastReceiveTime = System.currentTimeMillis();

        if (StringUtil.isEmpty(message)) {
            log.warn("{} 没有收到有效数据", session.getId());
            return;
        }

        JsonNode rootNode = null;
        try {
            rootNode = MessageParser.mapper.readValue(message, JsonNode.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        if (rootNode == null) {
            log.error("解析 JSON 失败");
            return;
        }
        // get specific handler
        JsonNode typeNode = rootNode.get("type");
        if (typeNode == null || !typeNode.isTextual()) {
            log.error("解析 JSON 失败，type 属性为空或类型不匹配");
            return;
        }
        String type = typeNode.textValue();
        BaseExecutor executor = executorHashMap.get(type);
        if (executor == null) {
            log.error("[onMessage][消息类型({}) 不存在消息处理器]", type);
            try {
                WebSocketUtil.sendText(session, messageParser.encode(new WebSocketMessage<HeartBeatMessage>() {{
                    setType(HeartBeatMessage.TYPE);
                    setRequestId(new Date().toString());
                    setBody(new HeartBeatMessage());
                }}));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            return;
        }

        try {
            Class<? extends Message> messageClz = this.getMessageClass(executor);
            Message decodedMessage = MessageParser.mapper.readValue(rootNode.get("body").asText(), messageClz);
            log.info("message body({}): {}", messageClz, decodedMessage);
            executor.execute(decodedMessage, this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        // 通过 ApplicationContext 获得所有 MessageHandler Bean
        applicationContext.getBeansOfType(BaseExecutor.class).values() // 获得所有 MessageHandler Bean
            .forEach(messageHandler -> executorHashMap.put(messageHandler.getType(), messageHandler)); // 添加到 handlers 中
        log.info("[afterPropertiesSet][消息处理器数量：{}]", executorHashMap.size());
    }

    private Class<? extends Message> getMessageClass(BaseExecutor<?> handler) {
        // 获得 Bean 对应的 Class 类名。因为有可能被 AOP 代理过。
        Class<?> targetClass = AopProxyUtils.ultimateTargetClass(handler);
        // 获得接口的 Type 数组
        Type[] interfaces = targetClass.getGenericInterfaces();
        Class<?> superclass = targetClass.getSuperclass();
        while ((Objects.isNull(interfaces) || 0 == interfaces.length) && Objects.nonNull(superclass)) { // 此处，是以父类的接口为准
            interfaces = superclass.getGenericInterfaces();
            superclass = targetClass.getSuperclass();
        }
        if (Objects.nonNull(interfaces)) {
            // 遍历 interfaces 数组
            for (Type type : interfaces) {
                // 要求 type 是泛型参数
                if (type instanceof ParameterizedType) {
                    ParameterizedType parameterizedType = (ParameterizedType) type;
                    // 要求是 MessageHandler 接口
                    if (Objects.equals(parameterizedType.getRawType(), MessageHandler.class)) {
                        Type[] actualTypeArguments = parameterizedType.getActualTypeArguments();
                        // 取首个元素
                        if (Objects.nonNull(actualTypeArguments) && actualTypeArguments.length > 0) {
                            return (Class<Message>) actualTypeArguments[0];
                        } else {
                            throw new IllegalStateException(String.format("类型(%s) 获得不到消息类型", handler));
                        }
                    }
                }
            }
        }
        throw new IllegalStateException(String.format("类型(%s) 获得不到消息类型", handler));
    }
}
