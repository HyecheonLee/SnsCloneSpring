package com.hyecheon.domain.entity.reply

import com.hyecheon.domain.entity.BaseEntity
import com.hyecheon.domain.entity.post.Post
import com.hyecheon.domain.entity.user.User
import org.springframework.data.annotation.CreatedBy
import javax.persistence.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
@Entity
class Reply(
	@Lob
	var content: String,

	) : BaseEntity() {

	@CreatedBy
	var createdBy: String? = null

	@ManyToOne
	lateinit var post: Post
}