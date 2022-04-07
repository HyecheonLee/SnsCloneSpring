package com.hyecheon.web.service

import com.hyecheon.web.dto.post.PostRespDto
import com.hyecheon.web.dto.post.PostStatusDto
import com.hyecheon.web.dto.web.EventDto
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

	companion object {
		const val SSE_SESSION_TIMEOUT: Long = 30 * 60 * 1000L
	}

	val notifySet: MutableSet<SseEmitter> = CopyOnWriteArraySet()

	fun getNotifyEmitter(type: String) = run {
		val emitter = SseEmitter(SSE_SESSION_TIMEOUT)
		notifySet.add(emitter)

		emitter.onTimeout {
			notifySet.remove(emitter)
			emitter.complete()
		}
		emitter.onCompletion {
			notifySet.remove(emitter)
			emitter.complete()
		}

		emitter
	}

	@Async
	@EventListener
	fun onPostEvent(post: PostRespDto.Model) = run {
		log.info("post event : {}", post)
		onNotifyEvent(EventDto("post", post))
	}

	@Async
	@EventListener
	fun onStatusEvent(postStatus: PostStatusDto) = run {
		log.info("post status event : {}", postStatus)
		onNotifyEvent(EventDto("postStatus", postStatus))
	}

	@Async
	@EventListener
	fun <T> onNotifyEvent(notify: EventDto<T>) = run {
		log.info("notify event : {}", notify.type)
		notifySet.forEach { eventSend(it, notify) }
	}

	private fun <T> eventSend(emitter: SseEmitter, notify: EventDto<T>) {
		try {
			emitter.send(notify)
		} catch (e: Exception) {
			log.error("send error ${e.message}", e)
			notifySet.remove(emitter);
		}
	}
}