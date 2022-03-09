package com.hyecheon.web.dto.reply

import com.hyecheon.domain.entity.reply.Reply
import java.time.LocalDateTime

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
object ReplyRespDto {

	data class Model(
		var id: Long? = null,
		var postId: Long? = null,
		var content: String? = null,
		var createdBy: String? = null,
		var createdAt: LocalDateTime? = null,
		var updatedAt: LocalDateTime? = null,
	)

	fun of(reply: Reply) = run {
		ReplyConverter.converter.toDto(reply)
	}
}