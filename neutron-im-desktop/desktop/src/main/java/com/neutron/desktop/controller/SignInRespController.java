package com.neutron.desktop.controller;

import com.google.protobuf.InvalidProtocolBufferException;
import lombok.extern.slf4j.Slf4j;
import com.neutron.desktop.model.FramesManager;
import com.neutron.core.api.LoginApiProto;
import com.neutron.core.protocol.DataPacket;

import java.nio.channels.SocketChannel;

@Slf4j
public class SignInRespController extends BaseController {

    public SignInRespController(FramesManager fm, SocketChannel channel) {
        super(fm, channel);
    }

    @Override
    public void handle(DataPacket packet, SocketChannel channel) {
        log.info(String.valueOf(packet.getContentLength()));

        try {
            LoginApiProto.LoginResp loginResp = LoginApiProto.LoginResp.parseFrom(packet.getBody());

            log.info("" + loginResp.getId() + " " + loginResp.getToken());

            int statusCode = packet.getStatusCode();

            if (statusCode == 0) {
                framesManager.switchToMain();
            }
        } catch (InvalidProtocolBufferException e) {
            e.printStackTrace();
        }

    }
}
