package com.hyecheon.web.dto.chat

import org.mapstruct.factory.Mappers

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
object ChatRoomReqDto {
	private val converter = Mappers.getMapper(ChatConverter::class.java)

	data class Patch(
		var chatRoomName: String? = null,
		var userIds: List<Long>? = null,
	) {
		fun toEntity() = run {
			converter.toEntity(this)
		}
	}

	data class New(
		var chatRoomName: String = "",
		var groupChat: Boolean = false,
		var userIds: List<Long> = listOf(),
	) {
		fun toEntity() = run {
			converter.toEntity(this)
		}
	}
}