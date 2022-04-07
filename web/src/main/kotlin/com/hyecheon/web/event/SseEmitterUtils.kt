package com.hyecheon.web.event

import com.hyecheon.web.WebApplication
import org.slf4j.LoggerFactory
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import java.util.concurrent.CopyOnWriteArrayList

object SseEmitterUtils {
	private val log = LoggerFactory.getLogger(SseEmitterUtils::class.java)
	private const val SSE_SESSION_TIMEOUT: Long = 30 * 60 * 1000L

	private val events: CopyOnWriteArrayList<SseEvent> = CopyOnWriteArrayList()


	fun createSseEmitter(type: SseEvent.EventType, key: String? = null) = run {
		val emitter = SseEmitter(SSE_SESSION_TIMEOUT)
		val sseEvent = SseEvent(emitter, type, key)
		events.add(sseEvent)
		emitter.onTimeout {
			events.remove(sseEvent)
			emitter.complete()
		}
		emitter.onCompletion {
			events.remove(sseEvent)
			emitter.complete()
		}
		emitter
	}

	fun <T> eventSend(eventMessage: EventMessage<T>) {
		events.forEach { !it.eventSend(eventMessage) }
		val disconnected = events.filter { !it.connected }
		disconnected.forEach { events.remove(it) }
	}

	fun <T> eventSend(emitter: SseEmitter, notify: EventMessage<T>) = run {
		val log = LoggerFactory.getLogger(WebApplication::class.java)
		try {
			emitter.send(notify)
			Result.success(emitter)
		} catch (e: Exception) {
			log.error("send error ${e.message}", e)
			Result.failure(e)
		}
	}
}