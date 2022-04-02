package com.hyecheon.domain.entity.chat

import org.springframework.data.jpa.repository.JpaRepository

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
interface ChatRepository : JpaRepository<ChatRoom, Long> {
}