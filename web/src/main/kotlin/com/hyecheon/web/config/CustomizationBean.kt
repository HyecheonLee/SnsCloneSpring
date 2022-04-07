package com.hyecheon.web.config

import io.undertow.server.DefaultByteBufferPool
import io.undertow.websockets.jsr.WebSocketDeploymentInfo
import org.springframework.boot.web.embedded.undertow.UndertowServletWebServerFactory
import org.springframework.boot.web.server.WebServerFactoryCustomizer
import org.springframework.stereotype.Component

@Component
class CustomizationBean : WebServerFactoryCustomizer<UndertowServletWebServerFactory> {
    override fun customize(factory: UndertowServletWebServerFactory) {
        factory.addDeploymentInfoCustomizers({
            it.addServletContextAttribute(
                "io.undertow.websockets.jsr.WebSocketDeploymentInfo",
                WebSocketDeploymentInfo().apply { buffers = DefaultByteBufferPool(false, 1024) }
            )
        })
    }
}