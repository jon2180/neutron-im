package com.neutron.im.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author daydream
 */
@Component
public class AppConstants {

    /**
     * production
     */
    public static final String PROD_ASSETS_BASE_URL = "im.showmecode.cc/assets/";
    public static final String PROD_BACKEND_BASE_URL = "im.showmecode.cc/apis/";
    public static final String PROD_FRONTEND_DOMAIN = "im.showmecode.cc";
    public static final String PROD_COOKIE_DOMAIN = ".showmecode.cc";

    /**
     * DEV
     */
    public static final String DEV_FRONTEND_DOMAIN = "localhost";
    /**
     * 静态文件保存路径
     */
    public static final int assetsPort = 3002;
    public static final String DEV_ASSETS_BASE_URL = "localhost:" + assetsPort;
    public static final String DEV_UPLOAD_BASE_URL = DEV_ASSETS_BASE_URL + "/upload/";
    public static final String DEV_AVATAR_BASE_URL = DEV_ASSETS_BASE_URL + "/avatar/";
    public static final String DEV_STATIC_BASE_URL = DEV_ASSETS_BASE_URL + "/static/";

    public static final int serverPort = 3001;
    public static final String DEV_BACKEND_BASE_URL = "localhost:" + serverPort;
    public static final int imPort = 3000;
    public static final boolean isHttps = false;
    /**
     * http 访问静态资源的链接
     *
     * @param filename
     * @return
     */
    private static boolean isProduction = false;

    public static void enableProdMode() {
        AppConstants.isProduction = true;
    }

    public static boolean isEnabledProduction() {
        return isProduction;
    }

    public static String getImCookieDomain() {
        return isEnabledProduction() ? ".showmecode.cc" : "localhost";
    }

    private static String getAssetsPath() {
        return isEnabledProduction() ? "/www/wwwroot/assets" : "D:/Downloads/assets";
    }

    public static String getStaticPath() {
        return getAssetsPath() + "/static";
    }

    public static String getAvatarPath() {
        return getAssetsPath() + "/avatar";
    }

    public static String getUploadPath() {
        return getAssetsPath() + "/upload";
    }

    /**
     * http 访问头像的链接
     */
    public static String getUploadUrl(String filename) {
        if (filename == null || ".".equals(filename)) {
            return filename;
        }
        return "//" + (isProduction ? PROD_ASSETS_BASE_URL + "upload/" : DEV_UPLOAD_BASE_URL) + filename;
    }

    public static String getStaticUrl(String filename) {
        if (filename == null || ".".equals(filename)) {
            return filename;
        }
        return "//" + (isProduction ? PROD_ASSETS_BASE_URL + "static/" : DEV_STATIC_BASE_URL) + filename;
    }

    /**
     * 头像保存路径
     */
    public static String getAvatarUrl(String filename) {
        if (filename == null || "".equals(filename)) {
            return filename;
        }
        return "//" + (isProduction ? PROD_ASSETS_BASE_URL + "avatar/" : DEV_AVATAR_BASE_URL) + filename;
    }
}
