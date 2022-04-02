package com.hyecheon.web.service

import com.hyecheon.domain.entity.chat.ChatRoom
import com.hyecheon.domain.entity.chat.ChatRepository
import org.springframework.stereotype.Service

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
@Service
class ChatService(
	private val chatRepository: ChatRepository,
) {
	fun createChatRoom(chatRoom: ChatRoom): Long {
		val result = chatRepository.save(chatRoom)
		return result.id!!
	}
}