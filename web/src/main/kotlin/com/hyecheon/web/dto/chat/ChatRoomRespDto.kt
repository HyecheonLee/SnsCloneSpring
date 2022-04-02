package com.hyecheon.web.dto.chat

import com.hyecheon.domain.entity.chat.ChatRoom
import com.hyecheon.domain.entity.user.User
import com.hyecheon.web.dto.user.UserRespDto
import org.mapstruct.factory.Mappers
import java.time.LocalDateTime

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
object ChatRoomRespDto {
	private val converter = Mappers.getMapper(ChatConverter::class.java)

	data class Model(
		var id: Long?,
		var chatRoomName: String? = "",
		var groupChat: Boolean? = false,
		var users: MutableSet<UserRespDto.Model>? = mutableSetOf(),
		var lastMessage: String? = null,
		var createdAt: LocalDateTime? = null,
		var updatedAt: LocalDateTime? = null,
	)

	fun toModel(chatRoom: ChatRoom) = run {
		converter.toModel(chatRoom)
	}
}