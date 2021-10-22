package com.neutron.core.api;

import org.junit.Ignore;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class ProtobufTest {

    @Test
//    @Ignore
    public void testSerialize() {
        UserInfoProto.UserInfo.Builder builder = UserInfoProto.UserInfo.newBuilder();
        builder.setEmail("example@example.com").setId(1).build();
        UserInfoProto.UserInfo user = builder.build();
        System.out.println(user.getId());
        assertEquals(user.getId(), 1);
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        try {
            user.writeTo(os);

            byte[] b = os.toByteArray();

            UserInfoProto.UserInfo u = UserInfoProto.UserInfo.parseFrom(b);

            assertNotNull(u);
            assertEquals(u.getEmail(), user.getEmail());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Test
    public void testDeserialize() {

    }
}
