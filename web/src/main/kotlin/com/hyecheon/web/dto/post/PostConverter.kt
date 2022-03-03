package com.hyecheon.web.dto.post

import com.hyecheon.domain.dto.user.UserConverter
import com.hyecheon.domain.entity.post.Post
import com.hyecheon.domain.entity.user.User
import org.hibernate.Hibernate
import org.mapstruct.*
import org.mapstruct.factory.Mappers

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/27
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
	nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
abstract class PostConverter {

	abstract fun toEntity(post: PostReqDto.New): Post

	@Mapping(target = "postedBy", source = "postedBy", qualifiedByName = ["toUserResp"])
	abstract fun toModel(post: Post): PostRespDto.Model

	@Named("toUserResp")
	fun toUserResp(user: User?) = run {
		if (Hibernate.isInitialized(user)) {
			val converter = Mappers.getMapper(UserConverter::class.java)
			converter.toModel(user)
		} else {
			null
		}
	}
}