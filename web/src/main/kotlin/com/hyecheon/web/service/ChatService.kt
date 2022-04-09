package com.hyecheon.web.service

import com.hyecheon.domain.entity.chat.ChatMessageStatus
import com.hyecheon.domain.entity.chat.ChatMessageStatusRepository
import com.hyecheon.domain.entity.chat.ChatRoom
import com.hyecheon.domain.entity.chat.ChatRoomRepository
import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.web.dto.chat.ChatConverter
import com.hyecheon.web.exception.IdNotExistsException
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
@Transactional
@Service
class ChatService(
	private val chatRoomRepository: ChatRoomRepository,
	private val chatMessageStatus: ChatMessageStatusRepository,
) {
	private val log = LoggerFactory.getLogger(this::class.java)


	fun createChatRoom(chatRoom: ChatRoom): Long {
		val result = chatRoomRepository.save(chatRoom)
		chatMessageStatus.save(ChatMessageStatus(chatRoom = chatRoom))
		return result.id!!
	}

	fun findRoomWithUsersById(id: Long): ChatRoom {
		return chatRoomRepository.findByIdWithUser(id)
	}

	fun findRoomAllByLoggedUser() = run {
		val (userId, username, _) = AuthToken.getLoggedToken()
		chatMessageStatus.findAllByUsername(username!!)
	}

	fun patchRoom(id: Long, source: ChatRoom): ChatRoom = run {
		val chatRoom = chatRoomRepository.findById(id).orElseThrow { IdNotExistsException("chatRoomId: ${id}") }
		ChatConverter.converter.patch(source, chatRoom)
		chatRoom
	}

	fun saveOrFind(chatRoom: ChatRoom): Long {
		val userIds = chatRoom.users?.mapNotNull { it.id }!!

		val chatRooms = chatRoomRepository.findChatRoomByUsers(userIds)

		if (chatRooms.isEmpty()) {
			val savedChatRoom = chatRoomRepository.save(chatRoom)
			chatMessageStatus.save(ChatMessageStatus(chatRoom = savedChatRoom))
			return savedChatRoom.id!!
		}

		return chatRooms.first().id!!
	}
}