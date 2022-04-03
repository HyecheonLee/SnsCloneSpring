package com.hyecheon.domain.entity.chat

import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
interface ChatRoomUserRepository : JpaRepository<ChatRoomUser, ChatRoomUser.Ids> {

	@EntityGraph(attributePaths = ["chatRoom", "chatRoom.users"], type = EntityGraph.EntityGraphType.LOAD)
	fun findAllByUserId(userId: Long): List<ChatRoomUser>

	@Query(value = """
		select count(*) from chat_room_user join chat_room on  chat_room.id = chat_room_user.chat_room_id 
		where user_id in (:userIds) and chat_room.group_chat = false
	""", nativeQuery = true)
	fun getByChatRoomAndUserIds(userIds: List<Long>): Map<String, String>
}