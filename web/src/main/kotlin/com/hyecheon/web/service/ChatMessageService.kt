package com.hyecheon.web.service

import com.hyecheon.domain.entity.chat.*
import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.web.dto.chat.ChatMessageDto
import com.hyecheon.web.event.EventMessage
import com.hyecheon.web.exception.IdNotExistsException
import com.hyecheon.web.utils.getAuthToken
import com.hyecheon.web.utils.makeChatEventKey
import com.hyecheon.web.utils.makeUserEventKey
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
	private val chatMessageStatusRepository: ChatMessageStatusRepository,
	private val applicationEventPublisher: ApplicationEventPublisher,
) {
	private val log = LoggerFactory.getLogger(this::class.java)

	@Transactional
	fun newChatMsg(chatMessage: ChatMessage) = run {
		val msg = chatMessageRepository.save(chatMessage)

		val chatRoom = chatRoomRepository.findById(chatMessage.chatRoomId)
			.orElseThrow { IdNotExistsException("[ chatRoomId : ${chatMessage.chatRoomId}]") }

		chatRoom.lastMessage = chatMessage.message
		chatRoom.messageCnt = chatRoom.messageCnt ?: 0 + 1L

		chatMessageStatusRepository.updateLastMsg(chatMessage.chatRoomId, msg.id!!)

		applicationEventPublisher.publishEvent(EventMessage(EventMessage.Kind.chatMessage,
			ChatMessageDto.toModel(msg),
			key = makeChatEventKey(msg.chatRoomId)))

		val authToken = getAuthToken()
		chatRoom.users?.filter { it.id != authToken.userId }?.forEach { user ->
			applicationEventPublisher.publishEvent(
				EventMessage(EventMessage.Kind.chatStatus,
					mapOf("chatRoomId" to chatMessage.chatRoomId),
					key = makeUserEventKey(user.id!!)))
		}
		msg.id
	}

	fun findAllMessage(chatRoomId: Long, lastId: Long) = run {
		chatMessageRepository.findTop10ByChatRoomIdAndIdLessThanOrderByIdDesc(chatRoomId, lastId)
	}

	fun chatMessageCheck(chatRoomId: Long, checkedId: Long) = run {
		val unCheckCnt =
			chatMessageRepository.countByChatRoomIdAndIdGreaterThan(chatRoomId, checkedId)

		val chatRoom = chatRoomRepository.getById(chatRoomId)

		val authToken = AuthToken.getLoggedToken()

		val status =
			chatMessageStatusRepository.findByUsernameAndChatRoom(authToken.username!!, chatRoom)
				.orElseGet { chatMessageStatusRepository.save(ChatMessageStatus(chatRoom = chatRoom)) }

		status.unCheckCnt = unCheckCnt
		status.checkedMessageId = checkedId
		status.id
	}

	@Transactional
	fun getChatStatus(chatRoomId: Long) = run {
		val authToken = AuthToken.getLoggedToken()
		val chatRoom = chatRoomRepository.getById(chatRoomId)
		val status =
			chatMessageStatusRepository.findByUsernameAndChatRoom(authToken.username!!, chatRoom)
				.orElseGet { chatMessageStatusRepository.save(ChatMessageStatus(chatRoom = chatRoom)) }

		val unCheckCnt =
			chatMessageRepository.countByChatRoomIdAndIdGreaterThan(chatRoomId, status.checkedMessageId ?: 0)

		status.unCheckCnt = unCheckCnt
		status.id

		status
	}
}