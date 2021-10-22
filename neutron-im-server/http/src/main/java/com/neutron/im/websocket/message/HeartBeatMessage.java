package com.neutron.im.websocket.message;

public class HeartBeatMessage implements Message {
    public static final String TYPE = "PING";

    private String msg;
}
