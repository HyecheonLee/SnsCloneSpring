package com.hyecheon.web.api

import com.hyecheon.web.api.Constant.CHAT_V1_API
import com.hyecheon.web.dto.chat.ChatRoomReqDto
import com.hyecheon.web.dto.chat.ChatRoomRespDto
import com.hyecheon.web.dto.web.ResponseDto
import com.hyecheon.web.service.ChatService
import org.springframework.http.MediaType
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
) {

	@PostMapping("/room")
	fun create(@RequestBody newChatRoom: ChatRoomReqDto.New) = run {
		val chatRoom = newChatRoom.toEntity()
		val chatRoomId = chatService.createChatRoom(chatRoom)
		ResponseDto(data = mapOf("chatRoomId" to chatRoomId))
	}

	@GetMapping("/room/{id}")
	fun getChatRoom(@PathVariable id: Long) = run {
		val chatRoom = chatService.findRoomWithUsersById(id)
		ResponseDto(data = ChatRoomRespDto.toModel(chatRoom))
	}

	@GetMapping("/room")
	fun getChatRooms() = run {
		val chatRooms = chatService.findRoomAllByLoggedUser()
		val result = chatRooms.mapNotNull { it.chatRoom }
			.map { ChatRoomRespDto.toModel(it) }
			.sortedByDescending { it.updatedAt }
		ResponseDto(data = result)
	}

	@GetMapping(produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
	fun chat() = run {
		chatService.getEmitter()
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
}