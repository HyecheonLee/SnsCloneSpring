package com.hyecheon.web.dto.reply

import com.hyecheon.domain.dto.user.UserConverter
import com.hyecheon.domain.entity.reply.Reply
import org.mapstruct.*
import org.mapstruct.factory.Mappers

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
	nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
abstract class ReplyConverter {
	companion object {
		val converter: ReplyConverter = Mappers.getMapper(ReplyConverter::class.java)
	}

	@Mapping(source = "post.id", target = "postId")
	abstract fun toDto(reply: Reply): ReplyRespDto.Model

	abstract fun toEntity(replyDto: ReplyReqDto.New): Reply

	abstract fun toEntity(replyDto: ReplyReqDto.Modify): Reply

	@BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
	abstract fun update(source: Reply, @MappingTarget target: Reply)
}