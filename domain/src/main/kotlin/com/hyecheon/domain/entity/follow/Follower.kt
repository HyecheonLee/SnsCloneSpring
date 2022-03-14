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
@EntityListeners(AuditingEntityListener::class)
@IdClass(FollowId::class)
@Entity
class Follower(

	@Id @Column(name = "from_user_id")
	var from: Long = 0,
	@Id @Column(name = "to_user_id")
	var to: Long = 0,
) {


	@CreatedDate
	var createdAt: LocalDateTime? = null

	override fun equals(other: Any?): Boolean {
		if (this === other) return true
		if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
		other as Follower

		return from == other.from
				&& to == other.to
	}

	override fun hashCode(): Int = Objects.hash(from, to);

}