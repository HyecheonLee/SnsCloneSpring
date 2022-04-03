package com.hyecheon.web.dto.chat

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
	)

	data class Model(
		var message: String? = null,
		var createdBy: String? = null,
		var chatRoom: ChatRoomRespDto.Model? = null,
		var createdAt: LocalDateTime? = null,
	)
}