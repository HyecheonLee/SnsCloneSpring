package com.hyecheon.web.exception

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/28
 */
class LoginException(override val message: String?) : RuntimeException(message) {
}