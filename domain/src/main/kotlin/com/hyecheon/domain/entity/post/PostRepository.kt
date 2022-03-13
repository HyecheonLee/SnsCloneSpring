package com.hyecheon.domain.entity.post

import com.hyecheon.domain.entity.user.User
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import java.util.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
interface PostRepository : JpaRepository<Post, Long> {

	@EntityGraph(attributePaths = ["postedBy", "postedBy.roles"], type = EntityGraph.EntityGraphType.LOAD)
	override fun findAll(): MutableList<Post>

	@EntityGraph(attributePaths = ["postedBy"], type = EntityGraph.EntityGraphType.LOAD)
	fun findTop10ByParentPostIsNullAndIdLessThanOrderByIdDesc(id: Long): List<Post>

	@EntityGraph(attributePaths = ["postedBy"], type = EntityGraph.EntityGraphType.LOAD)
	fun findTop10ByPostedByAndParentPostIsNullAndIdLessThanOrderByIdDesc(postedBy: User, id: Long): List<Post>

	@EntityGraph(attributePaths = ["postedBy"], type = EntityGraph.EntityGraphType.LOAD)
	fun findTop10ByParentPostAndIdLessThanOrderByIdDesc(parentPost: Post, id: Long): List<Post>

	@EntityGraph(attributePaths = ["postedBy"], type = EntityGraph.EntityGraphType.LOAD)
	fun findTop10ByPostedByAndParentPostIsNotNullAndIdLessThanOrderByIdDesc(postedBy: User, id: Long): List<Post>


	@EntityGraph(attributePaths = ["postedBy"], type = EntityGraph.EntityGraphType.LOAD)
	override fun findById(id: Long): Optional<Post>

	@Modifying
	@Query("insert into post_like(user_id,post_id) values (:userId , :postId)", nativeQuery = true)
	fun mPostLike(userId: Long, postId: Long)

	@Modifying
	@Query("delete from post_like where user_id = :userId and post_id = :postId", nativeQuery = true)
	fun mPostUnLike(userId: Long, postId: Long)
}