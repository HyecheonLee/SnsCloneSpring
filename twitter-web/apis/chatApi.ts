import { apiV1Chat } from '../utils/apiUtils'
import { ApiResponseType } from '../types/api'
import { ChatMessageType, ChatRoomType } from '../types/chat'

export const fetchChatRoom = async (id: string) => {
  return await apiV1Chat.get<ApiResponseType<ChatRoomType>>(`/room/${id}`)
    .then(value => value.data)
    .then(value => value?.data) as ChatRoomType;
}

export const fetchChatRooms = async () => {
  return await apiV1Chat.get<ApiResponseType<ChatRoomType[]>>(`/room`)
    .then(value => value.data)
    .then(value => value?.data || [])
}
export const patchChatRoom = async (id: number, data: any) => {
  return await apiV1Chat.patch<ApiResponseType<ChatRoomType>>(`/room/${id}`, data)
}

export const sendMessage = async ({
                                    chatRoomId,
                                    message
                                  }: { chatRoomId: number | string, message: string }) => {
  return await apiV1Chat.post<ApiResponseType<ChatRoomType>>(`/message`, {
    chatRoomId, message
  })
}

export const fetchChatMessage = async (chatRoomId: number | string, lastId: number = Number.MAX_SAFE_INTEGER) => {
  return await apiV1Chat.get<ApiResponseType<ChatMessageType[]>>(`/room/${chatRoomId}/message?lastId=${lastId.valueOf()}`).then(value => value.data)
    .then(value => value?.data || [])
}