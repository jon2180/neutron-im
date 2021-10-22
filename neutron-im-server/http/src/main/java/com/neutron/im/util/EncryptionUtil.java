package com.neutron.im.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * HeaUtil
 * Hash encryption algorithm
 * 哈希加密算法：MD5、SHA-1、SHA-256、HMAC-SHA-1、HMAC-SHA-256
 * 需要导入 org.apache.commons.codec 包
 *
 * @author hengyumo
 * @version 1.0
 * @since 2019/11/12
 */
@SuppressWarnings("WeakerAccess")
@Slf4j
public class EncryptionUtil {

    protected static char[] encrypt(EncryptionAlgorithm algorithm, String txt) throws NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance(algorithm.getName());
        byte[] bytes = messageDigest.digest(txt.getBytes());
        return Hex.encodeHex(bytes);
    }

    protected static String encryptToString(EncryptionAlgorithm algorithm, String txt) throws NoSuchAlgorithmException {
        return String.valueOf(encrypt(algorithm, txt));
    }

    /**
     * md5加密
     *
     * @param text 内容
     * @return digest 摘要
     * @throws NoSuchAlgorithmException e
     */
    public static char[] md5(String text) throws NoSuchAlgorithmException {
        return encrypt(EncryptionAlgorithm.MD5, text);
//        MessageDigest messageDigest = MessageDigest.getInstance("MD5");
//        byte[] bytes = messageDigest.digest(text.getBytes());
//        log.debug(Arrays.toString(bytes));
//        return Hex.encodeHex(bytes);
    }

    /**
     * sha1加密
     *
     * @param text 内容
     * @return digest 摘要
     * @throws NoSuchAlgorithmException e
     */
    public static String sha1(String text) throws NoSuchAlgorithmException {
        return encryptToString(EncryptionAlgorithm.SHA1, text);
//        MessageDigest messageDigest = MessageDigest.getInstance("SHA-1");
//        byte[] bytes = messageDigest.digest(text.getBytes());
//        return Hex.encodeHexString(bytes);
    }

    /**
     * sha256加密
     *
     * @param text 内容
     * @return digest 摘要
     * @throws NoSuchAlgorithmException e
     */
    public static String sha256(String text) throws NoSuchAlgorithmException {
        return encryptToString(EncryptionAlgorithm.SHA256, text);
//        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
//        byte[] bytes = messageDigest.digest(text.getBytes());
//        return Hex.encodeHexString(bytes);
    }

    /**
     * hmac-sha1加密
     *
     * @param text 内容
     * @param key  密钥
     * @return 密文
     * @throws Exception e
     */
    public static String hmacSha1(String text, String key) throws Exception {
        SecretKeySpec sk = new SecretKeySpec(key.getBytes(), "HmacSHA1");
        return hmacSha1(text, sk);
    }

    /**
     * hmac-sha1加密
     *
     * @param text 内容
     * @param sk   密钥
     * @return 密文
     * @throws Exception e
     */
    public static String hmacSha1(String text, SecretKeySpec sk) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA1");
        mac.init(sk);
        byte[] rawHmac = mac.doFinal(text.getBytes());
        return new String(Base64.encodeBase64(rawHmac));
    }

    /**
     * 生成 HmacSha1 密钥
     *
     * @param key 密钥字符串
     * @return SecretKeySpec
     */
    public static SecretKeySpec createHmacSha1Key(String key) {
        return new SecretKeySpec(key.getBytes(), "HmacSHA1");
    }

    /**
     * hmac-sha256加密
     *
     * @param text 内容
     * @param key  密钥
     * @return 密文
     * @throws Exception e
     */
    public static String hmacSha256(String text, String key) throws Exception {
        SecretKeySpec sk = new SecretKeySpec(key.getBytes(), "HmacSHA256");
        return hmacSha1(text, sk);
    }

    /**
     * hmac-sha256加密
     *
     * @param text 内容
     * @param sk   密钥
     * @return 密文
     * @throws Exception e
     */
    public static String hmacSha256(String text, SecretKeySpec sk) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(sk);
        byte[] rawHmac = mac.doFinal(text.getBytes());
        return new String(Base64.encodeBase64(rawHmac));
    }

    /**
     * 生成 HmacSha256 密钥
     *
     * @param key 密钥字符串
     * @return SecretKeySpec
     */
    public static SecretKeySpec createHmacSha256Key(String key) {
        return new SecretKeySpec(key.getBytes(), "HmacSHA256");
    }

    protected enum EncryptionAlgorithm {
        MD5("MD5"),
        SHA1("SHA-1"),
        SHA256("SHA-256");

        private final String name;

        EncryptionAlgorithm(String name) {
            this.name = name;
        }

        // 定义抽象方法
        public String getName() {
            return name;
        }
    }


//    protected enum EncryptionAlgorithm {
//        MD5 {
//            public String getName() {
//                return "MD5";
//            }
//        },
//        SHA1 {
//            public String getName() {
//                return "SHA-1";
//            }
//        },
//        SHA256 {
//            public String getName() {
//                return "SHA-256";
//            }
//        };
//
//        public abstract String getName();//定义抽象方法
//    }

}



