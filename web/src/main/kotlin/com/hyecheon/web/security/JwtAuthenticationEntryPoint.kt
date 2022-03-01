package com.hyecheon.web.security

import org.slf4j.LoggerFactory
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
@Component
class JwtAuthenticationEntryPoint : AuthenticationEntryPoint {
	private val log = LoggerFactory.getLogger(this::class.java)
	override fun commence(
		request: HttpServletRequest,
		response: HttpServletResponse,
		e: AuthenticationException,
	) {

		log.error("Responding with unauthorized error. Message - {}", e.message)
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.message)
	}
}