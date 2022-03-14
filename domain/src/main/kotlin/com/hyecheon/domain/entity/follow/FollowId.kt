package com.hyecheon.domain.entity.follow

import com.hyecheon.domain.entity.user.User
import org.hibernate.Hibernate
import java.io.Serializable
import java.util.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/14
 */
class FollowId(
	var from: Long = 0,
	var to: Long = 0,
) : Serializable {


	override fun equals(other: Any?): Boolean {
		if (this === other) return true
		if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
		other as FollowId

		return from == other.from
				&& to == other.to
	}

	override fun hashCode(): Int = Objects.hash(from, to);
}