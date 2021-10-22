package com.neutron.desktop.ui;

import com.neutron.desktop.model.ApplicationContext;
import com.neutron.desktop.model.FramesManager;

import javax.swing.*;
import java.awt.*;

/**
 * FriendsFrame
 *
 * @version 191216
 */
public class MainFrame extends JFrame {

    private final JPanel test = new JPanel();

    private final FramesManager framesManager;

    public MainFrame(ApplicationContext context) {
        super(String.format("%s - %s", "好友列表", context.getAppName()));

        framesManager = context.getFramesManager();

        setDefaultLookAndFeelDecorated(true);

        test.setLayout(new FlowLayout());

        setBounds(300, 200, 260, 600);    //设置容器的大小);
        setPreferredSize(new Dimension(260, 600));
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        getContentPane().add(test);

        setResizable(false);
        pack();
        setVisible(true);

        setMenuBar(new MyMenuBar());
    }

//    Vector<Friend> friends;

//    public void render(Vector<Friend> friends) {
//        this.friends = friends;
//        updateFriendsList();
//        repaint();
//    }

    public void updateFriendsList() {
//        if (friends == null)
//            return;
        test.removeAll();
//        for (int i = 0; i < friends.size(); ++i) {
//            FriendPanel friendPanel = new FriendPanel(friends.get(i).getTargetUserId());
//            friendPanel.setLocation(0, 50 * i);
//            friendPanel.setVisible(true);
//            test.add(friendPanel);
//        }
    }

    private static class MyMenuBar extends MenuBar {
        public MyMenuBar() {
            super();

            Menu my = new Menu("Me");
            my.add(new MenuItem("Exit"));

            add(my);
        }
    }

    private class FriendPanel extends JPanel {
        public FriendPanel(String qq) {
            super();
            JButton friendsBtn = new JButton("Chatting with " + qq);
            friendsBtn.setPreferredSize(new Dimension(200, 50));
            friendsBtn.addActionListener(e -> {
                // 如果还没有打开聊天页面，则打开聊天页面
                framesManager.createChatFrame(qq);
            });
            pack();

            add(friendsBtn);
        }
    }
}
