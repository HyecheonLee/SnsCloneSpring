package com.hyecheon.domain.entity.user

import com.hyecheon.domain.entity.BaseEntity
import org.hibernate.Hibernate
import org.springframework.security.core.GrantedAuthority
import javax.persistence.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
@Entity
class Authorization(
	@Column(unique = true)
	val role: String,
) : BaseEntity(), GrantedAuthority {

	@ManyToMany(mappedBy = "roles")
	val users: MutableSet<User> = mutableSetOf()

	override fun getAuthority(): String {
		return "ROLE_${role}"
	}

	override fun equals(other: Any?): Boolean {
		if (this === other) return true
		if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
		other as Authorization
		return id != null && id == other.id
	}

	override fun hashCode(): Int = javaClass.hashCode()
}