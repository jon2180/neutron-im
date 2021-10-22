package com.neutron.im.pojo.entity;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.Date;

@Data
@Accessors(chain = true)
@ToString
public class Request {
    private String id;
    private String initiator_id;
    private String target_id;
    private int type;
    private String submit_reason;
    private Date submit_time;
    private int solved_result;
    private String solved_reason;
    private Date solved_time;
    private String extra;
}
