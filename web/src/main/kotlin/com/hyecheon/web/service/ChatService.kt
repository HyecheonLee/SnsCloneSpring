package com.hyecheon.web.service

import com.hyecheon.domain.entity.chat.ChatRoom
import com.hyecheon.domain.entity.chat.ChatRoomRepository
import com.hyecheon.domain.entity.chat.ChatRoomUser
import com.hyecheon.domain.entity.chat.ChatRoomUserRepository
import com.hyecheon.domain.entity.user.AuthToken
import org.springframework.stereotype.Service

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
@Service
class ChatService(
	private val chatRoomRepository: ChatRoomRepository,
	private val chatRoomUserRepository: ChatRoomUserRepository,
) {
	fun createChatRoom(chatRoom: ChatRoom): Long {
		val result = chatRoomRepository.save(chatRoom)
		return result.id!!
	}

	fun findRoomWithUsersById(id: Long): ChatRoom {
		return chatRoomRepository.findByIdWithUser(id)
	}

	fun findRoomAllByLoggedUser(): List<ChatRoomUser> {
		val (userId, username, role) = AuthToken.getLoggedToken()
		return chatRoomUserRepository.findAllByUserId(userId!!).toList()
	}
}