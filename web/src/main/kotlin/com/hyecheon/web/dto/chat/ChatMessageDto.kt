package com.hyecheon.web.dto.chat

import com.hyecheon.domain.entity.chat.ChatMessage
import java.time.LocalDateTime

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/03
 */
object ChatMessageDto {
	data class New(
		var message: String? = null,
		var chatRoomId: Long? = null,
	) {
		fun toEntity() = run {
			ChatConverter.converter.toEntity(this)
		}
	}

	data class Model(
		var id: Long? = null,
		var message: String? = null,
		var createdBy: String? = null,
		var chatRoomId: Long? = null,
		var createdAt: LocalDateTime? = null,
	)

	fun toModel(chatMessage: ChatMessage) = run {
		ChatConverter.converter.toModel(chatMessage)
	}
}