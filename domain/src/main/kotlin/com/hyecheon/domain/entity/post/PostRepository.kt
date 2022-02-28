package com.hyecheon.domain.entity.post

import org.springframework.data.jpa.repository.JpaRepository

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
interface PostRepository : JpaRepository<Post, Long> {
}