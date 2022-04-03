package com.hyecheon.domain.entity.chat

import com.hyecheon.domain.entity.BaseEntity
import com.hyecheon.domain.entity.user.User
import org.springframework.data.annotation.CreatedBy
import javax.persistence.Entity
import javax.persistence.JoinColumn
import javax.persistence.Lob
import javax.persistence.ManyToOne

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

	@ManyToOne
	@JoinColumn(name = "chat_room_id")
	var chatRoom: ChatRoom,
) : BaseEntity() {


}