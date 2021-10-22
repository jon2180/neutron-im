package com.neutron.desktop.controller;

import com.neutron.desktop.model.FramesManager;
import com.neutron.core.protocol.DataPacket;

import java.nio.channels.SocketChannel;

public class SignOnRespController extends BaseController {
    public SignOnRespController(FramesManager fm, SocketChannel channel) {
        super(fm, channel);
    }

    @Override
    public void handle(DataPacket packet, SocketChannel channel) {

    }
}
