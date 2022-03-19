package com.hyecheon.web.dto.web

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
data class ResponseDto<T>(
	val code: Int = 0,
	val data: T,
	val message: String = "success",
) {
}