package com.hyecheon.web.security

import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.domain.entity.user.User
import com.hyecheon.web.config.AppProperty
import com.hyecheon.web.service.UserService
import io.jsonwebtoken.*
import lombok.extern.slf4j.Slf4j
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.util.*


/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */

@Component
class JwtTokenProvider(private val appProperty: AppProperty) {

	private val log = LoggerFactory.getLogger(this::class.java)

	// jwt 토큰 생성
	fun generateToken(user: User): String {
		val now = Date()
		val expiryDate = Date(now.time + (appProperty.jwt.maxAge * 1000))
		return Jwts.builder()
			.setSubject(user.username) // 사용자
			.setIssuedAt(Date()) // 현재 시간 기반으로 생성
			.setExpiration(expiryDate) // 만료 시간 세팅
			.addClaims(mapOf("userId" to user.id, "role" to user.roles.map { it.role }))
			.signWith(SignatureAlgorithm.HS512, appProperty.jwt.secret) // 사용할 암호화 알고리즘, signature에 들어갈 secret 값 세팅
			.compact()
	}

	// Jwt 토큰에서 아이디 추출
	fun getUsernameFromJWT(token: String): AuthToken {
		val claims = Jwts.parser()
			.setSigningKey(appProperty.jwt.secret)
			.parseClaimsJws(token)
			.body
		val role = if (claims["role"] is List<*>) {
			claims["role"] as List<String>
		} else {
			null
		}
		return AuthToken(claims["userId"]?.toString()?.toLong(), claims.subject, role)
	}


	// Jwt 토큰 유효성 검사
	fun validateToken(token: String): Boolean {
		try {
			Jwts.parser().setSigningKey(appProperty.jwt.secret).parseClaimsJws(token)
			return true
		} catch (ex: SignatureException) {
			log.error("Invalid JWT signature")
		} catch (ex: MalformedJwtException) {
			log.error("Invalid JWT token")
		} catch (ex: ExpiredJwtException) {
			log.error("Expired JWT token")
		} catch (ex: UnsupportedJwtException) {
			log.error("Unsupported JWT token")
		} catch (ex: IllegalArgumentException) {
			log.error("JWT claims string is empty.")
		}
		return false
	}
}