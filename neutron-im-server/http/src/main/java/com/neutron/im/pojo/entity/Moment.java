package com.neutron.im.pojo.entity;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class Moment {
    private String id;
    private String title;
    private String author_id;
    private Date create_time;
    private Date update_time;
    /**
     * Distinguish various articles by their 'content_type'
     */
    private int content_type;
    private int is_original;
    private String content;
    private String copyright;
    private String version;
    private int status;
}
