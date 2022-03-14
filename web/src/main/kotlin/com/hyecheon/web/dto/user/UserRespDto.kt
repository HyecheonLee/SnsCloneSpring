package com.hyecheon.web.dto.user

import com.fasterxml.jackson.annotation.JsonInclude
import com.hyecheon.domain.dto.user.UserConverter
import com.hyecheon.domain.entity.user.User
import com.hyecheon.web.dto.follow.FollowInfoDto
import org.mapstruct.factory.Mappers
import java.time.LocalDateTime

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
object UserRespDto {
	private val converter = Mappers.getMapper(UserConverter::class.java)

	@JsonInclude(value = JsonInclude.Include.NON_NULL)
	data class Model(
		var id: Long? = null,
		var firstName: String? = null,
		var lastName: String? = null,
		var username: String? = null,
		var email: String? = null,
		@JsonInclude(JsonInclude.Include.NON_EMPTY)
		var roles: List<String> = listOf(),
		var profilePic: String? = null,
		var createdAt: LocalDateTime? = null,
		var updatedAt: LocalDateTime? = null,
		var followInfo: FollowInfoDto? = null,
	)

	fun of(user: User) = converter.toModel(user)
	fun of(user: User, followInfoDto: FollowInfoDto) = run {
		val model = converter.toModel(user)
		model.followInfo = followInfoDto
		model
	}
}