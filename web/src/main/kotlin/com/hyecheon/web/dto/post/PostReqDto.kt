package com.hyecheon.web.dto.post

import com.hyecheon.domain.dto.user.UserConverter
import org.mapstruct.factory.Mappers

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/27
 */
object PostReqDto {
	private val converter = Mappers.getMapper(PostConverter::class.java)

	data class New(
		var content: String? = null,
	) {
		fun toEntity() = run {
			converter.toEntity(this)
		}
	}
}