package com.hyecheon.domain.entity.follow

import com.hyecheon.domain.entity.user.User
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.OneToOne

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/14
 */
@Entity
class FollowStatus(
	@Id
	var userId: Long = 0,
) {
	var followingCnt: Long = 0
	var followerCnt: Long = 0
}