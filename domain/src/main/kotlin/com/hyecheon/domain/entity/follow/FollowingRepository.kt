package com.hyecheon.domain.entity.follow

import com.hyecheon.domain.entity.user.User
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/14
 */
interface FollowingRepository : JpaRepository<Following, Long> {

	fun deleteByFromUserAndToUser(toUser: User, fromUser: User)

	fun existsByFromUserAndToUser(fromUser: User, toUser: User): Boolean

	@EntityGraph(attributePaths = ["toUser"], type = EntityGraph.EntityGraphType.LOAD)
	fun findTop10ByFromUserAndIdLessThanOrderByIdDesc(fromUser: User, id: Long): List<Following>

	fun findAllByToUserId(toUserId: Long): List<Following>
}