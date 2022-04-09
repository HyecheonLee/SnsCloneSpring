package com.hyecheon.web.event

import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.web.event.EventMessage.Kind
import org.slf4j.LoggerFactory
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import java.util.*

data class SseEvent(
	val sseEmitter: SseEmitter,
	val type: EventType,
	val key: String? = null,
) {
	private val log = LoggerFactory.getLogger(SseEvent::class.java)
	val id: String = UUID.randomUUID().toString()
	val userId: Long?
	val username: String?
	var connected: Boolean = true

	init {
		val token = AuthToken.getLoggedToken()
		userId = token.userId
		username = token.username
		connectionCheck()
		log.info("created sseEvent [ id : {} , type {} , key : {}]", id, type, key)
	}

	enum class EventType {
		Chat, Notify, User;
	}

	private fun connectionCheck(): Boolean {
		return send(EventMessage(Kind.connection, "connecting..."))
	}

	private fun <T> sendAble(message: EventMessage<T>): Boolean {
		return (message.key == null || message.key == key) && connected
	}

	fun <T> send(message: EventMessage<T>): Boolean {
		if (!sendAble(message)) return false
		log.info("send msg key : {}", message.key)
		return try {
			sseEmitter.send(message)
			connected = true
			true
		} catch (e: Exception) {
			log.error("send error ${e.message} [ id : {} ]", id)
			sseEmitter.completeWithError(e)
			connected = false
			false
		}
	}
}