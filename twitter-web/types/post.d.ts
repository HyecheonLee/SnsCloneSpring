import { UserType } from './user'

export type PostType = {
  id: number,
  content: string,
  createdAt: string,
  updatedAt: string,
  postedBy: UserType,
  userLike: boolean,
  postStatus: PostStatusType | null
}
export type PostStatusType = {
  postId?: number,
  likeCnt: number,
  replyCnt: number,
  isPin: boolean,
}
