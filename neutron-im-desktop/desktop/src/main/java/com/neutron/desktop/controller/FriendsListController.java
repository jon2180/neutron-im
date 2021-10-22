package com.neutron.desktop.controller;

import com.neutron.desktop.model.FramesManager;
import com.neutron.core.protocol.DataPacket;

import java.nio.channels.SocketChannel;

/**
 * 好友列表信息
 */
public class FriendsListController extends BaseController {

    public FriendsListController(FramesManager fm, SocketChannel channel) {
        super(fm, channel);
    }

    @Override
    public void handle(DataPacket packet, SocketChannel channel) {
        //        int statusCode = request.getStatusCode();
//        long time = request.getTime();
//        DataType type = request.getType();
//
//        if (statusCode != 200 && type == DataType.PureString) {
//            JOptionPane.showMessageDialog(new JPanel(), request.getString(), "错误", JOptionPane.ERROR_MESSAGE);
//            return;
//        }
//
//        if (statusCode != 200 || type == DataType.FriendsVector) {
//            JOptionPane.showMessageDialog(new JPanel(), null, "错误", JOptionPane.WARNING_MESSAGE);
//        }
//
//        framesManager.switchToMain();
//        Vector<Friend> f = request.getFriends();
//        Vector<Friend> f = request.getData();
//        GlobalData.setFriends(f);
//        framesManager.getFrame().render(request.getFriends());
    }
}
