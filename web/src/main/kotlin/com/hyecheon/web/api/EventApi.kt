package com.hyecheon.web.api

import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.web.aop.ChatRoomAuth
import com.hyecheon.web.api.Constant.EVENT_V1_API
import com.hyecheon.web.event.SseEvent
import com.hyecheon.web.service.EventService
import com.hyecheon.web.utils.makeChatEventKey
import com.hyecheon.web.utils.makeUserEventKey
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/04
 */
@RestController
@RequestMapping(EVENT_V1_API)
class EventApi(
	private val eventService: EventService,
) {

	@GetMapping(produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
	fun notify() = run {
		val authToken = AuthToken.getLoggedToken()
		eventService.createSseEmitter(SseEvent.EventType.Notify, makeUserEventKey(authToken.userId!!))
	}

	@GetMapping(value = ["/user"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
	fun userEvent() = run {
		val authToken = AuthToken.getLoggedToken()
		eventService.createSseEmitter(SseEvent.EventType.User, makeUserEventKey(authToken.userId!!))
	}

	@ChatRoomAuth("chatRoomId")
	@GetMapping(value = ["/chat/{chatRoomId}"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
	fun chatEvent(@PathVariable chatRoomId: Long) = run {
		eventService.createSseEmitter(SseEvent.EventType.Chat, makeChatEventKey(chatRoomId))
	}


}