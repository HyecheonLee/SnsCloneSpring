package com.hyecheon.domain.entity.chat

import com.hyecheon.domain.entity.BaseEntity
import org.springframework.data.annotation.CreatedBy
import javax.persistence.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/09
 */
@Table(uniqueConstraints = [UniqueConstraint(name = "user_chat_room", columnNames = ["username", "chat_room_id"])])
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