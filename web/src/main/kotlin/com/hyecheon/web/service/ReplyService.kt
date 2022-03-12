package com.hyecheon.web.service

import com.hyecheon.domain.entity.post.PostRepository
import com.hyecheon.domain.entity.reply.Reply
import com.hyecheon.domain.entity.reply.ReplyRepository
import com.hyecheon.web.dto.post.PostStatusDto
import com.hyecheon.web.dto.reply.ReplyConverter.Companion.converter
import com.hyecheon.web.exception.IdNotExistsException
import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/09
 */
@Transactional(readOnly = true)
@Service
class ReplyService(
	private val postRepository: PostRepository,
	private val replyRepository: ReplyRepository,
	private val applicationEventPublisher: ApplicationEventPublisher,
) {

	@Transactional
	fun new(postId: Long, reply: Reply) = run {
		val post = postRepository.findById(postId).orElseThrow { IdNotExistsException("post id not exists") }
		reply.post = post
		applicationEventPublisher.publishEvent(PostStatusDto.of(post))
		replyRepository.save(reply)
	}

	@Transactional
	fun modify(replyId: Long, source: Reply) = run {
		val target = replyRepository.findById(replyId).orElseThrow { IdNotExistsException("replyId not exists") }
		converter.update(source, target)
		target
	}

	@Transactional
	fun delete(replyId: Long) = run {
		val reply = replyRepository.findById(replyId).orElseThrow { IdNotExistsException("replyId not exists") }
		val post = reply.post
		post.unReply()
		applicationEventPublisher.publishEvent(PostStatusDto.of(post))
		replyRepository.delete(reply)
	}

	fun findTop10ByPostAndIdLessThanOrderByIdDesc(postId: Long, replyId: Long) = run {
		val post = postRepository.getById(postId)
		replyRepository.findTop10ByPostAndIdLessThanOrderByIdDesc(post, replyId)
	}
}