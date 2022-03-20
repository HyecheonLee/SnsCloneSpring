package com.hyecheon.web.service

import com.hyecheon.domain.entity.user.Authorization
import com.hyecheon.domain.entity.user.AuthorizationRepository
import com.hyecheon.domain.entity.user.User
import com.hyecheon.domain.entity.user.UserRepository
import com.hyecheon.web.exception.IdNotExistsException
import com.hyecheon.web.exception.PasswordInvalidException
import com.hyecheon.web.security.JwtTokenProvider
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
@Transactional(readOnly = true)
@Service
class UserService(
	private val userRepository: UserRepository,
	private val authorizationRepository: AuthorizationRepository,
	private val passwordEncoder: PasswordEncoder,
	private val jwtTokenProvider: JwtTokenProvider,
) {

	@Transactional
	fun join(user: User) = run {
		val authorization =
			authorizationRepository.findByRole("USER")
				?: authorizationRepository.save(Authorization("USER"))

		val newUser = user.apply {
			password = passwordEncoder.encode(password)
			profilePic = "/images/profilePic.jpeg"
			addRole(authorization)
		}
		userRepository.save(newUser)

	}

	fun findByUsername(username: String) = run {
		userRepository.findByUsername(username).orElseThrow { UsernameNotFoundException(username) }
			?: throw UsernameNotFoundException(username)
	}

	fun generateToken(username: String, password: String) = run {
		val user = userRepository.findByUsername(username).orElseThrow { UsernameNotFoundException(username) }
		if (!passwordEncoder.matches(password, user.password)) {
			throw PasswordInvalidException("$username 의 비밀번호가 틀립니다.")
		}
		jwtTokenProvider.generateToken(user)
	}

	fun findById(id: Long) {
		userRepository.findById(id).orElseThrow { IdNotExistsException("사용자 id[${id}] 가 존재하지 않습니다.") }
	}

	fun searchByKeyword(keyword: String, lastId: Long): List<User> {
		return userRepository.findTop10ByUsernameContainsAndIdIsLessThanOrderByIdDesc(keyword, lastId)
	}
}