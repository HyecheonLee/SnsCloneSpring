package com.hyecheon.web.aop

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/07
 */

/*
* chatRoomId : Long 으로 파라미터 값이 명시되어 있어야 값을 찾을 수 있다.
* */
@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class ChatRoomAuth(
	val parameterName: String = "chatRoomId",
)
