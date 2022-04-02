package com.hyecheon.web.dto.chat

import com.hyecheon.domain.entity.chat.ChatRoom
import com.hyecheon.domain.entity.user.User
import org.mapstruct.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
	nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
abstract class ChatConverter {

	@Mapping(source = "userIds", target = "users", qualifiedByName = ["id2user"])
	abstract fun toEntity(chat: ChatRoomReqDto.New): ChatRoom


	@Named("id2user")
	fun id2User(ids: List<Long>) = run {
		ids.map { userId ->
			User().apply {
				id = userId
			}
		}.toMutableSet()
	}
}