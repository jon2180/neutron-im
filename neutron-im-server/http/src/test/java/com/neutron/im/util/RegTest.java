package com.neutron.im.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

public class RegTest {

    @Disabled
    @ParameterizedTest
    @ValueSource(strings = {"http://localhost:3001/login-bg-hnpoppcv.jpeg"})
    public void testReg(String str) {
        Assertions.assertTrue(str.matches(".(JPEG|jpeg|JPG|jpg|png|PNG|svg|SVG)$"));
    }

    @ParameterizedTest
    @ValueSource(strings = {"http://localhost:3001/login-bg-hnpoppcv.jpeg", "gdsagas.jpg", "fdafas.fsad.png"})
    public void testReg2(String str) {
        Assertions.assertTrue(str.matches(".+(.jpeg|.JPEG|.jpg|.JPG|.png|.PNG|.svg|.SVG)$"));
    }

    @Disabled
    @ParameterizedTest
    @ValueSource(strings = {"http://localhost:3001/login-bg-hnpoppcv.jpeg", "gdsagas.jpg", "fdafas.fsad.png"})
    public void testReg3(String str) {
        Assertions.assertTrue(str.matches("(.JPEG|.jpeg|.JPG|.jpg)$"));
    }
}
