package com.hyecheon.web.service

import com.hyecheon.domain.entity.chat.ChatMessage
import com.hyecheon.domain.entity.chat.ChatMessageRepository
import com.hyecheon.domain.entity.chat.ChatRoomRepository
import com.hyecheon.web.dto.chat.ChatMessageDto
import com.hyecheon.web.event.EventMessage
import com.hyecheon.web.utils.makeChatEventKey
import org.slf4j.LoggerFactory
import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/05
 */
@Transactional
@Service
class ChatMessageService(
	private val chatMessageRepository: ChatMessageRepository,
	private val chatRoomRepository: ChatRoomRepository,
	private val applicationEventPublisher: ApplicationEventPublisher,
) {
	private val log = LoggerFactory.getLogger(this::class.java)


	fun newChatMsg(chatMessage: ChatMessage) = run {
		val msg = chatMessageRepository.save(chatMessage)
		chatRoomRepository.updateLastMsg(chatMessage.chatRoomId, chatMessage.message)
		applicationEventPublisher.publishEvent(EventMessage("chatMessage",
			ChatMessageDto.toModel(msg),
			key = makeChatEventKey(msg.chatRoomId)))

		msg.id
	}

	fun findAllMessage(chatRoomId: Long, lastId: Long) = run {
		chatMessageRepository.findTop10ByChatRoomIdAndIdLessThanOrderByIdDesc(chatRoomId, lastId)
	}
}