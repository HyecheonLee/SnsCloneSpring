package com.hyecheon.web.dto.chat

import com.hyecheon.domain.dto.user.UserConverter
import com.hyecheon.domain.entity.chat.ChatRoom
import com.hyecheon.domain.entity.user.User
import org.mapstruct.*
import org.mapstruct.factory.Mappers

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
	nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
abstract class ChatConverter {
	private val userConverter = Mappers.getMapper(UserConverter::class.java)

	@Mapping(source = "userIds", target = "users", qualifiedByName = ["id2user"])
	abstract fun toEntity(chat: ChatRoomReqDto.New): ChatRoom

	@Mapping(source = "users", target = "users", qualifiedByName = ["users2Model"])
	abstract fun toModel(chatRoom: ChatRoom): ChatRoomRespDto.Model

	@Named("id2user")
	fun id2User(ids: List<Long>) = run {
		ids.map { userId ->
			User().apply {
				id = userId
			}
		}.toMutableSet()
	}

	@Named("users2Model")
	fun users2Model(users: Set<User>) = run {
		users.map { user ->
			userConverter.toModel(user)
		}.toMutableSet()
	}
}