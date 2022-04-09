package com.hyecheon.web.aop

import com.hyecheon.web.event.EventMessage
import com.hyecheon.web.event.EventMessage.Kind
import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.AfterReturning
import org.aspectj.lang.annotation.Aspect
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter


//@Aspect
//@Component
class EventAop {
	private val log = LoggerFactory.getLogger(this::class.java)

	@AfterReturning(
		pointcut = "execution(* com.hyecheon.web.api.EventApi.*(..))",
		returning = "sseEmitter"
	)
	fun eventConnection(jp: JoinPoint, sseEmitter: Any) {
		if (sseEmitter is SseEmitter) {
			log.info("connection...")
			sseEmitter.send(EventMessage(Kind.connection, "connecting..."))
		}
	}
}