package com.hyecheon.domain.entity.post

import com.hyecheon.domain.entity.user.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
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
}