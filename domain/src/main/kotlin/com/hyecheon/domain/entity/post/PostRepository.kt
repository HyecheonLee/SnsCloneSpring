package com.hyecheon.domain.entity.post

import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
interface PostRepository : JpaRepository<Post, Long> {

	@EntityGraph(attributePaths = ["postedBy", "postedBy.roles"], type = EntityGraph.EntityGraphType.LOAD)
	override fun findAll(): MutableList<Post>

	@EntityGraph(attributePaths = ["postedBy", "postedBy.roles"], type = EntityGraph.EntityGraphType.LOAD)
	override fun findById(id: Long): Optional<Post>
}