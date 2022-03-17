package com.hyecheon.web.security

import com.hyecheon.web.config.AppProperty
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/17
 */
@Configuration
class WebConfig(
	private val appProperty: AppProperty,
) : WebMvcConfigurer {
	private val log = LoggerFactory.getLogger(this::class.java)
	override fun addCorsMappings(registry: CorsRegistry) {
		log.info("server hosts ${appProperty.server.hosts}")
		registry.addMapping("/**")
			.allowedHeaders("*")
			.allowedMethods("*")
			.allowCredentials(true)
			.allowedOrigins(*appProperty.server.hosts.toTypedArray())
	}
}