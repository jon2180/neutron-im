package com.neutron.im.config;

import com.neutron.im.filter.JwtAuthFilter;
import com.neutron.im.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * SpringSecurity 的配置
 *
 * @since 2020/5/28 15:14
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
    /**
     * 需要放行的URL
     * other public endpoints of your API may be appended to this array
     */
    public static final String[] AUTH_WHITELIST = {"/login", "/register", "/", "/captcha-pic", "/captcha-email"};

    private final AccountService accountService;
    private final PasswordEncoder encoder;

    @Autowired
    public SpringSecurityConfig(AccountService service, PasswordEncoder passwordEncoder) {
        accountService = service;
        encoder = passwordEncoder;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        var conf = new CorsConfiguration();
        conf.setAllowCredentials(true);
        conf.setAllowedHeaders(Arrays.asList("Authorization", "X-Requested-With", "Connection", "Upgrade", "Content-Type"));
        conf.setMaxAge(60 * 60 * 24L);
        conf.setAllowedOriginPatterns(Arrays.asList("http://localhost:[*]", "http://im.com:[*]"));
        conf.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", conf);
        return source;
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(accountService).passwordEncoder(encoder);
    }

    /**
     * 配置请求拦截
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors()
            .and().csrf().disable()  //由于使用的是JWT，我们这里不需要csrf
            //基于token，所以不需要session
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
            .and()
            .authorizeRequests()
            //可以匿名访问的链接
            .antMatchers(AUTH_WHITELIST).permitAll()
            .antMatchers(new String[]{
                "/**/*.png", "/**/*.jpg", "/**/*.JPG", "/**/*.PNG", "/**/*.svg", "/**/*.SVG", "/**/*.jpeg", "/**/*.JPEG"
            }).permitAll()
            //其他所有请求需要身份认证
            .anyRequest().authenticated()
            .and()
            .addFilter(new JwtAuthFilter(authenticationManager()));
    }
}
