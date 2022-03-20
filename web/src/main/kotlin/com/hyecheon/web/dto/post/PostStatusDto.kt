package com.hyecheon.web.dto.post

import com.hyecheon.domain.entity.post.Post

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
data class PostStatusDto(
	var postId: Long? = null,
	var likeCnt: Long = 0,
	var replyCnt: Long = 0,
	var isPin: Boolean = false,
) {
	companion object {
		fun of(post: Post) = run {
			val postStatus = post.postStatus
			PostStatusDto(postId = post.id,
				likeCnt = postStatus?.likeCnt ?: 0,
				replyCnt = postStatus?.replyCnt ?: 0,
				isPin = postStatus?.isPin ?: false
			)
		}
	}
}