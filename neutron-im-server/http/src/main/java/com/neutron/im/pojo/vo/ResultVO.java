package com.neutron.im.pojo.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.neutron.im.pojo.code.StatusCode;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Date;

@Data
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ResultVO {
    /**
     * 状态码，单位对等 100x  如果 10000 对等 http 标准状态码 100
     */
    private int status;
    private String message;
    private String error;
    private String path;
    private Object data;
    private String trace;
    private Date timestamp;

    public static ResultVO success(Object data) {
        return new ResultVO() {{
            setStatus(StatusCode.S200_OK.getCode());
            setMessage("OK");
            setData(data);
            setTimestamp(new Date());
        }};
    }

    @Deprecated
    public static ResultVO failed(int status, String message, Object data) {
        return new ResultVO() {{
            setStatus(status);
            setMessage(message);
            setData(data);
            setTimestamp(new Date());
        }};
    }

    public static ResultVO failed(StatusCode status, String message, Object data) {
        return new ResultVO() {{
            setStatus(status.getCode());
            setMessage(message);
            setData(data);
            setTimestamp(new Date());
        }};
    }

    public static ResultVO failed(StatusCode statusCode, String message) {
        return failed(statusCode, message, null);
    }
}
