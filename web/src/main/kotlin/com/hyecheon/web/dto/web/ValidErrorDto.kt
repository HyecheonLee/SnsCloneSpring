package com.hyecheon.web.dto.web

data class ValidErrorDto(
    val field: String?,
    val rejectValue: Any?,
    val message: String?
)