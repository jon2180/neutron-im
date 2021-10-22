package com.neutron.core.utils;

public class BytesUtil {
    private static final char[] HEX_CHAR = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};

    /**
     * 将十六进制字符串转换字节数组
     *
     * @param str
     * @return
     */
    public static byte[] hexStringToBytes(String str) {
        if (str == null || str.trim().equals("")) {
            return new byte[0];
        }

        byte[] bytes = new byte[str.length() / 2];
        for (int i = 0; i < str.length() / 2; i++) {
            String subStr = str.substring(i * 2, i * 2 + 2);
            bytes[i] = (byte) Integer.parseInt(subStr, 16);
        }

        return bytes;
    }


    /**
     * 将字节数字转换为16进制字符串
     *
     * @param bytes
     * @return
     */
    public static String bytesToHexString(byte[] bytes) {
        char[] buf = new char[bytes.length * 2];
        int index = 0;
        for (byte b : bytes) { // 利用位运算进行转换，可以看作方法一的变种
            buf[index++] = HEX_CHAR[b >>> 4 & 0xf];
            buf[index++] = HEX_CHAR[b & 0xf];
        }
        return new String(buf);
    }

    /**
     * @param bytes  字节数组
     * @param offset 偏移位，起始为 0
     * @param length 读取长度
     * @return 读取出的字节数组
     */
    public static byte[] read(byte[] bytes, int offset, int length) {
        // 判断参数是否合法
        if (bytes == null)
            return new byte[0];
        if (offset < 0 || offset >= bytes.length)
            return new byte[0];
        if (length <= 0)
            return new byte[0];

        int realLen = Math.min(length, bytes.length - offset);
        byte[] rst = new byte[length];
        System.arraycopy(bytes, offset, rst, 0, realLen);
        return rst;
    }

    /**
     * 将字节数字转换为16进制字符串
     *
     * @param bytes
     * @return
     */
    public static String bytesToHexStringWithSpace(byte[] bytes) {
        char[] buf = new char[bytes.length * 2];
        int index = 0;
        for (byte b : bytes) { // 利用位运算进行转换，可以看作方法一的变种
            buf[index++] = HEX_CHAR[b >>> 4 & 0xf];
            buf[index++] = HEX_CHAR[b & 0xf];
        }
        StringBuilder s = new StringBuilder();
        for (int i = 0; i < buf.length; i += 2) {
            s.append(buf[i]);
            s.append(buf[i + 1]);
            s.append(" ");
        }
        return s.toString();
    }


//    private static int BytesToInt32(byte[] bs)
//    {
//        if (bs == null || bs.Length != 4)
//        {
//            throw new EncryptionException(ErrorCode.defaultCode, "传入数组长度不为4");
//        }
//        //获取最高八位
//        int num1 = 0;
//        num1 = (int)(Convert.ToInt32(num1) ^ (int)bs[0]);
//        num1 = num1 << 24;
//        //获取第二高八位
//        int num2 = 0;
//        num2 = (int)(Convert.ToInt32(num2) ^ (int)bs[1]);
//        num2 = num2 << 16;
//        //获取第二低八位
//        int num3 = 0;
//        num3 = (int)(Convert.ToInt32(num3) ^ (int)bs[2]);
//        num3 = num3 << 8;
//        //获取低八位
//        int num4 = 0;
//        num4 = (int)(Convert.ToInt32(num4) ^ (int)bs[3]);
//        return num1 ^ num2 ^ num3 ^ num4;
//    }


    public static byte[] int32ToByteArray(int v) {
        byte[] bytes = new byte[4];
        byte a = (byte) (v >> 24);
        byte b = (byte) ((/* 抹掉其他位，只余下需要的两位 */ v & 0xff0000) /* 右移指定位数，取得数据 */ >> 16);
        byte c = (byte) ((v & 0xff00) >> 8);
        byte d = (byte) (v & 0xff);
        bytes[0] = a;
        bytes[1] = b;
        bytes[2] = c;
        bytes[3] = d;
        return bytes;
    }

    public static int byteArrayToInt32(byte[] bytes) {
        assert bytes.length == 4;
        return ((bytes[0] << 24) | (bytes[1] >> 16) | (bytes[2] >> 8) | bytes[3]);
    }

}
