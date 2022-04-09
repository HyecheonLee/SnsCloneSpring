package com.hyecheon.web.dto.chat

import com.hyecheon.domain.entity.chat.ChatMessageStatus
import java.time.LocalDateTime

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/09
 */
object ChatStatusDto {

	data class Model(
		var id: Long? = null,
		var chatRoom: ChatRoomRespDto.Model,
		var checkedMessageId: Long? = null,
		var unCheckCnt: Long? = null,
		var lastMessageId: Long? = null,
		var updatedAt: LocalDateTime? = null,
	)

	fun toModel(chatMessageStatus: ChatMessageStatus) = run {
		ChatConverter.converter.toModel(chatMessageStatus)
	}
}