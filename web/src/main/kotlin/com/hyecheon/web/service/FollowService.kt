package com.hyecheon.web.service

import com.hyecheon.domain.entity.follow.*
import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.domain.entity.user.User
import com.hyecheon.domain.entity.user.UserRepository
import com.hyecheon.web.dto.follow.FollowInfoDto
import com.hyecheon.web.event.EventMessage
import com.hyecheon.web.event.EventMessage.Kind
import org.springframework.context.ApplicationEventPublisher
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/14
 */
@Service
class FollowService(
	private val followerRepository: FollowerRepository,
	private val followingRepository: FollowingRepository,
	private val followStatusRepository: FollowStatusRepository,
	private val userRepository: UserRepository,
	private val applicationEventPublisher: ApplicationEventPublisher,
) {

	@Transactional
	fun following(userId: Long) = run {
		val loggedToken = AuthToken.getLoggedToken()
		val loggedId = loggedToken.userId!!
		follow(loggedId, userId)
	}

	@Transactional
	fun unFollowing(userId: Long) = run {
		val loggedToken = AuthToken.getLoggedToken()
		val loggedId = loggedToken.userId!!
		unfollow(loggedId, userId)
	}

	private fun follow(fromId: Long, toId: Long) {
		val fromUser = userRepository.getById(fromId)
		val toUser = userRepository.getById(toId)
		if (followingRepository.existsByFromUserAndToUser(fromUser, toUser)) {
			return
		}
		followingRepository.save(Following(fromUser, toUser))
		followerRepository.save(Follower(toUser, fromUser))

		val followStatus =
			followStatusRepository.findById(fromId)
				.orElseGet { followStatusRepository.save(FollowStatus(fromId)) }
		followStatus.followingCnt = followStatus.followingCnt + 1

		val followedStatus =
			followStatusRepository.findById(toId).orElseGet { followStatusRepository.save(FollowStatus(toId)) }
		followedStatus.followerCnt = followedStatus.followerCnt + 1

		applicationEventPublisher.publishEvent(EventMessage(Kind.followStatus,
			FollowInfoDto(followStatus)))
		applicationEventPublisher.publishEvent(EventMessage(Kind.followStatus,
			FollowInfoDto(followedStatus)))
	}

	private fun unfollow(fromId: Long, toId: Long) {

		val fromUser = userRepository.getById(fromId)
		val toUser = userRepository.getById(toId)
		if (!followingRepository.existsByFromUserAndToUser(fromUser, toUser)) {
			return
		}

		followingRepository.deleteByFromUserAndToUser(fromUser, toUser)
		followerRepository.deleteByFromUserAndToUser(toUser, fromUser)


		val followStatus =
			followStatusRepository.findById(fromId)
				.orElseGet { followStatusRepository.save(FollowStatus(fromId)) }
		followStatus.followingCnt = if (followStatus.followingCnt > 0) followStatus.followingCnt - 1 else 0

		val followedStatus =
			followStatusRepository.findById(toId).orElseGet { followStatusRepository.save(FollowStatus(toId)) }
		followedStatus.followerCnt = if (followedStatus.followerCnt > 0) followedStatus.followerCnt - 1 else 0

		applicationEventPublisher.publishEvent(EventMessage(Kind.followStatus,
			FollowInfoDto(followStatus)))
		applicationEventPublisher.publishEvent(EventMessage(Kind.followStatus,
			FollowInfoDto(followedStatus)))
	}

	fun getFollowInfo(user: User) = run {
		val loggedToken = AuthToken.getLoggedToken()
		val loggedId = loggedToken.userId!!
		val followStatus = followStatusRepository.findById(user.id!!).orElseGet { FollowStatus(user.id!!) }
		val fromUser = userRepository.getById(loggedId)
		val isFollowing = followingRepository.existsByFromUserAndToUser(fromUser, user)
		FollowInfoDto(followStatus, isFollowing)
	}

	fun followingByUsername(username: String, id: Long = Long.MAX_VALUE) = run {
		val fromUser = userRepository.findByUsername(username).orElseThrow { UsernameNotFoundException(username) }
		followingRepository.findTop10ByFromUserAndIdLessThanOrderByIdDesc(fromUser, id)
	}

	fun followerByUsername(username: String, id: Long = Long.MAX_VALUE) = run {
		val fromUser = userRepository.findByUsername(username).orElseThrow { UsernameNotFoundException(username) }
		followerRepository.findTop10ByFromUserAndIdLessThanOrderByIdDesc(fromUser, id)
	}
}