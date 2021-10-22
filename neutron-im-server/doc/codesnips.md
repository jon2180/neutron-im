```java
//            String origin = request.getHeader("origin");
//            String allowOrigin = "http://localhost:3000";
//            response.setHeader("Access-Control-Allow-Origin", !StringUtil.isEmpty(origin) ? origin : allowOrigin);
//            response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//            response.setHeader("Access-Control-Max-Age", "3600");
//            response.setHeader("Access-Control-Allow-Credentials", "true");
//            response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Connection, Upgrade");
//            String referer = request.getHeader("Referer");
//            String host = request.getHeader("Host");
//            String userAgent = request.getHeader("User-Agent");

        //            logger.info("protocol: " + request.getProtocol());

        //            || StringUtil.isEmpty(referer)
//            if (StringUtil.isEmpty(host) || StringUtil.isEmpty(userAgent)) {
//                doResponse(
//                    response,
//                    403,
//                    ResultVO.failed(40300, "浏览器核验失败", null)
//                );
//                return;
//            }

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            doResponse(
                response,
                200,
                null
            );
            return;
        }
```


```java

//        String allowOrigin = "http://localhost:3000";
//        response.setHeader("Access-Control-Allow-Origin", !StringUtil.isEmpty(origin) ? origin : allowOrigin);
//        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//        response.setHeader("Access-Control-Max-Age", "3600");
//        response.setHeader("Access-Control-Allow-Credentials", "true");
//        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Connection, Upgrade");
```


```java
package com.neutron.im.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Configuration
//@EnableWebMvc
public class CorsConfig {
//     implements WebMvcConfigurer
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**").allowedOrigins("*");
//    }

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
////addMapping 跨域所能访问的路径
////allowedOrigins：那些域可以访问，默认为任何域都可以访问
//                registry.addMapping("/**").allowedOrigins("*");
//            }
//        };
//    }
}

```
