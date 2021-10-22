package com.neutron.desktop.ui;

import com.neutron.core.utils.Validator;
import com.neutron.desktop.model.ApplicationContext;
import com.neutron.desktop.model.FramesManager;
import com.neutron.desktop.ui.actions.JTextFieldPlaceholderListener;
import com.neutron.desktop.ui.base.Singleton;
import lombok.extern.slf4j.Slf4j;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;

/**
 * 登录面板 JFrame
 */
@Slf4j
public class LoginFrame extends JFrame implements Singleton {

    private static final long serialVersionUID = 1L;

    private final FramesManager framesManager;
    private JPasswordField password;
    private String account;
    private boolean savePassword;
    private JLabel noticeLabel;
    private JTextField qqTextField;

    public LoginFrame(ApplicationContext context) {

        super(String.format("%s - %s", "Login", context.getAppName()));
        framesManager = context.getFramesManager();

        //设置窗体的位置及大小
        setBounds(600, 200, 400, 300);

        //设置一层相当于桌布的东西
        setLayout(new BorderLayout());

        //设置按下右上角X号后关闭
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // 初始化--往窗体里放其他控件
        buildForm();

        //设置窗体可见
        setLocationRelativeTo(null);
        setResizable(false);
        setVisible(true);
    }

    public void buildForm() {

        // 标题部分--North
        JPanel titlePanel = new JPanel();
        titlePanel.add(new JLabel("登录"));
        add(titlePanel, BorderLayout.NORTH);

        // 输入部分 -- Center
        JPanel fieldPanel = new JPanel();
        fieldPanel.setLayout(new FlowLayout());
        fieldPanel.setSize(300, 200);

        // QQ 号
        JPanel accountRow = new JPanel();
        accountRow.setLayout(new FlowLayout());
        JLabel qqLabel = new JLabel("QQ号");
//        qqLabel.setBounds(50, 20, 50, 20);
        accountRow.add(qqLabel);

        qqTextField = new JTextField("", 20);
        qqTextField.addFocusListener(new JTextFieldPlaceholderListener(qqTextField, "QQ"));
//        qqTextField.setBounds(110, 20, 120, 20);
        accountRow.add(qqTextField);


        fieldPanel.add(accountRow);


        JPanel passwordRow = new JPanel();
        passwordRow.setLayout(new FlowLayout());
        // 密码
        JLabel a2 = new JLabel("密码");
//        a2.setBounds(70, 20, 50, 20);
        passwordRow.add(a2);

        password = new JPasswordField("", 20);
        password.addFocusListener(new JTextFieldPlaceholderListener(password, "密码"));
//        password.setBounds(110, 60, 120, 20);
        passwordRow.add(password);

        fieldPanel.add(passwordRow);

        // 提示
        noticeLabel = new JLabel("");
//        noticeLabel.setBounds(50, 100, 170, 20);
        noticeLabel.setText("");
        fieldPanel.add(noticeLabel);

        // 添加到 frame
        add(fieldPanel, BorderLayout.CENTER);

        // 按钮部分--South
        JPanel buttonPanel = new JPanel();

        JButton certainBtn = new JButton("确定");
        //把监听器注册到控件上
        certainBtn.addActionListener(this::login);
        buttonPanel.add(certainBtn);

        // 取消按钮
        JButton cancelBtn = new JButton("重置");
        //把监听器注册到控件上
        cancelBtn.addActionListener(this::resetFrame);
        buttonPanel.add(cancelBtn);

        // 注册按钮
        JButton registerBtn = new JButton("注册");
        //把监听器注册到控件上
        registerBtn.addActionListener(this::register);
        buttonPanel.add(registerBtn);

        add(buttonPanel, BorderLayout.SOUTH);
    }

    private void register(ActionEvent actionEvent) {
        framesManager.switchToReg(); // 创建注册窗体
    }

    private void resetFrame(ActionEvent actionEvent) {
        password.setText("");
        qqTextField.setText("");
    }

    private void login(ActionEvent actionEvent) {
        String id = qqTextField.getText();
        String pwd = String.valueOf(password.getPassword());

        if (!Validator.checkPassword(pwd)) {
            noticeLabel.setText("你的账号/密码格式不正确");
            return;
        }

        final String message = "wrong username or password!";
        final String title = "ERROR";

        if (id.equals("") || pwd.equals("")) {
            System.out.println("QQ号或密码不能为空");
            noticeLabel.setText("账号、密码错误");

//                JOptionPane.showMessageDialog(null, message, title, JOptionPane.ERROR_MESSAGE);
        } else {
            // TODO
            //  lazy load channel
//                final UserRequest ur = RequestFactory.getUserRequest();
//                ur.login(id, pwd);
        }
    }

}
