package com.hyecheon.web.exception

import java.lang.RuntimeException

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/01
 */
class IdNotExistsException(override val message: String?) : RuntimeException(message) {
}