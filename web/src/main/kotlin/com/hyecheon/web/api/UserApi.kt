package com.hyecheon.web.api

import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.web.api.Constant.USER_API
import com.hyecheon.web.config.AppProperty
import com.hyecheon.web.dto.user.UserReqDto
import com.hyecheon.web.dto.user.UserRespDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.FollowService
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
	private val followService: FollowService,
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
			.secure(appProperty.server.scheme == "https")
			.path("/")
			.maxAge(0)
			.domain(appProperty.server.domain)
			.build()
		ResponseEntity.noContent()
			.header(HttpHeaders.SET_COOKIE, responseCookie.toString())
			.build<Any>()
	}

	@PostMapping("/join")
	fun join(@RequestBody user: UserReqDto.Join) = run {
		ResponseEntity.created(URI.create("/${USER_API}/me"))
	}

	@PostMapping("/login")
	fun login(@RequestBody user: UserReqDto.Login) = run {
		val authToken = userService.generateToken(user.username ?: "", user.password ?: "")
		val responseCookie = ResponseCookie.from("authToken", authToken)
			.httpOnly(true)
			.secure(appProperty.server.scheme == "https")
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
		val followInfo = followService.getFollowInfo(user)
		ResponseDto(data = UserRespDto.of(user, followInfo))
	}

	@GetMapping("/{username}/following")
	fun following(@PathVariable username: String, @RequestParam(required = false) lastId: Long? = null) = run {
		val follow = if (lastId == null || lastId <= 0) followService.followingByUsername(username)
		else followService.followingByUsername(username, lastId)
		val data = follow.map { following ->
			//쿼리가 10개씩 나간다... 나중에 최적화 필요할듯?
			val followInfo = followService.getFollowInfo(following.toUser)
			UserRespDto.of(following.toUser, followInfo)
		}
		ResponseDto(data = data)
	}

	@GetMapping("/{username}/follower")
	fun follower(@PathVariable username: String, @RequestParam(required = false) lastId: Long? = null) = run {
		val follow = if (lastId == null || lastId <= 0) followService.followerByUsername(username)
		else followService.followerByUsername(username, lastId)
		val data = follow.map { following ->
			//쿼리가 10개씩 나간다... 나중에 최적화 필요할듯?
			val followInfo = followService.getFollowInfo(following.toUser)
			UserRespDto.of(following.toUser, followInfo)
		}
		ResponseDto(data = data)
	}

	@PostMapping("/{id}/following")
	fun following(@PathVariable id: Long) = run {
		followService.following(id)
		ResponseDto(data = "success")
	}

	@DeleteMapping("/{id}/unFollowing")
	fun unFollowing(@PathVariable id: Long) = run {
		followService.unFollowing(id)
		ResponseDto(data = "success")
	}

	@GetMapping("/search")
	fun searchUser(@RequestParam keyword: String, @RequestParam(required = false) lastId: Long = Long.MAX_VALUE) = run {
		val users = userService.searchByKeyword(keyword, lastId)
		val data = users.map {
			val followInfo = followService.getFollowInfo(it)
			UserRespDto.of(it, followInfo)
		}
		ResponseDto(data = data)
	}
}