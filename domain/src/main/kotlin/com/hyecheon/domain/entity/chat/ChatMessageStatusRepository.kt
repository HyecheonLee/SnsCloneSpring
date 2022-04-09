package com.hyecheon.domain.entity.chat

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import java.util.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/09
 */
interface ChatMessageStatusRepository : JpaRepository<ChatMessageStatus, Long> {

	@Modifying
	@Query(nativeQuery = true,
		value = "update chat_message_status c set c.last_message_id = :id where c.chat_room_id = :chatRoomId")
	fun updateLastMsg(chatRoomId: Long, id: Long): Int

	@Query("select c from ChatMessageStatus c join fetch c.chatRoom r join fetch r.users where c.username =:username and c.chatRoom = :chatRoom")
	fun findByUsernameAndChatRoom(username: String, chatRoom: ChatRoom): Optional<ChatMessageStatus>

	@Query("select c from ChatMessageStatus c join fetch c.chatRoom r join fetch r.users where c.username = :username")
	fun findAllByUsername(username: String): List<ChatMessageStatus>
}