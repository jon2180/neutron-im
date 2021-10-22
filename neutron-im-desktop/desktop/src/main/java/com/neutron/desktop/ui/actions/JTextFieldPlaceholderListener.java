package com.neutron.desktop.ui.actions;

import javax.swing.*;
import java.awt.*;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;

/**
 * 处理输入框的 placeholder
 *
 * @apiNote <p>
 * 实例
 * <br>
 * <code>
 * JTextField jTextField = new JTextField();
 * jTextField.addFocusListener(new JTextFieldHintListener(jTextField, "提示内容"));
 * </code>
 * </p>
 */
public class JTextFieldPlaceholderListener implements FocusListener {
    private String hintText;
    private JTextField textField;

    public JTextFieldPlaceholderListener(JTextField jTextField, String hintText) {
        this.textField = jTextField;
        this.hintText = hintText;
        jTextField.setText(hintText);  //默认直接显示
        jTextField.setForeground(Color.GRAY);
    }

    @Override
    public void focusGained(FocusEvent e) {
        //获取焦点时，清空提示内容
        String temp = textField.getText();
        if (temp.equals(hintText)) {
            textField.setText("");
            textField.setForeground(Color.BLACK);
        }
    }

    @Override
    public void focusLost(FocusEvent e) {
        //失去焦点时，没有输入内容，显示提示内容
        String temp = textField.getText();
        if (temp.equals("")) {
            textField.setForeground(Color.GRAY);
            textField.setText(hintText);
        }
    }
}
