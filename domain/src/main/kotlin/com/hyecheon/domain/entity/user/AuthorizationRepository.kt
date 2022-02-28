package com.hyecheon.domain.entity.user

import org.springframework.data.jpa.repository.JpaRepository

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/27
 */
interface AuthorizationRepository : JpaRepository<Authorization, Long> {
	fun findByRole(role: String): Authorization?
}