package com.hyecheon.domain.entity.user

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import java.util.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/28
 */
data class AuthToken(
	val userId: Long?,
	val username: String?,
	val role: List<String>?,
) {
	companion object {
		fun loggedToken() = run {
			Optional.ofNullable(SecurityContextHolder.getContext())
				.map { obj: SecurityContext -> obj.authentication }
				.flatMap { authentication ->
					val principal = authentication.principal
					if (principal is AuthToken) Optional.of(principal)
					else Optional.empty()
				} ?: Optional.empty()
		}

		fun getLoggedToken() = run {
			val optional = Optional.ofNullable(SecurityContextHolder.getContext())
				.map { obj: SecurityContext -> obj.authentication }
				.flatMap { authentication ->
					val principal = authentication.principal
					if (principal is AuthToken) Optional.of(principal)
					else Optional.empty()
				} ?: Optional.empty()

			if (optional.isEmpty) throw RuntimeException("로그인 토큰이 없습니다.")
			optional.get()
		}
	}

	fun createToken() = run {
		val roles = role?.map { SimpleGrantedAuthority("ROLE_${it}") } ?: emptyList()
		UsernamePasswordAuthenticationToken(this, null, roles)
	}
}