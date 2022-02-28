package com.hyecheon.web.service

import com.hyecheon.domain.entity.post.Post
import com.hyecheon.domain.entity.post.PostRepository
import org.springframework.stereotype.Service

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/27
 */
@Service
class PostService(
	private val postRepository: PostRepository,
) {

	fun new(post: Post) = run {
		postRepository.save(post)
	}
}