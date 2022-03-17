package com.hyecheon.domain.entity.follow

import com.hyecheon.domain.entity.BaseEntity
import com.hyecheon.domain.entity.user.User
import org.hibernate.Hibernate
import javax.persistence.Entity
import javax.persistence.JoinColumn
import javax.persistence.OneToOne

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/14
 */
//내가 구독한 사람들
@Entity
class Following(
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
		other as Following

		return id != null && id == other.id
	}

	override fun hashCode(): Int = javaClass.hashCode()

}