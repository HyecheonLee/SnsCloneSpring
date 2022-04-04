package com.hyecheon.domain.entity.chat

import com.hyecheon.domain.entity.BaseEntity
import org.springframework.data.annotation.CreatedBy
import javax.persistence.Entity
import javax.persistence.Lob

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/03
 */
@Entity
class ChatMessage(

	@Lob
	var message: String? = null,

	@CreatedBy
	var createdBy: String,

	var chatRoomId: Long,
) : BaseEntity() {


}