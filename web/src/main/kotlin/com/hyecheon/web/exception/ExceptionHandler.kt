package com.hyecheon.web.exception

import com.hyecheon.web.dto.web.ErrorDto
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.WebRequest
import javax.servlet.http.HttpServletRequest

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
@RestControllerAdvice
class ExceptionHandler {
	private val log = LoggerFactory.getLogger(this::class.java)

	@ExceptionHandler(Exception::class)
	fun allException(e: Exception, request: HttpServletRequest, webRequest: WebRequest) = run {
		val errorRespDto = ErrorDto.of(request)
		log.error("error {}", e.message, e)
		ResponseEntity(errorRespDto, HttpStatus.BAD_REQUEST)
	}
}