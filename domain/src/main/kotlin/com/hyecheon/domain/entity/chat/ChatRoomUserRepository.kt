package com.hyecheon.domain.entity.chat

import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
interface ChatRoomUserRepository : JpaRepository<ChatRoomUser, ChatRoomUser.Ids> {

	@EntityGraph(attributePaths = ["chatRoom", "chatRoom.users"], type = EntityGraph.EntityGraphType.LOAD)
	fun findAllByUserId(userId: Long): Set<ChatRoomUser>
}