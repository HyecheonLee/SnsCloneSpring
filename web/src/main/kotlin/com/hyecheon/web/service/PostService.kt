package com.hyecheon.web.service

import com.hyecheon.domain.entity.follow.FollowingRepository
import com.hyecheon.domain.entity.notification.NotifyType
import com.hyecheon.domain.entity.post.*
import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.domain.entity.user.UserRepository
import com.hyecheon.web.dto.notification.NotificationDto
import com.hyecheon.web.dto.post.PostRespDto
import com.hyecheon.web.event.EventMessage
import com.hyecheon.web.event.EventMessage.Kind
import com.hyecheon.web.exception.IdNotExistsException
import com.hyecheon.web.exception.UnAuthorizationException
import com.hyecheon.web.utils.getAuthToken
import org.springframework.context.ApplicationEventPublisher
import org.springframework.security.core.userdetails.UsernameNotFoundException
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
	private val postLikeRepository: PostLikeRepository,
	private val userFollowingRepository: FollowingRepository,
	private val userRepository: UserRepository,
	private val applicationEventPublisher: ApplicationEventPublisher,
) {

	fun findAll(postId: Long) = run {
		val posts = postRepository.findTop10ByIsReplyIsFalseAndIdLessThanOrderByIdDesc(postId)
		setPostLike(posts)
		posts
	}

	fun findAllPostByPostedBy(username: String, postId: Long) = run {
		val postedBy = userRepository.findByUsername(username).orElseThrow { UsernameNotFoundException("") }
		val posts = postRepository.findTop10ByPostedByAndIsReplyIsFalseAndIdLessThanOrderByIdDesc(postedBy, postId)
		setPostLike(posts)
		posts
	}

	fun findAllRepliesByPostedBy(username: String, postId: Long) = run {
		val postedBy = userRepository.findByUsername(username).orElseThrow { UsernameNotFoundException("") }
		val posts =
			postRepository.findTop10ByPostedByAndIsReplyIsTrueAndIdLessThanOrderByIdDesc(postedBy, postId)
		setPostLike(posts)
		posts
	}


	fun findAllByParentId(parentPostId: Long, postId: Long) = run {
		val parentPost = postRepository.getById(parentPostId)
		val posts = postRepository.findTop10ByParentPostAndIdLessThanOrderByIdDesc(parentPost, postId)
		setPostLike(posts)
		posts
	}

	private fun setPostLike(posts: List<Post>) {
		val loggedUser = loggedUser()
		val postIds = posts.mapNotNull { post -> post.id }
		val postLike = postLikeRepository.findAllByUserAndPostIdIn(loggedUser, postIds)
		posts.forEach { post ->
			if (postLike.any { postLike -> post.id == postLike.post.id }) {
				post.userLike = true
			}
		}
	}

	@Transactional
	fun new(post: Post) = run {
		val newSavedPost = postRepository.save(post)
		newSavedPost.postStatus = PostStatus(newSavedPost)

		val postedBy = loggedUser()
		newSavedPost.postedBy = postedBy

		applicationEventPublisher.publishEvent(EventMessage(Kind.newPost, PostRespDto.of(newSavedPost)))

		if (!post.isReply) {
			val followedUsers = userFollowingRepository.findAllByToUserId(loggedUser().id!!)

			followedUsers.forEach {
				applicationEventPublisher.publishEvent(NotificationDto.New(
					fromUserId = loggedUser().id!!,
					toUserId = it.fromUser.id!!,
					notifyType = NotifyType.NEW_POST,
					keyId = newSavedPost.id,
					targetId = newSavedPost.id
				))
			}
		}

		newSavedPost.id!!
	}

	fun findById(id: Long) = run {
		postRepository.findById(id).orElseThrow { IdNotExistsException("id[${id}] not exists") }
	}

	@Transactional
	fun deleteById(id: Long) {
		val post = postRepository.findById(id).orElseThrow { IdNotExistsException("id[${id}] not exists") }
		val authToken = AuthToken.getLoggedToken()

		if (post.postedBy?.id != authToken.userId) {
			throw UnAuthorizationException("????????? ????????????.")
		}

		postLikeRepository.deleteByPost(post)

		if (post.isReply) {
			post.parentPost?.unReply()
		}
		postRepository.mUpdateParentPostNull(id)
		postRepository.deleteById(id)

		applicationEventPublisher.publishEvent(EventMessage(Kind.deletePost, id))
	}

	@Transactional
	fun reply(postId: Long, reply: Post) = run {
		reply.isReply = true
		new(reply)
		val post = postRepository.findById(postId).orElseThrow { IdNotExistsException("post id not exists") }
		post.reply(reply)

		applicationEventPublisher.publishEvent(EventMessage(Kind.updatedPost, PostRespDto.of(post)))

		/*notify*/
		applicationEventPublisher.publishEvent(NotificationDto.New(
			fromUserId = loggedUser().id!!,
			toUserId = post.postedBy?.id!!,
			notifyType = NotifyType.REPLY,
			keyId = reply.id,
			targetId = postId
		))

		reply.id!!
	}

	@Transactional
	fun like(postId: Long) {
		val post = postRepository.findById(postId).orElseThrow { RuntimeException("") }
		val loggedUser = loggedUser()
		if (!postLikeRepository.existsByUserAndPost(loggedUser, post)) {
			post.like()
			postLikeRepository.save(PostLike(loggedUser, post))
			applicationEventPublisher.publishEvent(EventMessage(Kind.updatedPost, PostRespDto.of(post)))

			/*notify*/
			applicationEventPublisher.publishEvent(NotificationDto.New(
				fromUserId = loggedUser.id!!,
				toUserId = post.postedBy?.id!!,
				notifyType = NotifyType.LIKE,
				keyId = postId,
				targetId = postId
			))
		}
	}

	@Transactional
	fun unLike(postId: Long) = run {
		val post = postRepository.findById(postId).orElseThrow { RuntimeException("") }
		val loggedUser = loggedUser()
		if (postLikeRepository.existsByUserAndPost(loggedUser, post)) {
			post.unLike()
			postLikeRepository.deleteByUserAndPost(loggedUser, post)
			applicationEventPublisher.publishEvent(EventMessage(Kind.updatedPost, PostRespDto.of(post)))
		}
	}

	fun loggedUser() = run {
		val authToken = getAuthToken()
		userRepository.getById(authToken.userId!!)
	}

	@Transactional
	fun pin(id: Long) {
		val post = postRepository.findById(id).orElseThrow { IdNotExistsException("$id") }
		post.pin()
		applicationEventPublisher.publishEvent(EventMessage(Kind.updatedPost, PostRespDto.of(post)))
	}

	@Transactional
	fun unPin(id: Long) {
		val post = postRepository.findById(id).orElseThrow { IdNotExistsException("$id") }
		post.unPin()
		applicationEventPublisher.publishEvent(EventMessage(Kind.updatedPost, PostRespDto.of(post)))
	}

	fun searchPost(keyword: String, lastId: Long): List<Post> {
		val posts =
			postRepository.findTop10ByContentContainsAndIdIsLessThanOrderByIdDesc(keyword, lastId)
		setPostLike(posts)
		return posts
	}
}