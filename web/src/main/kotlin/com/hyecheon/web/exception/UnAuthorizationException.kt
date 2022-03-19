package com.hyecheon.web.exception

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/19
 */
class UnAuthorizationException(override val message: String) : RuntimeException(message)