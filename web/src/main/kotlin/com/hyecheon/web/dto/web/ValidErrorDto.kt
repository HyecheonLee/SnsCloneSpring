package com.hyecheon.web.dto.web

data class ValidErrorDto(
    val field: String? = null,
    val rejectValue: Any? = null,
    val message: String? = null
)