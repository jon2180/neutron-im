package com.neutron.im.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;

import javax.crypto.SecretKey;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Calendar;
import java.util.Date;

/**
 * @author: xxm
 * @description:
 * @date: 2020/5/28 15:53
 */
//@Data
public class TokenUtil {
    /**
     * 过期时间---24 hour
     */
    public static final int EXPIRATION_TIME_IN_SECOND = 60 * 60 * 24;
    /**
     * Token 前缀
     */
    public static final String TOKEN_PREFIX = "Bearer ";
    /**
     * Http 请求的头部授权信息所在的键名
     */
    public static final String AUTHORIZATION = "Authorization";
    /**
     * 自己设定的秘钥
     */
    private static final String SECRET = "023bdc63c3c5a4587*9ee6581508b9d03ad39a74fc0c9a9cce604743367c9646b";
    private static final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    /**
     * jwt前面一般都会加Bearer
     *
     * @param data payload 数据
     * @return token 字符串，带前缀
     */
    public static String generateTokenWithPrefix(JwtClaimsData data) {
        return URLEncoder.encode(TOKEN_PREFIX + generateToken(data), StandardCharsets.UTF_8);
    }

    public static JwtClaimsData validateTokenWithPrefix(@NonNull String token) throws JwtException {
        String decodedToken = URLDecoder.decode(token, StandardCharsets.UTF_8).trim();
        if (!decodedToken.startsWith(TOKEN_PREFIX)) throw new JwtException("Invalid Token");
        return validateToken(decodedToken.substring(TOKEN_PREFIX.length()));
    }

    public static String generateToken(JwtClaimsData data) {
        Calendar calendar = Calendar.getInstance();
        Date now = calendar.getTime();         // 设置签发时间
        calendar.setTime(new Date()); // 设置过期时间
        calendar.add(Calendar.SECOND, EXPIRATION_TIME_IN_SECOND); // 添加秒钟
        Date expiration = calendar.getTime();
        return buildToken(now, expiration, data.toClaims());
    }

    /**
     * 解密Token
     * 2020/5/28 16:18
     *
     * @param token token 字符串，应该以 'Bearer ' 开头:
     * @return 解析出来的字符串
     * @throws JwtException Jwt 解析出错，可能是 jwt 不合法，jwt 过期 等原因
     */
    public static JwtClaimsData validateToken(String token) throws JwtException {
        return JwtClaimsData.dataFor(parseToken(token));
    }

    private static String buildToken(Date now, Date time, Claims claims) {
        return Jwts.builder()
            .setClaims(claims)             // 签发时间
            .setIssuedAt(now)             // 过期时间
            .setExpiration(time)
            .signWith(key)
            .compact();
    }

    private static Claims parseToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    @Slf4j
    @ToString
    public static class JwtClaimsData {
        private String id;

        public static JwtClaimsData dataFor(Claims map) {
            return new JwtClaimsData() {{
                setId((String) map.getOrDefault("id", "0"));
            }};
        }

        public Claims toClaims() {
            Claims claims = Jwts.claims();
            claims.put("id", id);
            return claims;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }
    }
}

//@Slf4j
//@ToString
//public static class JwtClaimsData {
//    private String id;
////        private String uid;
////        private String nickname;
////        private String email;
//
//    public static TokenUtil.JwtClaimsData dataFor(Claims map) {
//        return new TokenUtil.JwtClaimsData() {{
//            setId((String) map.getOrDefault("id", "0"));
////                setUid((String) map.getOrDefault("uid", ""));
////                setEmail((String) map.getOrDefault("email", ""));
////                setNickname((String) map.getOrDefault("nickname", ""));
//        }};
//    }
//
//    public Claims toClaims() {
//        Claims claims = Jwts.claims();
//        claims.put("id", id);
////            claims.put("uid", uid);
////            claims.put("nickname", nickname);
////            claims.put("email", email);
//        return claims;
//    }
//
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
////        public String getUid() {
////            return uid;
////        }
////
////        public void setUid(String uid) {
////            this.uid = uid;
////        }
////
////        public String getNickname() {
////            return nickname;
////        }
////
////        public void setNickname(String nickname) {
////            this.nickname = nickname;
////        }
////
////        public String getEmail() {
////            return email;
////        }
////
////        public void setEmail(String email) {
////            this.email = email;
////        }
//}

//    public static final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

//    @Value("${jwt.secret}")
//    public String secretKeyStr;

//    public static final SecretKey key = generateKey();
//    private static SecretKey generateKey() {
//        byte[] encodedKey = Base64.decodeBase64(SECRET);
//        return new SecretKeySpec(encodedKey, 0, encodedKey.length, SignatureAlgorithm.HS256);
//    }
