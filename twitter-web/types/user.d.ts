export type UserType = {
  id: number;
  firstName: string;
  lastName: string
  username: string;
  email: string;
  roles: string[],
  profilePic: string,
  createdAt: string
  updatedAt: string,
  followInfo?: FollowInfoType
}

export type FollowInfoType = {
  userId: number
  followStatus: FollowStatusType,
  isFollowing?: boolean
}

export type FollowStatusType = {
  followingCnt: number,
  followerCnt: number
}
