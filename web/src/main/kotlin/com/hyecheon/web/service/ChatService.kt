package com.hyecheon.web.service

import com.hyecheon.domain.entity.chat.*
import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.web.dto.chat.ChatConverter
import com.hyecheon.web.dto.chat.ChatMessageDto
import com.hyecheon.web.exception.IdNotExistsException
import io.undertow.util.CopyOnWriteMap
import org.slf4j.LoggerFactory
import org.springframework.context.event.EventListener
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
@Transactional
@Service
class ChatService(
	private val chatRoomRepository: ChatRoomRepository,
	private val chatRoomUserRepository: ChatRoomUserRepository,
	private val chatMessageRepository: ChatMessageRepository,
) {
	private val log = LoggerFactory.getLogger(this::class.java)

	companion object {
		const val SSE_SESSION_TIMEOUT: Long = 30 * 60 * 1000L
	}

	val emitterMap: MutableMap<Long, SseEmitter> = CopyOnWriteMap()


	fun createChatRoom(chatRoom: ChatRoom): Long {
		val result = chatRoomRepository.save(chatRoom)
		return result.id!!
	}

	fun findRoomWithUsersById(id: Long): ChatRoom {
		return chatRoomRepository.findByIdWithUser(id)
	}

	fun findRoomAllByLoggedUser(): List<ChatRoomUser> {
		val (userId, username, role) = AuthToken.getLoggedToken()
		return chatRoomUserRepository.findAllByUserId(userId!!)
	}

	fun patchRoom(id: Long, source: ChatRoom): ChatRoom = run {
		val chatRoom = chatRoomRepository.findById(id).orElseThrow { IdNotExistsException("chatRoomId: ${id}") }
		ChatConverter.converter.patch(source, chatRoom)
		chatRoom
	}

	fun newChatMsg(chatMessage: ChatMessage) = run {
		val msg = chatMessageRepository.save(chatMessage)
		msg.id
	}

	fun saveOrFind(chatRoom: ChatRoom): Long {
		val userIds = chatRoom.users?.mapNotNull { it.id }!!
		val chatRooms = chatRoomRepository.findChatRoomByUsers(userIds)
		if (chatRooms.isEmpty()) {
			val savedChatRoom = chatRoomRepository.save(chatRoom)
			return savedChatRoom.id!!
		}
		return chatRooms.first().id!!
	}
}