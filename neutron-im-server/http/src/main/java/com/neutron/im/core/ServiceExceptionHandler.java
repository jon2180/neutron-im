package com.neutron.im.core;

import com.neutron.im.pojo.exception.AuthFailedException;
import com.neutron.im.pojo.exception.DisabledAccountException;
import com.neutron.im.pojo.exception.NoSuchAccountException;
import com.neutron.im.pojo.code.StatusCode;
import com.neutron.im.pojo.vo.ResultVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RestControllerAdvice
public class ServiceExceptionHandler {
    /**
     * 处理token异常
     */
    @ExceptionHandler({Exception.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResultVO handleException(Exception e) {
        e.printStackTrace();
        return ResultVO.failed(StatusCode.S500_LOGIC_ERROR, e.getMessage());
    }

    @ExceptionHandler({RuntimeException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResultVO handleNormalException(RuntimeException e) {
        e.printStackTrace();
        return ResultVO.failed(StatusCode.S400_BAD_REQUEST, "Something went wrong");
    }

    @ExceptionHandler({ServletException.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResultVO handleServletException(RuntimeException e) {
        e.printStackTrace();
        return ResultVO.failed(StatusCode.S500_LOGIC_ERROR, "Internal Server Error");
    }

    @ExceptionHandler({HttpRequestMethodNotSupportedException.class})
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ResultVO handleMethodNotAllowedException(HttpRequestMethodNotSupportedException e, HttpServletResponse resp) {
        String[] stringSet = e.getSupportedMethods();
        if (stringSet != null) {
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < stringSet.length; ++i) {
                if (i > 0) builder.append(",");
                builder.append(stringSet[i]);
            }
            resp.addHeader("Allow", builder.toString());
        }
        return ResultVO.failed(StatusCode.S405_METHOD_NOT_ALLOWED, "Method Not Allowed");
    }

    @ExceptionHandler({IllegalArgumentException.class, AuthFailedException.class,
        DisabledAccountException.class, NoSuchAccountException.class,
        MissingServletRequestParameterException.class, MissingServletRequestPartException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ResultVO handle400Exception(RuntimeException e) {
        e.printStackTrace();
        return ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, e.getMessage());
    }
}
