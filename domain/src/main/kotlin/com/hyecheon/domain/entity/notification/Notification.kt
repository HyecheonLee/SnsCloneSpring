package com.hyecheon.domain.entity.notification

import com.hyecheon.domain.entity.BaseEntity
import com.hyecheon.domain.entity.user.User
import javax.persistence.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/10
 */
@Entity
class Notification(

	@Column(name = "from_user_id")
	var fromUserId: Long? = null,

	var toUserId: Long? = null,

	@Enumerated(EnumType.STRING)
	var notifyType: NotifyType? = null,

	var checked: Boolean = false,

	var targetId: Long? = null,

	) : BaseEntity() {

	@ManyToOne
	@JoinColumn(name = "from_user_id", updatable = false, insertable = false)
	var fromUser: User? = null

}