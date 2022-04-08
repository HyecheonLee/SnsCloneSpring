package com.hyecheon.web.aop

import com.hyecheon.web.event.EventMessage
import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.AfterReturning
import org.aspectj.lang.annotation.Aspect
import org.springframework.stereotype.Component
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter


@Aspect
@Component
class EventAop {

    @AfterReturning(
        pointcut = "execution(* com.hyecheon.web.api.EventApi.*(..))",
        returning = "sseEmitter"
    )
    fun eventConnection(jp: JoinPoint, sseEmitter: Any) {
        if (sseEmitter is SseEmitter) {
            sseEmitter.send(EventMessage("connection", "connecting..."))
        }
    }
}