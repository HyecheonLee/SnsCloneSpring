package com.hyecheon.web.service

import com.hyecheon.domain.entity.chat.ChatMessage
import com.hyecheon.domain.entity.chat.ChatMessageRepository
import com.hyecheon.web.dto.chat.ChatMessageDto
import com.hyecheon.web.dto.web.EventDto
import io.undertow.util.CopyOnWriteMap
import org.slf4j.LoggerFactory
import org.springframework.context.ApplicationEventPublisher
import org.springframework.context.event.EventListener
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import java.util.concurrent.CopyOnWriteArrayList

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/05
 */
@Transactional
@Service
class ChatMessageService(
	private val chatMessageRepository: ChatMessageRepository,
	private val applicationEventPublisher: ApplicationEventPublisher,
) {
	private val log = LoggerFactory.getLogger(this::class.java)

	companion object {
		const val SSE_SESSION_TIMEOUT: Long = 30 * 60 * 1000L
	}

	val emitterMap: MutableMap<Long, CopyOnWriteArrayList<SseEmitter>> = CopyOnWriteMap()

	fun getEmitter(chatRoomId: Long) = run {
		val emitter = SseEmitter(SSE_SESSION_TIMEOUT)
		val emitters = emitterMap.getOrDefault(chatRoomId, CopyOnWriteArrayList())
		emitters.add(emitter)
		emitterMap[chatRoomId] = emitters
		emitter.onTimeout {
			emitters.remove(emitter)
			if (emitters.isEmpty()) {
				emitterMap.remove(chatRoomId)
			}
			emitter.complete()
		}
		emitter.onCompletion {
			emitters.remove(emitter)
			if (emitters.isEmpty()) {
				emitterMap.remove(chatRoomId)
			}
			emitter.complete()
		}
		emitter
	}

	@Async
	@EventListener
	fun onMessageEvent(message: ChatMessageDto.Model) = run {
		log.info("chat event : {}", message)
		val sendData = EventDto("chatMessage", message)
		val chatRoomId = message.chatRoomId
		if (chatRoomId != null) {
			val emitters = emitterMap.getOrDefault(chatRoomId, CopyOnWriteArrayList())
			val removes = CopyOnWriteArrayList<SseEmitter>()
			for (emitter in emitters) {
				try {
					emitter?.send(sendData)
				} catch (e: Exception) {
					log.error("send error ${e.message}", e)
					removes.add(emitter)
				}
			}
			emitters.removeAll(removes)
		}
	}

	fun newChatMsg(chatMessage: ChatMessage) = run {
		val msg = chatMessageRepository.save(chatMessage)
		applicationEventPublisher.publishEvent(ChatMessageDto.toModel(msg))
		msg.id
	}

	fun findAllMessage(chatRoomId: Long, lastId: Long) = run {
		chatMessageRepository.findTop10ByChatRoomIdAndIdLessThanOrderByIdDesc(chatRoomId, lastId)
	}
}