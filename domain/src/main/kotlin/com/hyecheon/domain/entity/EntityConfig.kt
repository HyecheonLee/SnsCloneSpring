package com.hyecheon.domain.entity

import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.domain.entity.user.User
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.Configuration
import org.springframework.data.domain.AuditorAware
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import java.util.*


/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
@Configuration
@EnableJpaAuditing
@EntityScan("com.hyecheon.domain.entity")
@EnableJpaRepositories("com.hyecheon.domain.entity")
class EntityConfig() : AuditorAware<String> {

	override fun getCurrentAuditor(): Optional<String> {
		val optionalAuthToken = AuthToken.loggedToken()
		if (optionalAuthToken.isPresent) {
			val authToken = optionalAuthToken.get()
			return authToken.username?.let { Optional.of(it) } ?: Optional.empty()
		}
		return Optional.empty()
	}
}