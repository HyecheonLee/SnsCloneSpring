import { UserType } from './user'

export type ChatType = {}

export type ChatRoomType = {
  id: number,
  chatRoomName: string,
  groupChat: boolean,
  lastMessage: string,
  users: UserType[],
  createdAt: string,
  updatedAt: string
}
