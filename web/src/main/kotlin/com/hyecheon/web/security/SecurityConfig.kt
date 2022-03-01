package com.hyecheon.web.security

import com.hyecheon.web.api.Constant.API_V1
import com.hyecheon.web.api.Constant.USER_API
import com.hyecheon.web.config.AppProperty
import com.hyecheon.web.service.UserService
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource


/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */

@Configuration
@EnableWebSecurity
class SecurityConfig(
	private val appProperty: AppProperty,
	private val jwtAuthenticationEntryPoint: JwtAuthenticationEntryPoint,
) : WebSecurityConfigurerAdapter() {
	private val log = LoggerFactory.getLogger(this::class.java)

	override fun configure(http: HttpSecurity) {
		http
			.cors()
			.and()
			.csrf()
			.disable()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeRequests()
			.antMatchers("$USER_API/join", "${USER_API}/login")
			.permitAll()
			.antMatchers("$API_V1/**").hasRole("USER")
			.and()
			.exceptionHandling()
			.authenticationEntryPoint(jwtAuthenticationEntryPoint)
			.and()
			.formLogin().disable().headers().frameOptions().disable()


		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter::class.java)
	}

	@Bean
	fun corsConfigurationSource() = run {
		val configuration = CorsConfiguration().apply {
			log.info("server hosts ${appProperty.server.hosts}")

			allowedOrigins = appProperty.server.hosts
			addAllowedOrigin("http://localhost:3000")

			allowedMethods = arrayListOf("HEAD", "GET", "POST", "PUT", "DELETE")
			addAllowedHeader("*")
			allowCredentials = true
			maxAge = 3600L
		}
		UrlBasedCorsConfigurationSource().apply {
			registerCorsConfiguration("/**", configuration)
		}
	}

	//비밀번호 암호화를 위한 Encoder 설정
	@Bean
	fun passwordEncoder(): BCryptPasswordEncoder? {
		return BCryptPasswordEncoder()
	}

	@Bean
	fun jwtAuthenticationFilter(
		jwtTokenProvider: JwtTokenProvider? = null,
	) = run {
		JwtAuthenticationFilter(jwtTokenProvider!!)
	}
}