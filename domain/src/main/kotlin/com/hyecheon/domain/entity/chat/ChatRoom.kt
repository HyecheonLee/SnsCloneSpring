package com.hyecheon.domain.entity.chat

import com.hyecheon.domain.entity.BaseEntity
import com.hyecheon.domain.entity.user.User
import javax.persistence.Entity
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToMany

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
@Entity
class ChatRoom(
	var chatRoomName: String = "",
	var groupChat: Boolean = false,
) : BaseEntity() {

	@ManyToMany
	@JoinTable(name = "chat_room_user",
		joinColumns = [JoinColumn(name = "chat_room_id")],
		inverseJoinColumns = [JoinColumn(name = "user_id")])
	var users: MutableSet<User> = mutableSetOf()


	var lastMessage: String? = null

	fun addUsers(user: User) = run {
		users.add(user)
	}
}