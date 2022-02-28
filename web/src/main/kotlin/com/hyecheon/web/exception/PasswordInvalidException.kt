package com.hyecheon.web.exception

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
class PasswordInvalidException(override val message: String) : RuntimeException(message) {
}