package com.hyecheon.web.dto.reply

import com.hyecheon.web.dto.reply.ReplyConverter.Companion.converter

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
object ReplyReqDto {

	data class New(
		var postId: Long? = null,
		var content: String? = null,
	) {
		fun toEntity() = run {
			converter.toEntity(this)
		}
	}

	data class Modify(
		var content: String? = null,
	) {
		fun toEntity() = run {
			converter.toEntity(this)
		}
	}
}