package com.hyecheon.domain.dto.user

import com.hyecheon.domain.entity.user.Authorization
import com.hyecheon.domain.entity.user.User
import com.hyecheon.web.dto.user.UserReqDto
import com.hyecheon.web.dto.user.UserRespDto
import org.mapstruct.*


/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
	nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
abstract class UserConverter {

	@BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
	abstract fun toEntity(user: UserReqDto.Join): User

	@BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
	@Mapping(source = "roles", target = "roles", qualifiedByName = ["toRole"])
	abstract fun toModel(user: User?): UserRespDto.Model

	@Named("toRole")
	fun toRole(roles: MutableSet<Authorization>) = roles.map { it.role }
}