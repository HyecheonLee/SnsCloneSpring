package com.hyecheon.domain.entity.user

import com.hyecheon.domain.entity.BaseEntity
import org.hibernate.Hibernate
import javax.persistence.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */

@Table(name = "users")
@Entity
class User(
	var firstName: String? = null,

	var lastName: String? = null,

	@Column(unique = true)
	var username: String? = null,
	@Column(unique = true)

	var email: String? = null,

	var password: String? = null,

	var profilePic: String? = null,

	) : BaseEntity() {

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
		name = "user_authorization",
		joinColumns = [JoinColumn(name = "user_id")],
		inverseJoinColumns = [JoinColumn(name = "authorization_id")])
	var roles: MutableSet<Authorization> = mutableSetOf()

	var enabled: Boolean = true

	fun addRole(authorization: Authorization) = run {
		roles.add(authorization)
	}


	override fun equals(other: Any?): Boolean {
		if (this === other) return true
		if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
		other as User

		return id != null && id == other.id
	}

	override fun hashCode(): Int = javaClass.hashCode()
}