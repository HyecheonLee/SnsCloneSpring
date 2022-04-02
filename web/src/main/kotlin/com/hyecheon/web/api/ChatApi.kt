package com.hyecheon.web.api

import com.hyecheon.web.api.Constant.CHAT_V1_API
import com.hyecheon.web.dto.chat.ChatRoomReqDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.ChatService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
@RequestMapping(CHAT_V1_API)
@RestController
class ChatApi(
	private val chatService: ChatService,
) {

	@PostMapping("/room")
	fun create(@RequestBody newChatRoom: ChatRoomReqDto.New) = run {
		val chatRoom = newChatRoom.toEntity()
		val chatRoomId = chatService.createChatRoom(chatRoom)
		ResponseDto(data = mapOf("chatRoomId" to chatRoomId))
	}
}