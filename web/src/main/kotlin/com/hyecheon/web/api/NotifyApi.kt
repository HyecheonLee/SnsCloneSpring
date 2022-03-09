package com.hyecheon.web.api

import com.hyecheon.web.api.Constant.NOTIFY_API
import com.hyecheon.web.service.NotifyService
import org.springframework.context.event.EventListener
import org.springframework.http.MediaType
import org.springframework.scheduling.annotation.Async
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import java.util.concurrent.CopyOnWriteArraySet

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/04
 */
@RestController
@RequestMapping(NOTIFY_API)
class NotifyApi(
	private val notifyService: NotifyService,
) {
	@GetMapping(value = ["/{type}"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
	fun notice(@PathVariable type: String) = run {
		notifyService.getEmitter("post")
	}
}