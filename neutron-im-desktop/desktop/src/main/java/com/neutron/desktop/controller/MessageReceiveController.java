package com.neutron.desktop.controller;

import com.neutron.core.protocol.DataPacket;
import com.neutron.desktop.model.FramesManager;

import java.nio.channels.SocketChannel;

/**
 * 接收消息
 *
 * @version v200713
 */
public class MessageReceiveController extends BaseController {

    public MessageReceiveController(FramesManager fm, SocketChannel channel) {
        super(fm, channel);
    }

    @Override
    public void handle(DataPacket packet, SocketChannel channel) {
//        int statusCode = request.getStatusCode();
//        long time = request.getTime();
//        DataType type = request.getType();
//
//        Message message = request.getMessage();
//        ChatFrame chatFrame = framesManager.createChatFrame(message.getOriginAccount());
//        chatFrame.receiveMessage(message, time);
    }
}
