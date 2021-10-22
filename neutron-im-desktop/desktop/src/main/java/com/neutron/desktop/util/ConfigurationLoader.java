package com.neutron.desktop.util;

import java.util.ResourceBundle;

public class ConfigurationLoader {
    private static final ResourceBundle serverConf;

    static {
        serverConf = ResourceBundle.getBundle("server");
    }

    public static String getString(String key) {
        return serverConf.getString(key);
    }

    public static int getInt(String key) {
        return Integer.parseInt(serverConf.getString(key));
    }
}
