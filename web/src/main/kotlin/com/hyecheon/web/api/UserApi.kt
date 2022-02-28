package com.hyecheon.web.api

import com.hyecheon.web.api.Constant.USER_API
import com.hyecheon.web.config.AppProperty
import com.hyecheon.web.dto.user.UserReqDto
import com.hyecheon.web.dto.user.UserRespDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.UserService
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


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

	@PostMapping("/join")
	fun join(@RequestBody user: UserReqDto.Join) = run {
		val savedUser = userService.join(user.toEntity())
		ResponseEntity.ok(
			ResponseDto(data = UserRespDto.Model.of(savedUser))
		)
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
}