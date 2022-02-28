package com.hyecheon.domain.entity.user

import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
interface UserRepository : JpaRepository<User, Long> {
	fun findByUsername(userName: String): Optional<User>
}