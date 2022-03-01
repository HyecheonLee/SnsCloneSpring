package com.hyecheon.web.service

import com.hyecheon.domain.entity.post.Post
import com.hyecheon.domain.entity.post.PostRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/27
 */
@Transactional
@Service
class PostService(
	private val postRepository: PostRepository,
) {
	fun findAll() = run {
		postRepository.findAll()
	}

	fun new(post: Post) = run {
		val newSavedPost = postRepository.save(post)
		newSavedPost.id!!
	}

	fun findById(id: Long) = run {
		postRepository.findById(id).orElseThrow { RuntimeException("") }
	}
}