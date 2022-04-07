package com.hyecheon.web.dto.web

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
data class EventDto<T>(
	val type: String,
	val data: T,
)