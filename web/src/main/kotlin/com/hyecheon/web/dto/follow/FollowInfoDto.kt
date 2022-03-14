package com.hyecheon.web.dto.follow

import com.hyecheon.domain.entity.follow.FollowStatus

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/15
 */
data class FollowInfoDto(val followStatus: FollowStatus, val isFollowing: Boolean? = null) {
	val userId = followStatus.userId
}