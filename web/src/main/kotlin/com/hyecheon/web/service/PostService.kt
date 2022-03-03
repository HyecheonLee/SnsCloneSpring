package com.hyecheon.web.service

import com.hyecheon.domain.entity.post.Post
import com.hyecheon.domain.entity.post.PostLike
import com.hyecheon.domain.entity.post.PostLikeRepository
import com.hyecheon.domain.entity.post.PostRepository
import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.domain.entity.user.UserRepository
import com.hyecheon.domain.exception.LoggedNotException
import org.springframework.data.domain.Pageable
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
	private val userRepository: UserRepository,
	private val postLikeRepository: PostLikeRepository,
) {

	fun findAll(pageable: Pageable) = run {
		val pagePost = postRepository.findAll(pageable)
		val loggedUser = loggedUser()
		val postIds = pagePost.content.map { post -> post.id }.filterNotNull()
		val postLike = postLikeRepository.findAllByUserAndPostIdIn(loggedUser, postIds)
		pagePost.map { post ->
			if (postLike.any { postLike -> post.id == postLike.post.id }) {
				post.userLike = true
			}
			post
		}
	}

	fun new(post: Post) = run {
		val newSavedPost = postRepository.save(post)
		newSavedPost.id!!
	}

	fun findById(id: Long) = run {
		postRepository.findById(id).orElseThrow { RuntimeException("") }
	}

	@Transactional
	fun like(postId: Long) {
		val post = postRepository.findById(postId).orElseThrow { RuntimeException("") }
		val loggedUser = loggedUser()
		if (!postLikeRepository.existsByUserAndPost(loggedUser, post)) {
			post.postLike()
			postLikeRepository.save(PostLike(loggedUser, post))
		}
	}

	@Transactional
	fun unLike(postId: Long) = run {
		val post = postRepository.findById(postId).orElseThrow { RuntimeException("") }
		val loggedUser = loggedUser()
		if (postLikeRepository.existsByUserAndPost(loggedUser, post)) {
			post.postUnLike()
			postLikeRepository.deleteByUserAndPost(loggedUser, post)
		}
	}

	fun loggedUser() = run {
		val optionalAuthToken = AuthToken.loggedToken()
		if (!optionalAuthToken.isPresent) {
			throw LoggedNotException("로그인을 해주세요")
		}
		val authToken = optionalAuthToken.get()
		userRepository.getById(authToken.userId!!)
	}
}