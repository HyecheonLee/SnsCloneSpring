package com.hyecheon.web.exception

import com.hyecheon.web.dto.web.ErrorDto
import com.hyecheon.web.dto.web.ValidErrorDto
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.WebRequest
import javax.servlet.http.HttpServletRequest
import javax.validation.ConstraintViolationException


/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
@RestControllerAdvice
class ExceptionHandler {
    private val log = LoggerFactory.getLogger(this::class.java)

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun methodArgumentNotValidException(e: MethodArgumentNotValidException, request: HttpServletRequest) {
        val bindingResult = e.bindingResult
        val results = bindingResult.fieldErrors.map { ValidErrorDto(it.field, it.rejectedValue, it.defaultMessage) }
        ErrorDto.of(request, results)
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException::class)
    fun validationException(e: ConstraintViolationException, request: HttpServletRequest) {
        val constraintViolations = e.constraintViolations
        val result = constraintViolations.map {
            ValidErrorDto(
                getPropertyName(it.propertyPath.toString()),
                it.invalidValue,
                it.message
            )
        }
        ErrorDto.of(request, result)
    }

    @ExceptionHandler(Exception::class)
    fun allException(e: Exception, request: HttpServletRequest, webRequest: WebRequest) = run {
        val errorRespDto = ErrorDto.of(request)
        log.error("error {}", e.message, e)
        ResponseEntity(errorRespDto, HttpStatus.BAD_REQUEST)
    }

    private fun getPropertyName(propertyPath: String): String {
        return propertyPath.substring(propertyPath.lastIndexOf('.') + 1)
    }
}