package com.hyecheon.web.dto.chat

import com.hyecheon.web.validation.ListNotEmpty
import org.mapstruct.factory.Mappers
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/02
 */
object ChatRoomReqDto {
    private val converter = Mappers.getMapper(ChatConverter::class.java)

    data class Patch(
        var chatRoomName: String? = null,
        var userIds: List<Long>? = null,
    ) {
        fun toEntity() = run {
            converter.toEntity(this)
        }
    }

    data class New(
        @field:NotBlank
        var chatRoomName: String = "",
        var groupChat: Boolean = false,
        @NotNull
        @field:ListNotEmpty(message = "사용자 아이디를 입력해주세요!")
        var userIds: List<Long> = listOf(),
    ) {
        fun toEntity() = run {
            converter.toEntity(this)
        }
    }
}