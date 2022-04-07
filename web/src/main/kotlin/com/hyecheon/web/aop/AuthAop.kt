package com.hyecheon.web.aop

import com.hyecheon.domain.entity.chat.ChatRoomUserRepository
import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.web.exception.UnAuthorizationException
import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.aspectj.lang.reflect.MethodSignature
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component


/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/07
 */
@Aspect
@Component
class AuthAop(
	private val chatRoomUserRepository: ChatRoomUserRepository,
) {
	private val log = LoggerFactory.getLogger(this::class.java)


	@Before("@annotation(ChatRoomAuth)")
	fun hasChatRoomAuth(joinPoint: JoinPoint) = run {

		val parameterValues = joinPoint.args
		val signature = joinPoint.signature as MethodSignature
		val method = signature.method
		val chatRoomAuth = method.getAnnotation(ChatRoomAuth::class.java)


		var chatRoomId: Long? = null
		for (i in 0 until method.parameters.size) {
			if (method.parameters[i].name == chatRoomAuth.parameterName) {
				chatRoomId = parameterValues[i] as Long?
				break
			}
		}

		val authToken = AuthToken.getLoggedToken()
		if (chatRoomId == null || !chatRoomUserRepository.existsByUserIdAndChatRoomId(authToken.userId!!, chatRoomId)) {
			throw UnAuthorizationException("해당 채팅방에 대한 권한이 없습니다.")
		}
	}
}