package com.neutron.im.util;

import java.util.Random;

public class StringUtil {

    private static final String upperCaseStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String lowerCaseStr = "abcdefghijklmnopqrstuvwxyz";
    private static final String numbersStr = "0123456789";
    private static final String CHAR_SEQUENCE = upperCaseStr + lowerCaseStr + numbersStr;
    public static Random random = new Random();

    public static boolean isEmpty(String str) {
        return (str == null || "".equals(str));
    }


    public static StringBuilder generate(int len) {
        StringBuilder id = new StringBuilder();
        // Random random = new Random();
        for (int i = 0; i < len; ++i) {
            id.append(
                CHAR_SEQUENCE.charAt(
                    random.nextInt(CHAR_SEQUENCE.length())
                )
            );
        }
        return id;
    }

    public static String generateUid(int len) throws IllegalArgumentException {
        return "u_" + generate(len - 2).toString();
    }

    public static String generateUid() {
        return generateUid(16);
    }

}
