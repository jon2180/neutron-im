package com.neutron.im.util;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DisplayName("JUnit Platform Suite Demo")
class ValidatorTest {

    @ParameterizedTest(name = "{index} test invalid email")
    @ValueSource(strings = {"zxcvb.com", "zx_cvbnm", "zx13cvb4-nm", "12457852369"})
    public void isEmail(String email) {
        System.out.println(email);
        assertFalse(Validator.isEmail(email));
    }

    @ParameterizedTest(name = "{index} test valid email")
    @ValueSource(strings = {"example@qq.com", "fads_fa@ff.com"})
    public void isValidEmail(String email) {
        System.out.println(email);
        assertTrue(Validator.isEmail(email));
    }

    @Test
    void checkPassword() {
        assertTrue(Validator.isPassword("DStfdsf7845"));
    }
}
