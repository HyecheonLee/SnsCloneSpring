package com.hyecheon.domain.entity.chat

import com.hyecheon.domain.entity.user.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
interface ChatRoomRepository : JpaRepository<ChatRoom, Long> {

	@Query("select c from ChatRoom c join fetch c.users where c.id = :id")
	fun findByIdWithUser(id: Long): ChatRoom


	@Query(nativeQuery = true, value = """
		select c.* from chat_room c join chat_room_user cru on c.id = cru.chat_room_id
		where c.group_chat = false and cru.user_id in (:userIds)
	""")
	fun findChatRoomByUsers(userIds: List<Long>): List<ChatRoom>

	@Modifying
	@Query(value = "update ChatRoom c set c.lastMessage = :message where c.id = :chatRoomId")
	fun updateLastMsg(chatRoomId: Long, message: String?)
}