import { UserType } from './user'

export type PostType = {
  id: number,
  content: string,
  createdAt: string,
  updatedAt: string,
  postedBy: UserType
}
