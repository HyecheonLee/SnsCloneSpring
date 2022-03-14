package com.hyecheon.domain.entity.follow

import org.springframework.data.jpa.repository.JpaRepository

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/14
 */
interface FollowStatusRepository : JpaRepository<FollowStatus, Long> {
}