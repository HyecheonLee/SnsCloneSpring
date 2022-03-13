package com.hyecheon.web.api

import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.web.api.Constant.USER_API
import com.hyecheon.web.config.AppProperty
import com.hyecheon.web.dto.user.UserReqDto
import com.hyecheon.web.dto.user.UserRespDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.UserService
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI
import javax.security.auth.login.LoginException


/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
@RestController
@RequestMapping(USER_API)
class UserApi(
	private val userService: UserService,
	private val appProperty: AppProperty,
) {

	@GetMapping("/me")
	fun me() = run {
		val token = AuthToken.loggedToken()
		if (!token.isPresent) throw LoginException("로그인을 해주세요.")
		val username = token.get().username ?: throw LoginException("로그인을 해주세요.")
		val loggedUser = userService.findByUsername(username)
		ResponseEntity.ok(
			ResponseDto(data = UserRespDto.of(loggedUser))
		)
	}

	@DeleteMapping("/me")
	fun deleteMe() = run {
		val responseCookie = ResponseCookie.from("authToken", "")
			.httpOnly(true)
			.secure(true)
			.path("/")
			.maxAge(0)
			.domain(appProperty.server.domain)
			.build()
		ResponseEntity.noContent()
			.header(HttpHeaders.SET_COOKIE, responseCookie.toString())
			.build<Any>()
	}

//	@GetMapping("/{id}")
//	fun findById(@PathVariable id: Long) = run {
//		userService.findById(id)
//	}

	@PostMapping("/join")
	fun join(@RequestBody user: UserReqDto.Join) = run {
		val userId = userService.join(user.toEntity())
		ResponseEntity.created(URI.create("/${USER_API}/me"))
	}

	@PostMapping("/login")
	fun login(@RequestBody user: UserReqDto.Login) = run {
		val authToken = userService.generateToken(user.username ?: "", user.password ?: "")
		val responseCookie = ResponseCookie.from("authToken", authToken)
			.httpOnly(true)
			.secure(true)
			.path("/")
			.maxAge(appProperty.jwt.maxAge)
			.domain(appProperty.server.domain)
			.build()
		ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, responseCookie.toString())
			.body(ResponseDto(data = mapOf("authToken" to authToken)))
	}

	@GetMapping("/{username}")
	fun getByUsername(@PathVariable username: String) = run {
		val user = userService.findByUsername(username)
		ResponseDto(data = UserRespDto.of(user))
	}
}