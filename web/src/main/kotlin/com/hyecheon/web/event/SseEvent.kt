package com.hyecheon.web.event

import com.hyecheon.domain.entity.user.AuthToken
import org.slf4j.LoggerFactory
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter

data class SseEvent(
    private val sseEmitter: SseEmitter,
    val type: EventType,
    val key: String? = null,
) {
    private val log = LoggerFactory.getLogger(SseEvent::class.java)

    val userId: Long?
    val username: String?
    var connected: Boolean = true

    init {
        val token = AuthToken.getLoggedToken()
        userId = token.userId
        username = token.username
    }

    enum class EventType {
        Chat, Notify, User;
    }

    fun connectionCheck(): Boolean {
        return send(EventMessage("connection", "connecting..."))
    }

    private fun <T> sendAble(message: EventMessage<T>): Boolean {
        return (message.key == null || message.key == key) && connected
    }

    fun <T> send(message: EventMessage<T>): Boolean {
        if (!sendAble(message)) return false
        return try {
            sseEmitter.send(message)
            connected = true
            true
        } catch (e: Exception) {
            log.error("send error ${e.message}", e)
            sseEmitter.completeWithError(e)
            connected = false
            false
        }
    }
}