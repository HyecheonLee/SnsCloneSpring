import { apiV1Chat } from '../utils/apiUtils'
import { ApiResponseType } from '../types/api'
import { ChatRoomType } from '../types/chat'

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
