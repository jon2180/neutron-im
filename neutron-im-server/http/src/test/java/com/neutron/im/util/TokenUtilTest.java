package com.neutron.im.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class TokenUtilTest {
    @ParameterizedTest
    @ValueSource(strings = {"helloworld", "xiaowang"})
    public void testGenerateToken(String word) {
        String tokenStr = TokenUtil.generateToken(new TokenUtil.JwtClaimsData() {{
            setId(word);
//            setUid("");
//            setNickname(word);
//            setEmail("test");
        }});

        System.out.println(tokenStr);
        var result = TokenUtil.validateToken(tokenStr);
        Assertions.assertEquals(result.getId(), word);
    }
}
