package com.hyecheon.web.utils

import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.domain.exception.LoggedNotException

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/04
 */
fun getAuthToken() = run {
	val optionalAuthToken = AuthToken.loggedToken()
	if (!optionalAuthToken.isPresent) {
		throw LoggedNotException("로그인을 해주세요")
	}
	optionalAuthToken.get()
}

fun makeEventKey(type: String, id: Long) = run {
	"${type}-${id}"
}

fun makeChatEventKey(id: Long) = run {
	makeEventKey("chatRoomId", id)
}

fun makeUserEventKey(userId:Long) = run {
	makeEventKey("userId", userId)
}
