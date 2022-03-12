package com.hyecheon.web.dto.post

import com.hyecheon.domain.entity.post.Post
import com.hyecheon.web.dto.user.UserRespDto
import org.mapstruct.factory.Mappers
import java.time.LocalDateTime

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/27
 */
object PostRespDto {

	private val converter = Mappers.getMapper(PostConverter::class.java)

	data class Model(
		var id: Long? = null,
		var content: String? = null,
		var createdAt: LocalDateTime? = null,
		var updatedAt: LocalDateTime? = null,
		var postedBy: UserRespDto.Model? = null,
		var userLike: Boolean = false,
		var postStatus: PostStatusDto? = null,
		var relies: MutableSet<Model> = mutableSetOf(),
	)

	fun of(post: Post) = run {
		converter.toModel(post)
	}
}