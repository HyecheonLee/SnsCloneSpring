package com.hyecheon.domain.entity

import com.hyecheon.domain.entity.user.User
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.Configuration
import org.springframework.data.domain.AuditorAware
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
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
class EntityConfig : AuditorAware<User> {
	override fun getCurrentAuditor(): Optional<User> {

		val optionalLoggedUser = Optional.ofNullable(SecurityContextHolder.getContext())
			.map { obj: SecurityContext -> obj.authentication }
			.flatMap { authentication ->
				val principal = authentication.principal
				if (principal is User) Optional.of(principal)
				else Optional.empty()
			}
		if (optionalLoggedUser.isEmpty) return Optional.empty()
		return Optional.of(optionalLoggedUser.get())
	}
}