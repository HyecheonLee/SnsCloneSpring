package com.hyecheon.web.api

import com.hyecheon.web.dto.post.PostReqDto
import com.hyecheon.web.dto.post.PostRespDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.PostService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

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

	@GetMapping
	fun get() = run {
		val posts = postService.findAll()

		val data = posts.map { PostRespDto.Model.of(it) }
		println(data)
		ResponseEntity.ok(
			ResponseDto(data = data)
		)
	}

	@PostMapping
	fun create(@RequestBody post: PostReqDto.New) = run {
		val newPostId = postService.new(post.toEntity())
		val model = PostRespDto.Model.of(postService.findById(newPostId))
		ResponseEntity.ok(
			ResponseDto(data = model)
		)
	}
}