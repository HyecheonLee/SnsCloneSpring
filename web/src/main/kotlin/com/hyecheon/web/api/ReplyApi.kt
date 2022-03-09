package com.hyecheon.web.api

import com.hyecheon.web.api.Constant.REPLY_V1_API
import com.hyecheon.web.dto.reply.ReplyReqDto
import com.hyecheon.web.dto.reply.ReplyRespDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.ReplyService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
@RestController
@RequestMapping(REPLY_V1_API)
class ReplyApi(
	private val replyService: ReplyService,
) {

	@PostMapping
	fun new(@RequestBody reply: ReplyReqDto.New) = run {
		val savedReply = replyService.new(reply.postId!!, reply.toEntity())

		ResponseDto(data = ReplyRespDto.of(savedReply))
	}

	@GetMapping("/post/{postId}")
	fun get(@PathVariable postId: Long, @RequestParam("replyId", defaultValue = "0") replyId: Long) = run {
		val maxId = if (replyId <= 0L) Long.MAX_VALUE else replyId
		val replies =
			replyService.findTop10ByPostAndIdLessThanOrderByIdDesc(postId, maxId)
		ResponseDto(data = replies.map { ReplyRespDto.of(it) })
	}

	@PatchMapping("/{replyId}")
	fun patch(@PathVariable replyId: Long, @RequestBody reply: ReplyReqDto.Modify) {
		val source = reply.toEntity()
		val modifyReply = replyService.modify(replyId, source)

		ResponseDto(data = ReplyRespDto.of(modifyReply))
	}

	@DeleteMapping("/{replyId}")
	fun delete(@PathVariable replyId: Long) = run {
		replyService.delete(replyId)
		ResponseEntity.noContent()
	}
}