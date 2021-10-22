package com.neutron.core.protocol;

import com.neutron.core.utils.BytesUtil;
import lombok.Getter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;

/**
 * 数据切片，代表的是一个帧
 */
@Getter
public class DataSlice {
    private static final byte[] startFlag = {0x12, 0x34, 0x45, 0x47};

    /**
     * 开始和结束标记，用来进行简单验证包是否接受正确
     */
    private final byte[] startTag;

    /**
     * total length 总长度
     */
    private final byte[] totalLen;

    /**
     * header长度 长度标志
     */
    private final byte[] headerLen;

    /**
     * header 体
     */
    private final byte[] header;

    /**
     * body 体
     */
    private final byte[] body;

    public DataSlice(byte[] header, byte[] body) {
        this.startTag = startFlag;
        this.header = header;
        this.headerLen = BytesUtil.int32ToByteArray(header.length);
        this.body = body;
        this.totalLen = BytesUtil.int32ToByteArray(header.length + (body == null ? 0 : body.length));
    }

    /**
     * 从 socket 中读取到一个完整的包
     *
     * @param channel socket channel 对象
     * @param byteBuffer 分配好的 byteBuffer
     * @return data Slice
     * @throws IOException 当 socket 读取失败时
     */
    public static DataSlice fromSocketChannel(SocketChannel channel, ByteBuffer byteBuffer) throws IOException {
        assert channel.isConnected() && channel.isOpen() && byteBuffer.capacity() > 0;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        int sz;       // 获取到的字节长度
        byte[] bytes; // 暂存
        // 循环读取数据，放入到 ByteArrayOutputStream
        while ((sz = channel.read(byteBuffer)) > 0) {
            byteBuffer.flip();
            bytes = new byte[sz];
            byteBuffer.get(bytes);
            baos.write(bytes);
            byteBuffer.clear();
        }

        var ds = fromByteArray(baos.toByteArray());
        baos.close();

        return ds;
    }


    /**
     * 解析 byte 数组
     * @param bytes byte 数组，包含了一次请求的数据
     * @return data slice 对象
     * @throws IOException 当数据处理出错时
     */
    public static DataSlice fromByteArray(byte[] bytes) throws IOException {
        if (bytes.length <= 8)
            throw new IOException("Data Slice is too short");

        int startIdx = 0;

        // part 1 - start tag
        byte[] startTag = new byte[4];
        System.arraycopy(bytes, startIdx, startTag, 0, 4);
        startIdx += 4;

        if (!checkStartTag(startTag)) {
            throw new IOException("Incomplete packet");
        }

        // part 2 - length tag
        byte[] totalLengthBytes = new byte[4];
        System.arraycopy(bytes, startIdx, totalLengthBytes, 0, 4);
        startIdx += 4;
        // calculate the length of header
        int totalLen = BytesUtil.byteArrayToInt32(totalLengthBytes);

        byte[] headerLengthTag = new byte[4];
        System.arraycopy(bytes, startIdx, headerLengthTag, 0, 4);
        startIdx += 4;
        // calculate the length of header
        int headerLen = BytesUtil.byteArrayToInt32(headerLengthTag);

        // part 3 - header tag
        byte[] headerBytes = new byte[headerLen];
        System.arraycopy(bytes, startIdx, headerBytes, 0, headerLen);
        startIdx += headerLen;

        // get the length of body
        int bodyLen = totalLen - headerLen;

        // part 4 - body tag
        byte[] body = null;
        if (bodyLen > 0) {
             body = new byte[bodyLen];
            System.arraycopy(bytes, startIdx, body, 0, bodyLen);
            startIdx += bodyLen;
        }

        // part - end tag
        byte[] endTag = new byte[4];
        System.arraycopy(bytes, startIdx, endTag, 0, 4);

        if (!checkStartTag(endTag)) {
            throw new IOException("Incomplete packet");
        }

        return new DataSlice(headerBytes, body);
    }

    private static boolean checkStartTag(byte[] receivedStartTag) {
        if (receivedStartTag == null || receivedStartTag.length != startFlag.length)
            return false;
        for (int i = 0; i < 4; ++i) {
            if (receivedStartTag[i] != startFlag[i]) {
                return false;
            }
        }
        return true;
    }

    public byte[] toByteArray() {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            // 写入 开始标志
            baos.write(startTag);
            // 写入 total 长度
            baos.write(totalLen);
            // 写入 header 长度
            baos.write(headerLen);
            // 写入 header 实体
            baos.write(header);

            // 写入 body 实体
            if (body != null)
                baos.write(body);

            // 写入 结束标志
            baos.write(startTag);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return baos.toByteArray();
    }

}
