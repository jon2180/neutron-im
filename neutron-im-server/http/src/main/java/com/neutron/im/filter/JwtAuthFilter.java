package com.neutron.im.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.neutron.im.config.SpringSecurityConfig;
import com.neutron.im.pojo.vo.ResultVO;
import com.neutron.im.util.TokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

public class JwtAuthFilter extends BasicAuthenticationFilter {
    private final ObjectMapper mapper = new ObjectMapper();

    public JwtAuthFilter(AuthenticationManager manager) {
        super(manager);
    }

    private boolean isInAllowedList(String url) {
        return Arrays.asList(SpringSecurityConfig.AUTH_WHITELIST).contains(url);
    }

    private boolean isStaticAssets(String url) {
        assert url != null;
        return url.matches(".+(.jpeg|.JPEG|.jpg|.JPG|.png|.PNG|.svg|.SVG)$");
    }

    private Cookie findCookie(HttpServletRequest req, String key) {
        Cookie[] cookies = req.getCookies();
        if (null == cookies) {
            return null;
        }
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(key)) {
                return cookie;
            }
        }
        return null;
    }

    private String getAuthToken(HttpServletRequest request) {
        // Step 2: check if token is existed
        String authToken = request.getHeader(TokenUtil.AUTHORIZATION);

        // if token is empty
        if (authToken == null || authToken.equals("")) {
            Cookie cookie = findCookie(request, TokenUtil.AUTHORIZATION);
            if (null != cookie) {
                authToken = cookie.getValue();
            }
        }
        return authToken;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain chain
    ) throws IOException, ServletException {
        // Step 1: skip url that is in allow list
        var url = request.getRequestURI();
        if (isInAllowedList(url)) {
            chain.doFilter(request, response);
            return;
        }
        if (isStaticAssets(url)) {
            chain.doFilter(request, response);
            return;
        }

        String authToken = getAuthToken(request);

        if (authToken == null || authToken.equals("")) {
            doResponse(response, 401, ResultVO.failed(40100, "Empty Token", null).setError("Unauthorized"));
            return;
        }

        // Step 3: validate token
        try {
            TokenUtil.JwtClaimsData tokenData = TokenUtil.validateTokenWithPrefix(authToken);
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                tokenData.getId(), null, new ArrayList<>()
            ));
            request.setAttribute("claims", tokenData);

            // 重新签发 jwt
            response.addCookie(new Cookie(
                TokenUtil.AUTHORIZATION,
                TokenUtil.generateTokenWithPrefix(tokenData)
            ) {{
                setMaxAge(TokenUtil.EXPIRATION_TIME_IN_SECOND);
                setPath("/");
            }});

            chain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            doResponse(
                response, 401,
                ResultVO.failed(40100, "Token已过期", null).setError("Unauthorized")
            );
            logger.error("Token已过期: {} " + e);
        } catch (UnsupportedJwtException e) {
            doResponse(response, 401,
                ResultVO.failed(40100, "Token格式错误", null).setError("Unauthorized")
            );
            logger.error("Token格式错误: {} " + e);
        } catch (MalformedJwtException e) {
            doResponse(response, 401,
                ResultVO.failed(40100, "Token没有被正确构造", null).setError("Unauthorized")
            );
            logger.error("Token没有被正确构造: {} " + e);
        } catch (SignatureException e) {
            doResponse(response, 401,
                ResultVO.failed(40100, "签名失败", null).setError("Unauthorized")
            );
            logger.error("签名失败: {} " + e);
        } catch (IllegalArgumentException e) {
            doResponse(response, 401,
                ResultVO.failed(40100, "Token非法参数异常", null).setError("Unauthorized")
            );
            logger.error("非法参数异常: " + e);
        } catch (Exception e) {
            doResponse(response, 401,
                ResultVO.failed(40100, "Invalid Token", null).setError("Unauthorized")
            );
            logger.error("Invalid Token " + e.getMessage());
        }
    }

    private void doResponse(HttpServletResponse response, int status, Object content) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setStatus(status);
        response.getWriter().write(
            mapper.writeValueAsString(content)
        );
    }
}
