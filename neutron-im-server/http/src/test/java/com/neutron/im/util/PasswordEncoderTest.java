package com.neutron.im.util;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class PasswordEncoderTest {

    private Logger logger = LoggerFactory.getLogger(PasswordEncoderTest.class);

    @ParameterizedTest
    @ValueSource(strings = {"hello", "ifasyfou", "password"})
    void testPasswordEncoder(String rawPassword) {
        var encoder = new BCryptPasswordEncoder();
        var str = encoder.encode(rawPassword);
        logger.info(str);
        assertTrue(encoder.matches(rawPassword, str));
    }

    @Test
    void testGenSalt() {
        String salt = BCrypt.gensalt();
        logger.info(salt);
        String encoded = BCrypt.hashpw("password", salt);
        logger.info(encoded);
    }
}
