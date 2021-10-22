package com.neutron.im.websocket.message;

public class HeartBeatResponse implements Message {
    public static final String TYPE = "PONG";
    private String msg;
}
