package com.hyecheon.web.api

import com.hyecheon.web.dto.post.PostReqDto
import com.hyecheon.web.dto.post.PostRespDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.PostService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/27
 */
@RestController
@RequestMapping(Constant.POST_API)
class PostApi(
	private val postService: PostService,
) {

	@GetMapping()
	fun get() = run {
		ResponseEntity.ok(
			ResponseDto(data = "hello")
		)
	}

	@PostMapping
	fun create(post: PostReqDto.New) = run {
		val newPost = postService.new(post.toEntity())
		ResponseEntity.ok(
			ResponseDto(data = PostRespDto.Model.of(newPost))
		)
	}
}