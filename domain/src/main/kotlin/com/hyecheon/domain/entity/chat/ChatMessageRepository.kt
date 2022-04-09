package com.hyecheon.domain.entity.chat

import org.springframework.data.jpa.repository.JpaRepository

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/03
 */
interface ChatMessageRepository : JpaRepository<ChatMessage, Long> {

	fun findTop10ByChatRoomIdAndIdLessThanOrderByIdDesc(chatRoomId: Long, id: Long): List<ChatMessage>
	fun countByChatRoomIdAndIdGreaterThan(chatRoomId: Long, id: Long): Long
}