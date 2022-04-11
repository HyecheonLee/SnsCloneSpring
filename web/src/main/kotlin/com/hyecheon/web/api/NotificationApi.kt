package com.hyecheon.web.api

import com.hyecheon.web.dto.notification.NotificationDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.NotificationService
import org.springframework.web.bind.annotation.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/10
 */
@RequestMapping(Constant.NOTIFY_V1_API)
@RestController
class NotificationApi(
	private val notificationService: NotificationService,
) {

	@GetMapping("/count")
	fun getNotifies() = run {
		val count = notificationService.unCheckedCount()
		ResponseDto(data = count)
	}

	@GetMapping
	fun getNotifies(@RequestParam lastId: Long = Long.MAX_VALUE) = run {
		val notifications = notificationService.findAll(lastId)
		ResponseDto(data = notifications.map(NotificationDto::toModel))
	}


	@PutMapping("/{id}")
	fun checked(@PathVariable id: Long) = run {
		val result = notificationService.checked(id)
		ResponseDto(data = result)
	}

	@PutMapping("/all")
	fun checked() = run {
		val result = notificationService.checkedAll()
		ResponseDto(data = result)
	}
}