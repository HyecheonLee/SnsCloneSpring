package com.hyecheon.web.event

import java.util.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
data class EventMessage<T>(
	val kind: Kind,
	val data: T,
	val key: String? = null,
) {
	val id: String = UUID.randomUUID().toString()
	val lastEventId = System.currentTimeMillis()

	enum class Kind {
		connection,
		chatMessage,
		updatedPost,
		followStatus,
		user, newPost,
		deletePost,
		updatedPostStatus,
		chatStatus
	}
}