package com.hyecheon.web.service

import com.hyecheon.domain.entity.post.PostLike
import com.hyecheon.domain.entity.post.PostLikeRepository
import com.hyecheon.domain.entity.post.PostRepository
import com.hyecheon.domain.entity.user.UserRepository
import com.hyecheon.web.dto.post.PostStatusDto
import com.hyecheon.web.utils.getAuthToken
import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
@Service
class LikeService(
	private val postRepository: PostRepository,
	private val postLikeRepository: PostLikeRepository,
	private val applicationEventPublisher: ApplicationEventPublisher,
	private val userRepository: UserRepository,
) {

	@Transactional
	fun like(postId: Long) {
		val post = postRepository.findById(postId).orElseThrow { RuntimeException("") }
		val loggedUser = loggedUser()
		if (!postLikeRepository.existsByUserAndPost(loggedUser, post)) {
			post.like()
			postLikeRepository.save(PostLike(loggedUser, post))
			applicationEventPublisher.publishEvent(PostStatusDto.of(post))
		}
	}

	@Transactional
	fun unLike(postId: Long) = run {
		val post = postRepository.findById(postId).orElseThrow { RuntimeException("") }
		val loggedUser = loggedUser()
		if (postLikeRepository.existsByUserAndPost(loggedUser, post)) {
			post.unLike()
			postLikeRepository.deleteByUserAndPost(loggedUser, post)
			applicationEventPublisher.publishEvent(PostStatusDto.of(post))
		}
	}

	fun loggedUser() = run {
		val authToken = getAuthToken()
		userRepository.getById(authToken.userId!!)
	}
}