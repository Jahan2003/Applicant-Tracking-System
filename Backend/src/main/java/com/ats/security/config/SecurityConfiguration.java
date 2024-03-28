package com.ats.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.ats.security.entity.Permission;
import com.ats.security.entity.Role;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    // 3.
    private final JwtAuthenticationFilter jwtAuthFilter;
    // 4.
    private final AuthenticationProvider authenticationProvider;
  

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
        .cors().configurationSource(corsConfigurationSource())
        .and()
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/v1/auth/**")
                .permitAll()
                
                .requestMatchers("/api/v1/users/**").hasAnyRole(Role.ADMIN.name(), Role.USER.name())


                .requestMatchers(HttpMethod.GET, "/api/v1/users/**").hasAnyAuthority(Permission.ADMIN_READ.name(), Permission.USER_READ.name())
                .requestMatchers(HttpMethod.POST, "/api/v1/users/**").hasAnyAuthority(Permission.ADMIN_CREATE.name(), Permission.USER_CREATE.name())
                .requestMatchers(HttpMethod.PUT, "/api/v1/users/**").hasAnyAuthority(Permission.ADMIN_UPDATE.name(), Permission.USER_UPDATE.name())
                .requestMatchers(HttpMethod.DELETE, "/api/v1/users/**").hasAnyAuthority(Permission.ADMIN_DELETE.name(), Permission.USER_DELETE.name())
                
                .requestMatchers("/api/v1/hrusers/**").hasRole(Role.ADMIN.name())
                
                .requestMatchers(HttpMethod.GET, "/api/v1/hrusers/**").hasAnyAuthority(Permission.ADMIN_READ.name())
                .requestMatchers(HttpMethod.POST, "/api/v1/hrusers/**").hasAnyAuthority(Permission.ADMIN_CREATE.name())
                .requestMatchers(HttpMethod.PUT, "/api/v1/hrusers/**").hasAnyAuthority(Permission.ADMIN_UPDATE.name())
                .requestMatchers(HttpMethod.DELETE, "/api/v1/hrusers/**").hasAnyAuthority(Permission.ADMIN_DELETE.name())
                .anyRequest()
                .authenticated()	
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider) // 1. Here we need to tell spring which authentication
                                                                // provider we are going to use
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // 2. Adding a
                                                                                             // jwtAuthFilter
                                                                                             // before
                                                                                             // UsernamePasswordAuthenticationFilter
        return httpSecurity.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedOrigin("*");
        configuration.addExposedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    @Bean 
    public CorsFilter corsfilter() {
    	return new CorsFilter(corsConfigurationSource());
    }
}
