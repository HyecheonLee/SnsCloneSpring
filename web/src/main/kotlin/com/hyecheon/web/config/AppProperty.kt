package com.hyecheon.web.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Configuration

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */

@Configuration
@EnableConfigurationProperties(value = [AppProperty.Server::class, AppProperty.Jwt::class])
class AppProperty {

	@Autowired
	lateinit var server: Server

	@Autowired
	lateinit var jwt: Jwt

	@ConfigurationProperties("app.server")
	class Server {
		var scheme: String = "http"
		var domain: String = "local"
		var hosts: List<String> = listOf("http://localhost:3000")
	}

	@ConfigurationProperties("app.jwt")
	class Jwt {
		var secret: String = "antte"
		var maxAge: Long = 60602430
	}
}