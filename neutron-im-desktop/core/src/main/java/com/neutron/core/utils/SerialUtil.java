package com.neutron.core.utils;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

public class SerialUtil {

    /**
     * str编码成字节缓冲
     *
     * @param str 消息
     * @return ByteBuffer 对象
     */
    public static ByteBuffer encode(String str) {
        return StandardCharsets.UTF_8.encode(str);
    }


    public static Object bytesToDataWrapper(ByteArrayOutputStream os) throws IOException, ClassNotFoundException {
        ByteArrayInputStream is = new ByteArrayInputStream(os.toByteArray());
        ObjectInputStream oi = new ObjectInputStream(is);
        Object obj = oi.readObject();
        oi.close();
        return obj;
    }

    /**
     * 对象序列化，转为 ByteBuffer
     *
     * @param obj 可序列化对象
     * @return 对象序列化后的ByteBuffer对象
     * @throws IOException 写入对象错误时抛出
     */
    public static <T extends Serializable> ByteBuffer objectToByteBuffer(T obj) throws IOException {
        // try {
        ByteArrayOutputStream bout = new ByteArrayOutputStream();
        ObjectOutputStream out = new ObjectOutputStream(bout);
        out.writeObject(obj);
        out.flush();
        byte[] bytes = bout.toByteArray();
        bout.close();
        out.close();
        // ————————————————
        // 版权声明：本文为CSDN博主「eclipser1987」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
        // 原文链接：https://blog.csdn.net/eclipser1987/article/details/5350007
        return ByteBuffer.wrap(bytes);
    }

    /**
     * ByteBuffer 还原为 Object
     *
     * @param buffer 代反序列化的ByteBuffer对象
     * @return 对象
     * @throws IOException            ...
     * @throws ClassNotFoundException 读Object错误时抛出
     */
    public static Object byteBufferToObject(ByteBuffer buffer) throws IOException, ClassNotFoundException {
        InputStream input = new ByteArrayInputStream(buffer.array());
        ObjectInputStream oi = new ObjectInputStream(input);
        Object obj = oi.readObject();
        input.close();
        oi.close();
        buffer.clear();
        return obj;
        // ————————————————
        // 版权声明：本文为CSDN博主「eclipser1987」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
        // 原文链接：https://blog.csdn.net/eclipser1987/article/details/5350007
    }
}
