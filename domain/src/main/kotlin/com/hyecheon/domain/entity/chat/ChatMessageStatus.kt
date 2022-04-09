package com.hyecheon.domain.entity.chat

import com.hyecheon.domain.entity.BaseEntity
import org.springframework.data.annotation.CreatedBy
import javax.persistence.Entity
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/09
 */
@Entity
class ChatMessageStatus(
	@CreatedBy
	var username: String? = null,
	@ManyToOne
	@JoinColumn(name = "chat_room_id")
	var chatRoom: ChatRoom? = null,
	var checkedMessageId: Long? = null,
	var unCheckCnt: Long? = null,
	var lastMessageId: Long? = null,
) : BaseEntity()