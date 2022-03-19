package com.hyecheon.domain.entity.post

import com.hyecheon.domain.entity.user.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/03
 */
interface PostLikeRepository : JpaRepository<PostLike, Long> {

	fun findAllByUserAndPostIdIn(user: User, postIds: List<Long>): List<PostLike>

	fun existsByUserAndPost(user: User, post: Post): Boolean

	fun deleteByUserAndPost(user: User, post: Post)

	fun deleteByPost(post: Post)

	fun deleteAllByPostIn(posts: Set<Post>)

	@Query(nativeQuery = true,
		value = "delete from post_like where post_id in (select id from posts where id = :id or parent_post_id = :id)")
	fun mDeleteByPostId(id: Long)
}