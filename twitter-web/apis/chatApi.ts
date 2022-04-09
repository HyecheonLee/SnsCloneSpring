import { apiV1Chat } from '../utils/apiUtils'
import { ApiResponseType, ErrorType } from '../types/api'
import { ChatMessageType, ChatRoomType, ChatStatusType } from '../types/chat'

export const fetchChatRoom = async (id: string) => {
  const resp = await apiV1Chat.get<ApiResponseType<ChatRoomType> | ErrorType<any>>(`/room/${id}`)
  if (resp.ok) {
    return resp.data?.data as ChatRoomType
  } else {
    throw resp.data
  }
}

export const fetchChatRooms = async () => {
  return await apiV1Chat.get<ApiResponseType<ChatStatusType[]>>(`/room`)
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
export const fetchChatStatus = (id: number | string) => {
  return apiV1Chat.get<ApiResponseType<ChatStatusType>>(`/room/${id}/status`).then(value => value.data)
    .then(value => value?.data)
}

export const msgCheck = async (chatRoomId: number | string, msgId: string | number) => {
  await apiV1Chat.put(`/room/${chatRoomId}/message/${msgId}/checked`)
}
