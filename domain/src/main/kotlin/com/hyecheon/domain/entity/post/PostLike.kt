package com.hyecheon.domain.entity.post

import com.hyecheon.domain.entity.BaseEntity
import com.hyecheon.domain.entity.user.User
import javax.persistence.Entity
import javax.persistence.ManyToOne

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/03
 */
@Entity
class PostLike(
	@ManyToOne
	var user: User,

	@ManyToOne
	var post: Post,

	) : BaseEntity()