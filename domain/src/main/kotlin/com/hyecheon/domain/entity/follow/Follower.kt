package com.hyecheon.domain.entity.follow

import com.hyecheon.domain.entity.BaseEntity
import com.hyecheon.domain.entity.user.User
import org.hibernate.Hibernate
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import java.util.*
import javax.persistence.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/14
 */
// 나를 구독한 사람들
@Entity
class Follower(
	@OneToOne
	@JoinColumn(name = "from_user_id")
	var fromUser: User,
	@OneToOne
	@JoinColumn(name = "to_user_id")
	var toUser: User,
) : BaseEntity() {

	override fun equals(other: Any?): Boolean {
		if (this === other) return true
		if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
		other as Follower

		return id != null && id == other.id
	}

	override fun hashCode(): Int = javaClass.hashCode()

}