package com.hyecheon.web.api

import com.hyecheon.web.dto.post.PostReqDto
import com.hyecheon.web.dto.post.PostRespDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.PostService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/27
 */
@RestController
@RequestMapping(Constant.POST_API)
class PostApi(private val postService: PostService) {

	@GetMapping
	fun get(@RequestParam("postId") postId: Long) = run {
		val posts = postService.findAll(if (postId <= 0) Long.MAX_VALUE else postId)
		val data = posts.map { PostRespDto.of(it) }
		ResponseEntity.ok(ResponseDto(data = data))
	}

	@GetMapping("/{id}")
	fun getPost(@PathVariable id: Long): ResponseEntity<ResponseDto<PostRespDto.Model>> {
		val post = postService.findById(id)
		return ResponseEntity.ok(ResponseDto(data = PostRespDto.of(post)))
	}

	@GetMapping("/{id}/replies")
	fun getPost(@PathVariable id: Long, @RequestParam postId: Long) = run {
		val posts = postService.findAllByParentId(id, if (postId <= 0) Long.MAX_VALUE else postId)
		val data = posts.map { PostRespDto.of(it) }
		ResponseEntity.ok(ResponseDto(data = data))
	}

	@PostMapping("/{postId}/like")
	fun like(@PathVariable postId: Long) = run {
		postService.like(postId)
	}

	@DeleteMapping("/{postId}/unlike")
	fun unlike(@PathVariable postId: Long) = run {
		postService.unLike(postId)
	}

	@PostMapping
	fun create(@RequestBody post: PostReqDto.New) = run {
		val newPostId = postService.new(post.toEntity())
		val postURI = URI.create("${Constant.POST_API}/${newPostId}")
		ResponseEntity.created(postURI).build<Any>()
	}

	@DeleteMapping("/{id}")
	fun delete(@PathVariable id: Long) = run {
		postService.deleteById(id)
		ResponseDto(data = "success")
	}

	@PostMapping("/{id}/reply")
	fun newReply(@PathVariable id: Long, @RequestBody reply: PostReqDto.New) = run {
		postService.reply(id, reply.toEntity())
	}
}