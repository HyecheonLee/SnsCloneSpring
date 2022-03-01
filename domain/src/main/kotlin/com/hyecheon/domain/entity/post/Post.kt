package com.hyecheon.domain.entity.post

import com.hyecheon.domain.entity.BaseEntity
import com.hyecheon.domain.entity.user.User
import org.hibernate.Hibernate
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import javax.persistence.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
@EntityListeners(AuditingEntityListener::class)
@Table(name = "posts")
@Entity
class Post(
	@Column
	var content: String? = null,
) : BaseEntity() {

	@ManyToOne
	@JoinColumn(name = "username", referencedColumnName = "username", updatable = false, insertable = false)
	var postedBy: User? = null

	@CreatedBy
	@Column(name = "username", updatable = false)
	var username: String? = null

	override fun equals(other: Any?): Boolean {
		if (this === other) return true
		if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
		other as Post

		return id != null && id == other.id
	}

	override fun hashCode(): Int = javaClass.hashCode()

}