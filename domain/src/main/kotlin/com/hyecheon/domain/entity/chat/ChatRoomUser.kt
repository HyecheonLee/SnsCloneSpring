package com.hyecheon.domain.entity.chat

import com.hyecheon.domain.entity.user.User
import java.io.Serializable
import javax.persistence.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
@IdClass(ChatRoomUser.Ids::class)
@Entity
class ChatRoomUser {

	@Id
	@Column(name = "chat_room_id")
	var chatRoomId: Long? = null

	@Id
	@Column(name = "user_id")
	var userId: Long? = null

	@MapsId("chat_room_id")
	@ManyToOne
	var chatRoom: ChatRoom? = null

	@MapsId("user_id")
	@ManyToOne
	var user: User? = null

	data class Ids(
		var chatRoomId: Long? = null,
		var userId: Long? = null,
	) : Serializable
}