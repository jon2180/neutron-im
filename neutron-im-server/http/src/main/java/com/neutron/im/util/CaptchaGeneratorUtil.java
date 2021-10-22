package com.neutron.im.util;

import lombok.Data;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

@Data
public class CaptchaGeneratorUtil {

    private int weight = 100;             //验证码图片的长和宽
    private int height = 32;
    private String text;                // 用来保存验证码的文本内容
    private Random random = new Random();      // 获取随机数对象
    private String[] fontNames = {"宋体", "华文楷体", "黑体", "微软雅黑", "楷体_GB2312"};   //字体数组
    private String codes = "23456789abcdefghjkmnopqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ";    //验证码数组

    // 将验证码图片写出的方法
    public static void output(BufferedImage image, OutputStream out) throws IOException {
        ImageIO.write(image, "JPEG", out);
    }

    /**
     * 获取随机的颜色
     *
     * @return 返回一个随机颜色
     */
    private Color randomColor() {
        // 这里为什么是 [0, 150]，因为当r，g，b都为255时，即为白色，为了好辨认，需要颜色深一点。
        int r = this.random.nextInt(150);
        int g = this.random.nextInt(150);
        int b = this.random.nextInt(150);
        return new Color(r, g, b);
    }

    /**
     * 获取随机字体
     *
     * @return 一个随机的字体
     */
    private Font randomFont() {
        return new Font(
            /* 字体名字 */ fontNames[random.nextInt(fontNames.length)],
            /* 字体风格 0是无样式，1是加粗，2是斜体，3是加粗加斜体  */ Font.PLAIN,
            /* 字体大小 */random.nextInt(5) + 24
        );
    }

    // 获取随机字符
    private char randomChar() {
//        int index = r.nextInt(codes.length());
        return codes.charAt(random.nextInt(codes.length()));
    }

    // 画干扰线，验证码干扰线用来防止计算机解析图片
    private void drawLine(BufferedImage image) {
        //定义干扰线的数量
        int num = 10;
        Graphics2D g = (Graphics2D) image.getGraphics();
        for (int i = 0; i < num; i++) {
            int x1 = random.nextInt(weight);
            int y1 = random.nextInt(height);
            int x2 = random.nextInt(weight);
            int y2 = random.nextInt(height);
            g.setColor(randomColor());
            g.drawLine(x1, y1, x2, y2);
        }
    }

    // 创建图片的方法
    private BufferedImage createImage() {
        BufferedImage image = new BufferedImage(weight, height, BufferedImage.TYPE_INT_RGB); //创建图片缓冲区
        Graphics2D g = (Graphics2D) image.getGraphics();     //获取画笔
        g.setColor(Color.WHITE);                 //设置背景色
        g.fillRect(0, 0, weight, height);
        return image;                           //返回一个图片
    }

    // 获取验证码图片的方法
    public BufferedImage getImage() {
        BufferedImage image = createImage();
        Graphics2D g = (Graphics2D) image.getGraphics();     //获取画笔
        StringBuilder sb = new StringBuilder();
        // 画四个字符即可
        for (int i = 0; i < 4; i++) {
            String s = randomChar() + ""; //随机生成字符，因为只有画字符串的方法，没有画字符的方法，所以需要将字符变成字符串再画
            sb.append(s);                                  //添加到StringBuilder里面
            float x = i * 1.0F * weight / 4;                     //定义字符的x坐标
            g.setFont(randomFont());                      //设置字体，随机
            g.setColor(randomColor());                    //设置颜色，随机
            g.drawString(s, x, height - 5);
        }
        this.text = sb.toString();
        drawLine(image);
        return image;
    }

    // 获取验证码文本的方法
    public String getText() {
        return text;
    }
}
