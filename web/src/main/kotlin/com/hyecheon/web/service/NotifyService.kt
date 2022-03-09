package com.hyecheon.web.service

import com.hyecheon.web.api.NotifyApi
import com.hyecheon.web.dto.post.PostRespDto
import com.hyecheon.web.dto.post.PostStatusDto
import com.hyecheon.web.dto.web.NotifyDto
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

	val emitterSet: MutableSet<SseEmitter> = CopyOnWriteArraySet()

	fun getEmitter(type: String) = run {
		val emitter = SseEmitter(NotifyApi.SSE_SESSION_TIMEOUT)
		emitterSet.add(emitter)

		emitter.onTimeout {
			emitterSet.remove(emitter)
			emitter.complete()
		}
		emitter.onCompletion {
			emitterSet.remove(emitter)
			emitter.complete()
		}

		emitter
	}

	@Async
	@EventListener
	fun onPostEvent(post: PostRespDto.Model) = run {
		log.info("post event : {}", post)
		val notify = NotifyDto("post", post)
		emitterSet.forEach {
			try {
				it.send(notify)
			} catch (e: Exception) {
				log.error("send error ${e.message}")
			}
		}
	}

	@Async
	@EventListener
	fun onStatusEvent(postStatus: PostStatusDto) = run {
		log.info("post status event : {}", postStatus)
		val notify = NotifyDto("postStatus", postStatus)
		emitterSet.forEach {
			try {
				it.send(notify)
			} catch (e: Exception) {
				log.error("send error ${e.message}")
			}
		}
	}
}