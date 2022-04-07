package com.hyecheon.web.exception

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter

class EventSendException(val emitter: SseEmitter, override val message: String?, e: Exception) : RuntimeException() {
}