package com.hyecheon.domain.entity.follow

import com.hyecheon.domain.entity.user.User
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/14
 */
interface FollowerRepository : JpaRepository<Follower, Long> {

	@EntityGraph(attributePaths = ["toUser"], type = EntityGraph.EntityGraphType.LOAD)
	fun findTop10ByFromUserAndIdLessThanOrderByIdDesc(fromUser: User, id: Long): List<Follower>
}