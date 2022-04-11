import { UserType } from './user'

export type NotifyType = {
  id: number,
  fromUser: UserType,
  toUserId: number,
  notifyType: NotifyKindType,
  checked: boolean,
  createdAt: string,
  updatedAt: string,
  targetId: number,
}

export type NotifyKindType =
  | "LIKE" | "FOLLOWER" | "REPLY" | "NEW_POST"
