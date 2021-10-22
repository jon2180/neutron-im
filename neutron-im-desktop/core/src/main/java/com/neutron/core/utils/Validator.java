package com.neutron.core.utils;

/**
 * 格式验证器
 *
 * @version v200707
 * @since 11
 */
public class Validator {
    /**
     * 用户名验证 正则： "^[^0-9][\\w_]{5,9}$"
     *
     * @param name 用户名
     * @return 验证结果
     */
    public static boolean checkName(String name) {
        return name.matches("^[^0-9][\\w_]{5,9}$");
    }

    /**
     * 移动电话号码验证 正则格式标准 "^[1][3456789][0-9]{9}$"
     *
     * @param tel 电话号码
     * @return 验证结果
     */
    public static boolean checkMobilePhone(String tel) {
        return tel.matches("^[1][3456789][0-9]{9}$");
    }

    /**
     * 密码验证 正则："^[\\w_]{6,20}$"
     *
     * @param pwd 密码
     * @return 验证结果
     */
    public static boolean checkPassword(String pwd) {
        return pwd.matches("^[\\w_]{6,20}$");
    }


    /**
     * 复杂密码验证 正则： "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*?[#?!@$%^&*-]).{6,}$"
     *
     * @param pwd 密码
     * @return 验证结果
     */
    public static boolean checkComplexPassword(String pwd) {
        return pwd.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*?[#?!@$%^&*-]).{6,}$");
    }
}
