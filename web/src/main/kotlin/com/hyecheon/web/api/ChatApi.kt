package com.hyecheon.web.api

import com.hyecheon.web.aop.ChatRoomAuth
import com.hyecheon.web.api.Constant.CHAT_V1_API
import com.hyecheon.web.dto.chat.ChatMessageDto
import com.hyecheon.web.dto.chat.ChatRoomReqDto
import com.hyecheon.web.dto.chat.ChatRoomRespDto
import com.hyecheon.web.dto.chat.ChatStatusDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.ChatMessageService
import com.hyecheon.web.service.ChatService
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
@RequestMapping(CHAT_V1_API)
@RestController
class ChatApi(
	private val chatService: ChatService,
	private val chatMessageService: ChatMessageService,
) {

	@PostMapping("/room")
	fun create(@RequestBody @Validated newChatRoom: ChatRoomReqDto.New) = run {
		val chatRoom = newChatRoom.toEntity()
		val chatRoomId = chatService.createChatRoom(chatRoom)
		ResponseDto(data = mapOf("chatRoomId" to chatRoomId))
	}

	@ChatRoomAuth(parameterName = "id")
	@GetMapping("/room/{id}")
	fun getChatRoom(@PathVariable id: Long) = run {
		val chatRoom = chatService.findRoomWithUsersById(id)
		ResponseDto(data = ChatRoomRespDto.toModel(chatRoom))
	}

	@GetMapping("/room/{id}/message")
	fun getChatMessage(
		@PathVariable id: Long,
		@RequestParam(required = false) lastId: Long = Long.MAX_VALUE,
	) = run {
		val messages = chatMessageService.findAllMessage(id, lastId)
		ResponseDto(data = messages.map(ChatMessageDto::toModel))
	}

	@PostMapping("/message")
	fun newChatMsg(@RequestBody msg: ChatMessageDto.New) = run {
		val chatMsgId = chatMessageService.newChatMsg(msg.toEntity())
		ResponseDto(data = mapOf("chatMessageId" to chatMsgId))
	}

	@GetMapping("/room")
	fun getChatRooms() = run {
		val chatRoomStatus = chatService.findRoomAllByLoggedUser()

		val model = chatRoomStatus
			.distinctBy { it.id }
			.map { ChatStatusDto.toModel(it) }
			.sortedByDescending { it.updatedAt }

		ResponseDto(data = model)
	}


	@PatchMapping("/room/{id}")
	fun chatRoom(@PathVariable id: Long, @RequestBody patchChatRoom: ChatRoomReqDto.Patch) = run {
		val entity = patchChatRoom.toEntity()
		chatService.patchRoom(id, entity)
		ResponseDto(data = patchChatRoom)
	}

	@PutMapping("/room")
	fun chatRoom(@RequestBody newChatRoom: ChatRoomReqDto.New) = run {
		val entity = newChatRoom.toEntity()
		val chatRoomId = chatService.saveOrFind(entity)
		ResponseDto(data = mapOf("chatRoomId" to chatRoomId))
	}

	@PutMapping("/room/{id}/message/{messageId}/checked")
	fun chatMsgChecked(@PathVariable id: Long, @PathVariable messageId: Long) = run {
		val statusId = chatMessageService.chatMessageCheck(id, messageId)
		ResponseDto(data = mapOf("statusId" to statusId))
	}

	@GetMapping("/room/{id}/status")
	fun chatStatus(@PathVariable id: Long) = run {
		val chatStatus = chatMessageService.getChatStatus(id)
		ResponseDto(data = ChatStatusDto.toModel(chatStatus))
	}
}