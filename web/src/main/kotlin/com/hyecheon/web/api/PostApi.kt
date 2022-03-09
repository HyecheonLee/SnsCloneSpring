package com.hyecheon.web.api

import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.domain.exception.LoggedNotException
import com.hyecheon.web.dto.post.PostReqDto
import com.hyecheon.web.dto.post.PostRespDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.LikeService
import com.hyecheon.web.service.PostService
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
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
	private val likeService: LikeService,

	) {

	@GetMapping
	fun get(
		@RequestParam("postId") postId: Long,
	) = run {
		val posts = postService.findAll(if (postId <= 0) Long.MAX_VALUE else postId)
		val data = posts.map { PostRespDto.of(it) }
		ResponseEntity.ok(ResponseDto(data = data))
	}

	@PostMapping("/{postId}/like")
	fun like(@PathVariable postId: Long) = run {
		likeService.like(postId)
	}

	@DeleteMapping("/{postId}/unlike")
	fun unlike(@PathVariable postId: Long) = run {
		likeService.unLike(postId)
	}

	@PostMapping
	fun create(@RequestBody post: PostReqDto.New) = run {
		val newPostId = postService.new(post.toEntity())
		val model = PostRespDto.of(postService.findById(newPostId))
		ResponseEntity.ok(
			ResponseDto(data = model)
		)
	}
}