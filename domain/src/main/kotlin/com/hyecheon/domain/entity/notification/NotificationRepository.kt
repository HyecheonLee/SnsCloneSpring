package com.hyecheon.domain.entity.notification

import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/10
 */
interface NotificationRepository : JpaRepository<Notification, Long> {

	fun countByCheckedIsFalseAndToUserId(toUserId: Long): Long

	@EntityGraph(attributePaths = ["fromUser"], type = EntityGraph.EntityGraphType.LOAD)
	fun findTop10ByToUserIdAndIdLessThanOrderByIdDesc(toUserId: Long, id: Long): List<Notification>

	fun existsByToUserIdAndFromUserIdAndNotifyTypeAndTargetId(
		userId: Long,
		fromUserId: Long,
		notifyType: NotifyType,
		targetId: Long?,
	): Boolean

}