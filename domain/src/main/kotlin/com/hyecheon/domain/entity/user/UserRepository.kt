package com.hyecheon.domain.entity.user

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
interface UserRepository : JpaRepository<User, Long> {
	fun findByUsername(username: String): Optional<User>

	fun findTop10ByUsernameLikeAndIdIsLessThanOrderByIdDesc(username: String, id: Long): List<User>
	fun findTop10ByUsernameContainsAndIdIsLessThanOrderByIdDesc(username: String, id: Long): List<User>
}