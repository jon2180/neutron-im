package com.neutron.im.config;

import com.neutron.im.util.MailService;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import javax.mail.MessagingException;

@SpringBootTest
@Disabled
class MailServiceTest {

    @Resource
    private MailService mailService;

    @Test
    void sendSimpleMail() {
    }

    @Test
    void sendInlineResourceMail() {
        String to = "xxx@163.com";
        String subject = "今晚要加班，不用等我了";
        String rscId = "img110";
        String content = "<html><body><img width='250px' src=\'cid:" + rscId + "\'></body></html>";
        // 此处为linux系统路径
        String imgPath = "/Users/kx/WechatIMG16.jpeg";
        try {
            mailService.sendInlineResourceMail(to, subject, content, imgPath, rscId);
            System.out.println("成功了");
        } catch (MessagingException e) {
            System.out.println("失败了");
            e.printStackTrace();
        }
    }

    @Test
    void sendHtmlMail() {
        String to = "xxx@qq.com";
        String subject = "猜猜我今天买了啥";
        String content = "<html><head></head><body><h3>哈哈，什么都没有</h3></body></html>";
        try {
            mailService.sendHtmlMail(to, subject, content);
            System.out.println("成功了");
        } catch (MessagingException e) {
            System.out.println("失败了");
            e.printStackTrace();
        }
    }

    @Test
    void sendAttachmentsMail() {
        String to = "xxx@163.com";
        String subject = "这是一个有附件的邮件，记得接受文件";
        String content = "嗯哼？自己看附件";
        String imgPath = "/Users/kx/WechatIMG16.jpeg";
        try {
            mailService.sendAttachmentsMail(to, subject, content, imgPath);
            System.out.println("成功了");
        } catch (MessagingException e) {
            System.out.println("失败了");
            e.printStackTrace();
        }
    }
}
