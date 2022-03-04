package com.hyecheon.web.service

import com.hyecheon.domain.entity.post.Post
import com.hyecheon.domain.entity.post.PostLike
import com.hyecheon.domain.entity.post.PostLikeRepository
import com.hyecheon.domain.entity.post.PostRepository
import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.domain.entity.user.UserRepository
import com.hyecheon.domain.exception.LoggedNotException
import com.hyecheon.web.dto.post.PostRespDto
import com.hyecheon.web.event.PostEvent
import com.hyecheon.web.utils.getAuthToken
import org.springframework.context.ApplicationEventPublisher
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
	private val applicationEventPublisher: ApplicationEventPublisher,
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
		val postedBy = loggedUser()
		newSavedPost.postedBy = postedBy
		applicationEventPublisher.publishEvent(PostRespDto.Model.of(newSavedPost))
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
		val authToken = getAuthToken()
		userRepository.getById(authToken.userId!!)
	}
}