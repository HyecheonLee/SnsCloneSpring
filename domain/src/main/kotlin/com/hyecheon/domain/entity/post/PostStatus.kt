package com.hyecheon.domain.entity.post

import com.hyecheon.domain.entity.BaseEntity
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToOne

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
@Entity
class PostStatus(
	@JoinColumn(name = "post_id")
	@OneToOne
	val post: Post,
) : BaseEntity() {

	var likeCnt: Long = 0

	var replyCnt: Long = 0

	fun like() = run {
		likeCnt++
		likeCnt
	}

	fun unLike() = run {
		if (likeCnt >= 1) {
			likeCnt--
		}
		likeCnt
	}

	fun reply() {
		replyCnt++
		replyCnt
	}

	fun unReply() {
		if (replyCnt >= 1) {
			replyCnt--
		}
		replyCnt
	}
}