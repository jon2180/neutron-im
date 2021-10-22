package com.neutron.server.utils;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

/**
 * 描述消息的格式信息[尚未完成]
 *
 * @version v191214
 */
public class StringUtil {
    public static String getMd5(String str) {
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        // 计算md5函数
        if (md != null) {
            md.update(str.getBytes());
            // 保留16位
            return new BigInteger(1, md.digest()).toString(16);
        }
        return null;
    }

    /**
     * 获取随机的7位QQ号
     *
     * @return QQ号
     */
    public static String getRandom() {
        return getRandom(7);
    }

    /**
     * 获取随机的QQ号
     *
     * @param len qq号长度
     * @return QQ号
     */
    public static String getRandom(int len) {
        StringBuilder qq = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < len; ++i) {
            qq.append(random.nextInt(10));
        }
        return qq.toString();
    }
}
