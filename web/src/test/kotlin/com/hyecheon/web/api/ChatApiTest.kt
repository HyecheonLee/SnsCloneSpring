package com.hyecheon.web.api

import com.epages.restdocs.apispec.ConstrainedFields
import com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document
import com.epages.restdocs.apispec.ResourceDocumentation.resource
import com.epages.restdocs.apispec.ResourceSnippetParameters
import com.fasterxml.jackson.databind.ObjectMapper
import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.web.dto.chat.ChatRoomReqDto
import com.hyecheon.web.service.ChatMessageService
import com.hyecheon.web.service.ChatService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.restdocs.operation.preprocess.Preprocessors.*
import org.springframework.restdocs.payload.FieldDescriptor
import org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.web.servlet.MockMvc
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class ChatApiTest {

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var chatService: ChatService

    @MockBean
    private lateinit var chatMessageService: ChatMessageService

    @BeforeEach
    internal fun setUp() {
        val authToken = AuthToken(1, "hclee", listOf("USER"))
        val context: SecurityContext = SecurityContextHolder.getContext()
        context.authentication = authToken.createToken()
    }

    @DisplayName("1. 채팅방 생성")
    @WithMockUser
    @Test
    fun test_1() {
        //given
        val newContent = ChatRoomReqDto.New("test", true, listOf(1, 2))
        given(chatService.createChatRoom(newContent.toEntity())).willReturn(1L)

        //when // then
        val fields = ConstrainedFields(ChatRoomReqDto.New::class.java)


        mockMvc.perform(
            post("${Constant.CHAT_V1_API}/room")
                .characterEncoding("UTF-8")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newContent))
        )
            .andExpect(status().is2xxSuccessful)
            .andExpect(jsonPath("code", "0").exists())
            .andExpect(jsonPath("message", "success").exists())
            .andDo(print())
            .andDo(
                document(
                    "1. 채팅방 생성",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    resource(
                        ResourceSnippetParameters.builder()
                            .summary("채팅방 생성")
                            .description("채팅방을 생성합니다.")
                            .requestFields(
                                fields.withPath("chatRoomName").description("채팅방 이름을 입력합니다."),
                                fields.withPath("groupChat").description("그룹 채팅 여부를 설정"),
                                fields.withPath("userIds").description("채팅방에 참여하는 참여자 아이디를 입력하세요.")
                            )
                            .responseFields(
                                * commonRespFields(),
                                fieldWithPath("data.chatRoomId").description("생성된 채팅방 ID")
                            )
                            .build()
                    )
                )
            )
    }

    fun commonRespFields(): Array<FieldDescriptor> {
        return arrayOf(
            fieldWithPath("code").description("응답 코드"),
            fieldWithPath("message").description("응답 메시지")
        )
    }
}