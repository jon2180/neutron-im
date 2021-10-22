package com.neutron.core.protocol;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.IOException;

class DataSliceTest {

    @Test
    void testEncodeAndDecode() throws IOException {
        var dp = new DataPacket();
        var url = "iqq://test.com/fff";
        var from = "iqq://fff";
        var to = "ff";
        dp.setUrl(url);
        dp.setFrom(from);
        dp.setTo(to);

        var ds = dp.toDataSlice();

        var dsAfter = DataSlice.fromByteArray(ds.toByteArray());
        Assertions.assertArrayEquals(ds.getTotalLen(), dsAfter.getTotalLen());
        Assertions.assertArrayEquals(ds.getHeaderLen(), dsAfter.getHeaderLen());
        Assertions.assertArrayEquals(ds.getHeader(), dsAfter.getHeader());
        Assertions.assertArrayEquals(ds.getBody(), dsAfter.getBody());

        var dpAfter = DataPacket.fromDataSlice(dsAfter, DataSliceTest.class);

        Assertions.assertEquals(dp.getUrl(), dpAfter.getUrl());
        Assertions.assertEquals(dp.getFrom(), dpAfter.getFrom());
        Assertions.assertEquals(dp.getTo(), dpAfter.getTo());
    }
}
