package com.hyecheon.web.exception

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
@RestControllerAdvice
class ExceptionHandler {

	@ExceptionHandler(Exception::class)
	fun allException(e: Exception) = run {
		ResponseEntity.ok(e.message)
	}
}