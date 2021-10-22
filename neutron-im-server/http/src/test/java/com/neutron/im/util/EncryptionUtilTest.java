package com.neutron.im.util;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.security.NoSuchAlgorithmException;

@DisplayName("测试")
class EncryptionUtilTest {


    @ParameterizedTest
    @ValueSource(strings = {"fadsfhjgkajkasdjkghkaldsjg"})
    void md5(String str) {
        try {
            System.out.println(EncryptionUtil.md5(str));
            System.out.println(EncryptionUtil.encryptToString(EncryptionUtil.EncryptionAlgorithm.MD5, str));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    @Test
    void sha1() {
    }

    @Test
    void sha256() {
    }

    @Test
    void hmacSha1() {
    }

    @Test
    void testHmacSha1() {
    }

    @Test
    void createHmacSha1Key() {
    }

    @Test
    void hmacSha256() {
    }

    @Test
    void testHmacSha256() {
    }

    @Test
    void createHmacSha256Key() {
    }
}
