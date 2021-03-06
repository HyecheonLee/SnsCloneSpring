package com.hyecheon.web.api

import com.epages.restdocs.apispec.ConstrainedFields
import com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document
import com.epages.restdocs.apispec.ParameterDescriptorWithType
import com.epages.restdocs.apispec.ResourceDocumentation.resource
import com.epages.restdocs.apispec.ResourceSnippetParameters
import com.epages.restdocs.apispec.SimpleType
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.hyecheon.domain.entity.chat.ChatRoom
import com.hyecheon.domain.entity.user.AuthToken
import com.hyecheon.web.api.Constant.CHAT_ROOM_V1_API
import com.hyecheon.web.dto.chat.ChatRoomReqDto
import com.hyecheon.web.dto.chat.ChatRoomRespDto
import com.hyecheon.web.dto.web.ErrorDto
import com.hyecheon.web.dto.web.ValidErrorDto
import com.hyecheon.web.service.ChatMessageService
import com.hyecheon.web.service.ChatService
import org.assertj.core.api.Assertions
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
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post
import org.springframework.restdocs.operation.preprocess.Preprocessors.*
import org.springframework.restdocs.payload.FieldDescriptor
import org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.web.servlet.MockMvc
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

    @DisplayName("1. ????????? ??????")
    @WithMockUser
    @Test
    fun test_1() {
        //given
        val newContent = ChatRoomReqDto.New("test", true, listOf(1, 2))
        given(chatService.createChatRoom(newContent.toEntity())).willReturn(1L)

        //when // then
        val fields = ConstrainedFields(ChatRoomReqDto.New::class.java)


        mockMvc.perform(
            post(CHAT_ROOM_V1_API)
                .characterEncoding("UTF-8")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newContent))
        )
            .andExpect(status().is2xxSuccessful)
            .andExpect(jsonPath("code", "0").exists())
            .andExpect(jsonPath("data.chatRoomId", 1L).exists())
            .andExpect(jsonPath("message", "success").exists())
            .andDo(print())
            .andDo(
                document(
                    "1. ????????? ??????",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    resource(
                        ResourceSnippetParameters.builder()
                            .summary("????????? ??????")
                            .description("???????????? ???????????????.")
                            .requestFields(
                                fields.withPath("chatRoomName").description("????????? ????????? ???????????????.").type(SimpleType.STRING),
                                fields.withPath("groupChat").description("?????? ?????? ????????? ??????").type(SimpleType.STRING),
                                fields.withPath("userIds").description("???????????? ???????????? ????????? ???????????? ???????????????.")
                                    .type(SimpleType.NUMBER)
                            )
                            .responseFields(
                                * commonRespFields(),
                                fieldWithPath("data.chatRoomId").description("????????? ????????? ID")
                            )
                            .build()
                    )
                )
            )
    }

    @DisplayName("2. ????????? ????????? validation ??????")
    @Test
    fun test2() {
        //given
        val newContent = ChatRoomReqDto.New()
        given(chatService.createChatRoom(newContent.toEntity())).willReturn(1L)
        val jsonContent = objectMapper.writeValueAsString(newContent)

        //when
        val result = mockMvc.perform(
            post(CHAT_ROOM_V1_API)
                .content(jsonContent)
                .characterEncoding("UTF-8")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().is4xxClientError)
            .andExpect(jsonPath("data").isNotEmpty)
            .andReturn()

        //then
        val response = result.response
        val jsonStr = response.contentAsString

        val error = objectMapper.readValue<ErrorDto<List<ValidErrorDto>>>(jsonStr)
        Assertions.assertThat(error.uri).isEqualTo(CHAT_ROOM_V1_API)
        Assertions.assertThat(error.method).isEqualTo("POST")
        Assertions.assertThat(error.data).isNotNull
        Assertions.assertThat(error.data?.size).isEqualTo(2)
        Assertions.assertThat(error.data?.map { it.field }).contains("chatRoomName", "userIds")
    }

    @DisplayName("3. ????????? ID ??????")
    @Test
    fun test3() {
        //given
        val chatRoom = ChatRoom("????????? ?????????", true).apply {
            id = 1L
        }
        val model = ChatRoomRespDto.toModel(chatRoom)

        given(chatService.findRoomWithUsersById(chatRoom.id!!)).willReturn(chatRoom)

        //when //then
        mockMvc.perform(
            get("${CHAT_ROOM_V1_API}/{id}", chatRoom.id)
                .characterEncoding("UTF-8")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().is2xxSuccessful)
            .andExpect(jsonPath("code", "0").exists())
            .andExpect(jsonPath("data.id", chatRoom.id).exists())
            .andExpect(jsonPath("data.chatRoomName", chatRoom.chatRoomName).exists())
            .andExpect(jsonPath("data.groupChat", chatRoom.groupChat).exists())
            .andExpect(jsonPath("data.users", chatRoom.users).exists())
            .andExpect(jsonPath("message", "success").exists())
            .andDo(print())
            .andDo(
                document(
                    "3. ????????? ID ??????",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    resource(
                        ResourceSnippetParameters.builder()
                            .summary("????????? ??????")
                            .description("????????? ID??? ????????? ???????????????.")
                            .pathParameters(ParameterDescriptorWithType("id").description("????????? ID"))
                            .responseFields(
                                * commonRespFields(),
                                fieldWithPath("data.id").description("????????? ????????? ID"),
                                fieldWithPath("data.chatRoomName").description("????????? ??????"),
                                fieldWithPath("data.groupChat").description("?????? ?????? ??????"),
                                fieldWithPath("data.users").description("????????? ??????"),
                                fieldWithPath("data.lastMessage").description("????????? ?????????"),
                                fieldWithPath("data.createdAt").description("????????? ?????? ??????"),
                                fieldWithPath("data.updatedAt").description("????????? ?????? ??????"),
                            )
                            .build()
                    )
                )
            )
    }



    fun commonRespFields(): Array<FieldDescriptor> {
        return arrayOf(
            fieldWithPath("code").description("?????? ??????"),
            fieldWithPath("message").description("?????? ?????????")
        )
    }

}