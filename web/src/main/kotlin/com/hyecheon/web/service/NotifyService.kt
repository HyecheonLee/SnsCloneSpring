package com.hyecheon.web.service

import com.hyecheon.web.api.NotifyApi
import com.hyecheon.web.dto.post.PostRespDto
import com.hyecheon.web.event.PostEvent
import com.hyecheon.web.utils.getAuthToken
import io.undertow.util.CopyOnWriteMap
import org.slf4j.LoggerFactory
import org.springframework.context.event.EventListener
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import java.util.concurrent.CopyOnWriteArraySet

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/04
 */
@Service
class NotifyService {
	private val log = LoggerFactory.getLogger(this::class.java)
	val emitterMap: MutableMap<String, SseEmitter> = CopyOnWriteMap()

	fun getEmitter(type: String) = run {
		val authToken = getAuthToken()

		if (emitterMap.containsKey(authToken.username)) {
			log.info("이미 생성된 emitter 삭제");
			emitterMap[authToken.username]?.complete()
			emitterMap.remove(authToken.username)
		}

		val emitter = SseEmitter(NotifyApi.SSE_SESSION_TIMEOUT)

		emitterMap[authToken.username!!] = emitter

		emitter.onTimeout {
			emitterMap.remove(authToken.username)
			emitter.complete()
		}
		emitter.onCompletion {
			emitterMap.remove(authToken.username)
			emitter.complete()
		}

		emitter
	}

	@Async
	@EventListener
	fun onPostEvent(postEvent: PostRespDto.Model) = run {
		log.info("post event : {}", postEvent)
		emitterMap.values.forEach {
			try {
				it.send(postEvent)
			} catch (e: Exception) {
				log.error("send error ${e.message}")
			}
		}
	}
}