package com.hyecheon.domain.entity.chat

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
interface ChatRoomRepository : JpaRepository<ChatRoom, Long> {

	@Query("select c from ChatRoom c join fetch c.users where c.id = :id")
	fun findByIdWithUser(id: Long): ChatRoom

}