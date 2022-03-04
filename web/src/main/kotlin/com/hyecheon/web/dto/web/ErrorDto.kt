package com.hyecheon.web.dto.web

import java.time.LocalDateTime
import javax.servlet.http.HttpServletRequest

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/01
 */
data class ErrorDto(
	var uri: String,
	var method: String,
	var clientIp: String,
	var query: String?,
	var parameter: Map<String, Array<String>>,
) {
	companion object {
		fun of(request: HttpServletRequest) = run {
			ErrorDto(
				request.requestURI,
				request.method,
				request.remoteAddr,
				request.queryString,
				request.parameterMap
			)
		}
	}
}