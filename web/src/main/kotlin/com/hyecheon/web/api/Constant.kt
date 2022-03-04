package com.hyecheon.web.api

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
object Constant {
	const val API_V1 = "/api/v1"

	const val USER = "users"
	const val USER_API = "${API_V1}/${USER}"


	const val POST = "posts"
	const val POST_API = "${API_V1}/${POST}"

	const val NOTIFY = "notify"
	const val NOTIFY_API = "${API_V1}/${NOTIFY}"
}