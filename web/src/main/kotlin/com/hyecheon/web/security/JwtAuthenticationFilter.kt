package com.hyecheon.web.security

import com.hyecheon.web.service.UserService
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.util.StringUtils
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */

class JwtAuthenticationFilter(
	private val jwtTokenProvider: JwtTokenProvider,
	private val userService: UserService,
) : OncePerRequestFilter() {
	override fun doFilterInternal(
		request: HttpServletRequest,
		response: HttpServletResponse,
		filterChain: FilterChain,
	) {
		try {
			val jwt: String? = getJwtFromRequest(request) //request에서 jwt 토큰을 꺼낸다.
			if (!jwt.isNullOrBlank() && jwtTokenProvider.validateToken(jwt)) {
				val username = jwtTokenProvider.getUsernameFromJWT(jwt) //jwt에서 사용자 id를 꺼낸다.
				val user = userService.findByUsername(username)
				val authentication = UsernamePasswordAuthenticationToken(user, null, user.roles)
				authentication.details = WebAuthenticationDetailsSource().buildDetails(request) //기본적으로 제공한 details 세팅
				SecurityContextHolder.getContext().authentication =
					UsernamePasswordAuthenticationToken(user, null, user.roles)
			} else {
				if (jwt.isNullOrBlank()) {
					request.setAttribute("unauthorization", "401 인증키 없음.")
				}
				if (!jwt.isNullOrBlank() && jwtTokenProvider.validateToken(jwt)) {
					request.setAttribute("unauthorization", "401-001 인증키 만료.")
				}
			}
		} catch (ex: Exception) {
			logger.error("Could not set user authentication in security context", ex)
		}
		filterChain.doFilter(request, response)
	}

	private fun getJwtFromRequest(request: HttpServletRequest): String? {
		val authToken = getCookie(request, "authToken")
		if (StringUtils.hasText(authToken)) return authToken
		val bearerToken = request.getHeader("Authorization")
		return if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			bearerToken.substring("Bearer ".length)
		} else null
	}

	fun getCookie(request: HttpServletRequest, name: String): String? {
		val cookies = request.cookies
		if (null != cookies) {
			for (cookie in cookies) {
				if (cookie.name.equals(name)) {
					return cookie.value
				}
			}
		}
		return null
	}
}