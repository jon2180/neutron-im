package com.neutron.desktop.model;

import com.neutron.desktop.ui.ChatFrame;
import com.neutron.desktop.ui.LoginFrame;
import com.neutron.desktop.ui.MainFrame;
import com.neutron.desktop.ui.RegisterFrame;

import java.util.HashMap;
import java.util.Map;

public class FramesManager {
    private final HashMap<String, ChatFrame> chatFrames;
    private State currentState;
    private LoginFrame loginFrame;
    private RegisterFrame regFrame;
    private MainFrame frame;

    private ApplicationContext context;

    public FramesManager(ApplicationContext context) {
        this.context = context;
        chatFrames = new HashMap<>();
        currentState = State.Login;
    }

    public void switchToLogin() {
        disposeRegisterFrame();
        disposeAllChatFrame();

        if (loginFrame == null)
            loginFrame = new LoginFrame(context);
        else
            loginFrame.setVisible(true);
        currentState = State.Login;
    }

    public void switchToReg() {
        disposeLoginFrame();
        disposeAllChatFrame();

        if (regFrame == null)
            regFrame = new RegisterFrame(context);
        else
            regFrame.setVisible(true);
        currentState = State.Reg;
    }

    public void switchToMain() {
        disposeLoginFrame();
        disposeRegisterFrame();
        disposeAllChatFrame();

        frame = new MainFrame(context);
        currentState = State.Main;
    }

    private void disposeLoginFrame() {
        if (loginFrame != null)
            loginFrame.dispose();
    }

    private void disposeRegisterFrame() {
        if (regFrame != null)
            regFrame.dispose();
    }

    private void disposeAllChatFrame() {
        if (!chatFrames.isEmpty()) {
            for (Map.Entry<String, ChatFrame> item : chatFrames.entrySet()) {
                ChatFrame cf = item.getValue();
                cf.dispose();
            }
            chatFrames.clear();
        }
    }

    public void createChatFrame(String qq) {
        ChatFrame chatFrame;
        if (!chatFrames.containsKey(qq)) {
            chatFrame = new ChatFrame(context,"1234567", qq);
            chatFrames.put(qq, chatFrame);
        } else {
            chatFrame = chatFrames.get(qq);
            chatFrame.setVisible(true);
        }
    }

    public void disposeChatFrame(String qq) {
        if (chatFrames.containsKey(qq)) {
            chatFrames.get(qq).dispose();
            chatFrames.remove(qq);
        }
    }

    /**
     * 当前用户状态 枚举类型
     */
    public enum State {
        Login,
        Reg,
        Main,
    }
}
// is auto open chat frame
//    private boolean isAutoOpen = true;

//    private String id;
//    public void setId(String newId) {
//        id = newId;
//    }

//    public MainFrame getFrame() {
//        return frame;
//    }
//
//    public RegisterFrame getRegFrame() {
//        return regFrame;
//    }
//
//    public LoginFrame getLoginFrame() {
//        return loginFrame;
//    }
