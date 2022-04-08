package com.hyecheon.web.service

import com.hyecheon.web.event.EventMessage
import com.hyecheon.web.event.SseEvent
import org.slf4j.LoggerFactory
import org.springframework.context.event.EventListener
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import java.util.concurrent.CopyOnWriteArrayList

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/04
 */
@Service
class EventService {
	companion object {
		private val log = LoggerFactory.getLogger(this::class.java)
		private val events: CopyOnWriteArrayList<SseEvent> = CopyOnWriteArrayList()
		private const val SSE_SESSION_TIMEOUT: Long = 30 * 60 * 1000L
	}

	fun createSseEmitter(type: SseEvent.EventType, key: String? = null) = run {
		val emitter = SseEmitter(SSE_SESSION_TIMEOUT)
		val sseEvent = SseEvent(emitter, type, key)
		events.add(sseEvent)
		emitter.onTimeout {
			log.info("emitter timeout key : {}", key)
			events.remove(sseEvent)
			emitter.complete()
		}
		emitter.onCompletion {
			log.info("emitter completion key : {}", key)
			events.remove(sseEvent)
			emitter.complete()
		}
		emitter
	}

	fun <T> eventSend(eventMessage: EventMessage<T>) {
		events.forEach { !it.send(eventMessage) }
		val disconnected = events.filter { !it.connected }
		disconnected.forEach { events.remove(it) }
	}

	@Async
	@EventListener
	fun onChatEventMessage(event: EventMessage<*>) = run {
		log.info("received event msg : {} , {}", event.type, event.key)
		eventSend(event)
	}
}