package com.neutron.core.protocol;

import com.google.protobuf.InvalidProtocolBufferException;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.neutron.core.api.MessageHeaderProto;

@Data
@NoArgsConstructor
public class DataPacket {
    private String version;
    private int contentLength;
    private long serialId;
    private byte[] body;
    private String url = "";
    private String from = "";
    private String to = "";
    private String token = "";
    private long time = System.currentTimeMillis();
    private int statusCode = 2000;

    // TODO 默认值应该为一个特定的 proto
    MessageHeaderProto.MessageHeader.ContentType contentType = MessageHeaderProto.MessageHeader.ContentType.ADD_FRIEND;

    public DataSlice toDataSlice() {
        return new DataSlice(
            MessageHeaderProto.MessageHeader.newBuilder()
                .setContentType(contentType)
                .setTime(time)
                .setToken(token)
                .setUrl(url)
                .setFrom(from)
                .setTo(to)
                .build()
                .toByteArray(),
            body
        );
    }

    public static DataPacket fromDataSlice(DataSlice ds, Class<?> clz) throws InvalidProtocolBufferException {
        // deserialize the header
        MessageHeaderProto.MessageHeader header = MessageHeaderProto.MessageHeader.parseFrom(ds.getHeader());

        var dp = new DataPacket();

        dp.contentType = header.getContentType();
        dp.url = header.getUrl();
        dp.token = header.getToken();
        dp.from = header.getFrom();
        dp.to = header.getTo();
        dp.time = header.getTime();
        dp.statusCode = header.getStatusCode();

        dp.body = ds.getBody();

        return dp;
    }
}
