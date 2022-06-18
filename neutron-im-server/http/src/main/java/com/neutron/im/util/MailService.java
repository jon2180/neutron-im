package com.neutron.im.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.File;

@Component
public class MailService {
    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * 文本邮件
     *
     * @param to
     * @param subject
     * @param content
     * @throws MailException
     */
    public void sendSimpleMail(String to, String subject, String content) throws MailException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from); // 邮件发送者
        message.setTo(to); // 邮件接受者
        message.setSubject(subject); // 主题
        message.setText(content); // 内容
        mailSender.send(message);
    }

    /**
     * 富文本邮件
     *
     * @param to
     * @param subject
     * @param content
     * @param rscPath
     * @param rscId
     * @throws MessagingException
     */
    public void sendInlineResourceMail(String to, String subject, String content, String rscPath, String rscId) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true);
        File file = new File(rscPath);
        FileSystemResource res = new FileSystemResource(file);
        helper.addInline(rscId, res);
        mailSender.send(message);
    }

    /**
     * html 邮件
     *
     * @param to
     * @param subject
     * @param content
     * @throws MessagingException
     */
    public void sendHtmlMail(String to, String subject, String content) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        //true 表⽰示需要创建⼀一个 multipart message
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

    /**
     * 带附件的邮件
     *
     * @param to
     * @param subject
     * @param content
     * @param filePath
     * @throws MessagingException
     */
    public void sendAttachmentsMail(String to, String subject, String content, String filePath) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true);
        FileSystemResource file = new FileSystemResource(new File(filePath));
        String fileName = file.getFilename();
        // 如果有多个附件，同样可以改变传参方式，使用集合多次调用helper.addAttachment(fileName, file);
        helper.addAttachment(fileName, file);
        mailSender.send(message);
    }
}
