package com.hyecheon.domain.entity.reply

import com.hyecheon.domain.entity.post.Post
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
interface ReplyRepository : JpaRepository<Reply, Long> {

	fun findTop10ByPostAndIdLessThanOrderByIdDesc(post: Post, id: Long): List<Reply>
}