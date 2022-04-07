package com.hyecheon.web.service

import com.hyecheon.web.event.EventMessage
import com.hyecheon.web.event.SseEmitterUtils
import com.hyecheon.web.event.SseEmitterUtils.eventSend
import com.hyecheon.web.event.SseEvent
import org.slf4j.LoggerFactory
import org.springframework.context.event.EventListener
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/04
 */
@Service
class EventService {
	private val log = LoggerFactory.getLogger(this::class.java)

	fun getEventEmitter(type: SseEvent.EventType, key: String? = null) = run {
		SseEmitterUtils.createSseEmitter(type, key)
	}

	@Async
	@EventListener
	fun onChatEventMessage(event: EventMessage<*>) = run {
		log.info("received event msg : {} , {}", event.type, event.key)
		eventSend(event)
	}
}