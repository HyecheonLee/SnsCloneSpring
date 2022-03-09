package com.hyecheon.domain.entity.reply

import com.hyecheon.domain.entity.BaseEntity
import com.hyecheon.domain.entity.post.Post
import javax.persistence.Entity
import javax.persistence.ManyToOne

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
@Entity
class Reply(
	@ManyToOne
	val post: Post,
) : BaseEntity() {


}