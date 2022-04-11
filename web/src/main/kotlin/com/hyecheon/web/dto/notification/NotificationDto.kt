package com.hyecheon.web.dto.notification

import com.hyecheon.domain.entity.notification.Notification
import com.hyecheon.domain.entity.notification.NotifyType
import com.hyecheon.web.dto.user.UserRespDto
import java.time.LocalDateTime

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/10
 */
object NotificationDto {
	data class Model(
		var id: Long? = null,
		var fromUser: UserRespDto.SimpleModel? = null,
		var toUserId: Long? = null,
		var notifyType: NotifyType? = null,
		var keyId: Long? = null,
		var checked: Boolean = false,
		var targetId: Long?,
		var createdAt: LocalDateTime? = null,
		var updatedAt: LocalDateTime? = null,
	)

	data class New(
		var fromUserId: Long,
		var toUserId: Long,
		var notifyType: NotifyType,
		var keyId: Long?,
		var targetId: Long?,
	) {
		fun toEntity() = run {
			Notification(
				fromUserId = fromUserId,
				toUserId = toUserId,
				notifyType = notifyType,
				targetId = targetId,
			)
		}
	}

	fun toModel(entity: Notification) = run {
		NotificationConverter.converter.toModel(entity)
	}
}