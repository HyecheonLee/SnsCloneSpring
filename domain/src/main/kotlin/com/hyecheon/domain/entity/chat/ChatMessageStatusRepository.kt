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

	fun findByUsernameAndChatRoomId(username: String, chatRoomId: Long): Optional<ChatMessageStatus>

	@Query("select c from ChatMessageStatus c join fetch c.chatRoom r left join fetch r.users")
	fun findAllByUsername(username: String): List<ChatMessageStatus>
}