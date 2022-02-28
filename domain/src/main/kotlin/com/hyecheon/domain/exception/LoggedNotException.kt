package com.hyecheon.domain.exception

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
class LoggedNotException(override val message: String) : RuntimeException(message) {
}