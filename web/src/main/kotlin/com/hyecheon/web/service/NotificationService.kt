package com.hyecheon.web.service

import com.hyecheon.domain.entity.notification.NotificationRepository
import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.domain.entity.user.UserRepository
import com.hyecheon.web.dto.notification.NotificationDto
import com.hyecheon.web.event.EventMessage
import com.hyecheon.web.exception.IdNotExistsException
import com.hyecheon.web.utils.getAuthToken
import com.hyecheon.web.utils.makeUserEventKey
import org.springframework.context.ApplicationEventPublisher
import org.springframework.context.event.EventListener
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/10
 */
@Transactional
@Service
class NotificationService(
	private val notificationRepository: NotificationRepository,
	private val userRepository: UserRepository,
	private val applicationEventPublisher: ApplicationEventPublisher,
) {

	@Async
	@Transactional
	@EventListener
	fun onNotificationEvent(new: NotificationDto.New) = run {
		val exists = notificationRepository
			.existsByToUserIdAndFromUserIdAndNotifyTypeAndKeyId(
				new.toUserId,
				new.fromUserId,
				new.notifyType,
				new.keyId
			)

		if (exists) return@run

		val user = userRepository.findById(new.fromUserId).orElseThrow { IdNotExistsException("사용자 아이디 오류") }
		val savedEntity = notificationRepository.save(new.toEntity().apply { fromUser = user })

		applicationEventPublisher.publishEvent(EventMessage(EventMessage.Kind.notify,
			NotificationDto.toModel(savedEntity),
			makeUserEventKey(new.toUserId)
		))

	}

	fun checked(id: Long): Boolean {
		val optionalNotification = notificationRepository.findById(id)
		if (optionalNotification.isPresent) {
			val notification = optionalNotification.get()
			notification.checked = true
			return true
		}
		return false
	}

	fun checkedAll(): Int {
		val authToken = AuthToken.getLoggedToken()
		return notificationRepository.updateAllChecked(authToken.userId!!)
	}

	fun unCheckedCount(): Long {
		val (userId, _, _) = getAuthToken()
		return notificationRepository.countByCheckedIsFalseAndToUserId(userId!!)
	}

	fun findAll(lastId: Long) = run {
		val authToken = getAuthToken()
		notificationRepository.findTop10ByToUserIdAndIdLessThanOrderByIdDesc(authToken.userId!!,
			lastId)
	}
}