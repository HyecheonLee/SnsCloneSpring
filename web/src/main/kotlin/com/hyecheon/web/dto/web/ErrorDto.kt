package com.hyecheon.web.dto.web

import javax.servlet.http.HttpServletRequest

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/01
 */
data class ErrorDto<T>(
    var uri: String,
    var method: String,
    var clientIp: String,
    var query: String?,
    var parameter: Map<String, Array<String>>,
    var data: T? = null,
) {
    companion object {
        fun of(request: HttpServletRequest) = run {
            ErrorDto<Any>(
                request.requestURI,
                request.method,
                request.remoteAddr,
                request.queryString,
                request.parameterMap
            )
        }

        fun <T> of(request: HttpServletRequest, data: T) = run {
            ErrorDto<T>(
                request.requestURI,
                request.method,
                request.remoteAddr,
                request.queryString,
                request.parameterMap,
                data
            )
        }
    }
}