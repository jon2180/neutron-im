package com.neutron.core.utils;

import java.text.SimpleDateFormat;

public class FormatTools {
    /**
     * 格式化时间戳
     *
     * @param timestamp 时间戳 十三位
     * @return 格式化后的时间戳
     */
    public static String formatTimestamp(long timestamp) {
        return new SimpleDateFormat("MM/dd HH:mm").format(timestamp);
    }
}
