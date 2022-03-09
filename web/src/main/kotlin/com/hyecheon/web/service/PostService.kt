package com.hyecheon.web.service

import com.hyecheon.domain.entity.post.Post
import com.hyecheon.domain.entity.post.PostLikeRepository
import com.hyecheon.domain.entity.post.PostRepository
import com.hyecheon.domain.entity.post.PostStatus
import com.hyecheon.domain.entity.user.UserRepository
import com.hyecheon.web.dto.post.PostRespDto
import com.hyecheon.web.utils.getAuthToken
import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/27
 */
@Transactional(readOnly = true)
@Service
class PostService(
	private val postRepository: PostRepository,
	private val userRepository: UserRepository,
	private val postLikeRepository: PostLikeRepository,
	private val applicationEventPublisher: ApplicationEventPublisher,
) {

	fun findAll(postId: Long) = run {
		val pagePost = postRepository.findTop10ByIdLessThanOrderByIdDesc(postId)
		val loggedUser = loggedUser()
		val postIds = pagePost.mapNotNull { post -> post.id }
		val postLike = postLikeRepository.findAllByUserAndPostIdIn(loggedUser, postIds)
		pagePost.forEach { post ->
			if (postLike.any { postLike -> post.id == postLike.post.id }) {
				post.userLike = true
			}
		}
		pagePost
	}

	@Transactional
	fun new(post: Post) = run {
		val newSavedPost = postRepository.save(post)
		newSavedPost.postStatus = PostStatus(newSavedPost)

		val postedBy = loggedUser()
		newSavedPost.postedBy = postedBy
		applicationEventPublisher.publishEvent(PostRespDto.of(newSavedPost))
		newSavedPost.id!!
	}

	fun findById(id: Long) = run {
		postRepository.findById(id).orElseThrow { RuntimeException("") }
	}

	fun loggedUser() = run {
		val authToken = getAuthToken()
		userRepository.getById(authToken.userId!!)
	}
}